def calculate_mrp2(data):
    total_requirements = {}
    planned_orders = {}
    net_requirements = {}
    inventory_trace = {}
    overloads = {}
    resource_utilization = {}

    initial_inventory = data.inventory.copy()
    current_inventory = initial_inventory.copy()
    safety_stock = data.safety_stock if hasattr(data, "safety_stock") else {}

    parent_items = set(data.bom.keys()) | set(data.mps.keys())  

    def explode_bom(product: str, quantity: int, period: str):
        if product not in data.bom:
            return
        for component, qty_per_unit in data.bom[product].items():
            total = qty_per_unit * quantity
            if component not in total_requirements:
                total_requirements[component] = {}
            total_requirements[component][period] = total_requirements[component].get(period, 0) + total
            explode_bom(component, total, period)

    for product, schedule in data.mps.items():
        for period, quantity in schedule.items():
            explode_bom(product, quantity, period)

    all_items = set(total_requirements.keys()) | set(initial_inventory.keys()) | set(safety_stock.keys()) | set(data.mps.keys())
    all_periods = sorted({p for d in total_requirements.values() for p in d.keys()} | {p for s in data.mps.values() for p in s.keys()})

    for item in all_items:
        inventory_trace[item] = {}
        planned_orders[item] = {}
        net_requirements[item] = {}

        if item in data.capacity:  
            resource_utilization[item] = {}

        inventory_on_hand = initial_inventory.get(item, 0)
        ss = safety_stock.get(item, 0)

        for period in all_periods:
            inventory_trace[item][f"{period}_start"] = inventory_on_hand

            mps_qty = data.mps.get(item, {}).get(period, 0)
            gross = total_requirements.get(item, {}).get(period, 0) + mps_qty
            required_with_ss = gross + ss
            net = max(required_with_ss - inventory_on_hand, 0)
            planned = net

            after_order = inventory_on_hand + planned
            end = after_order - gross

            if end < ss:
                adjust = ss - end
                planned += adjust
                after_order += adjust
                end += adjust

            net_requirements[item][period] = planned
            planned_orders[item][period] = planned
            inventory_trace[item][f"{period}_after_order"] = after_order
            inventory_trace[item][f"{period}_end"] = end

            inventory_on_hand = end

            if item in data.capacity:
                available = data.capacity[item]
                if planned > available:
                    if item not in overloads:
                        overloads[item] = {}
                    overloads[item][period] = {
                        "required": planned,
                        "available": available,
                        "overload": planned - available
                    }

                if available > 0:
                    utilization = (planned / available) * 100
                    resource_utilization[item][period] = round(utilization, 2)

        current_inventory[item] = inventory_on_hand

    for item, traces in inventory_trace.items():
        reordered = {}
        for period in all_periods:
            reordered[f"{period}_start"] = traces.get(f"{period}_start", 0)
            reordered[f"{period}_after_order"] = traces.get(f"{period}_after_order", 0)
            reordered[f"{period}_end"] = traces.get(f"{period}_end", 0)
        inventory_trace[item] = reordered

    for product in data.mps.keys():
        planned_orders.pop(product, None)
        net_requirements.pop(product, None)
        total_requirements.pop(product, None)
        inventory_trace.pop(product, None)

    return {
        "planned_orders": planned_orders,
        "gross_requirements": total_requirements,
        "net_requirements": net_requirements,
        "inventory_trace": inventory_trace,
        "inventory": initial_inventory,
        "capacity_overload": overloads,
        "resource_utilization": resource_utilization
    }
