def calculate_mrp1(data):
    total_requirements = {}
    planned_orders = {}
    net_requirements = {}
    inventory_trace = {}

    initial_inventory = data.inventory.copy()
    current_inventory = initial_inventory.copy()
    safety_stock = data.safety_stock if hasattr(data, "safety_stock") else {}

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

    all_items = set(total_requirements.keys()) | set(initial_inventory.keys()) | set(safety_stock.keys())
    all_periods = sorted({p for d in total_requirements.values() for p in d.keys()})

    for item in all_items:
        inventory_trace[item] = {}
        planned_orders[item] = {}
        net_requirements[item] = {}
        inventory_on_hand = current_inventory.get(item, 0)
        ss = safety_stock.get(item, 0)

        for period in all_periods:
            inventory_trace[item][f"{period}_start"] = inventory_on_hand

            gross = total_requirements.get(item, {}).get(period, 0)
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

        current_inventory[item] = inventory_on_hand

    return {
        "planned_orders": planned_orders,
        "gross_requirements": total_requirements,
        "net_requirements": net_requirements,
        "inventory_trace": inventory_trace,
        "inventory": initial_inventory
    }
