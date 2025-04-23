import React from 'react';
import RenderOutputs from '../RenderOutputs';

function MRP2({
  mpsItems, setMpsItems,
  bomItems, setBomItems,
  inventoryItems, setInventoryItems,
  capacityItems, setCapacityItems,
  safetyStockItems, setSafetyStockItems,
  handleRunMRP2, output, subTab, setSubTab
}) {
  const weeks = ["Week1", "Week2", "Week3", "Week4"];

  const handleMpsItemChange = (index, key, value) => {
    const updated = [...mpsItems];
    if (key === 'item') {
      updated[index].item = value;
    } else {
      updated[index].schedule[key] = value;
    }
    setMpsItems(updated);
  };

  const handleRunMRP2Click = () => {
    const formattedMPS = Object.fromEntries(mpsItems.map(m => [m.item, m.schedule]));
    const formattedBOM = bomItems.reduce((acc, { parent, component, quantity }) => {
      if (!acc[parent]) acc[parent] = {};
      acc[parent][component] = Number(quantity);
      return acc;
    }, {});
    const formattedInventory = Object.fromEntries(inventoryItems.map(i => [i.item, Number(i.quantity)]));
    const formattedCapacity = Object.fromEntries(capacityItems.map(i => [i.item, Number(i.quantity)]));
    const formattedSafetyStock = Object.fromEntries(safetyStockItems.map(i => [i.item, Number(i.quantity)]));

    handleRunMRP2({
      mps: formattedMPS,
      bom: formattedBOM,
      inventory: formattedInventory,
      capacity: formattedCapacity,
      safety_stock: formattedSafetyStock
    });
  };

  return (
    <div>
      <div style={{ marginTop: 20 }}>
        <button onClick={() => setSubTab('inputs')}>Vstupy</button>
        <button onClick={() => setSubTab('outputs')}>Výstupy</button>
      </div>
      {subTab === 'inputs' && (
        <div>
          <h2>Zadajte vstupy (MRP 2)</h2>

          <h4>Hlavný výrobný plán (MPS)</h4>
          {mpsItems.map((m, i) => (
            <div key={i}>
              <input
                placeholder="Položka"
                value={m.item}
                onChange={e => handleMpsItemChange(i, 'item', e.target.value)}
              />
              {weeks.map(w => (
                <input
                  key={w}
                  placeholder={w}
                  type="number"
                  value={m.schedule[w] || ''}
                  onChange={e => handleMpsItemChange(i, w, e.target.value)}
                  style={{ marginLeft: 4 }}
                />
              ))}
            </div>
          ))}
          <button onClick={() => setMpsItems([...mpsItems, { item: '', schedule: {} }])}>+ Pridať položku MPS</button>

          <h4>Kusovník (BOM)</h4>
          {bomItems.map((b, i) => (
            <div key={i}>
              <input placeholder="Rodič" value={b.parent} onChange={e => {
                const copy = [...bomItems]; copy[i].parent = e.target.value; setBomItems(copy);
              }} />
              <input placeholder="Komponent" value={b.component} onChange={e => {
                const copy = [...bomItems]; copy[i].component = e.target.value; setBomItems(copy);
              }} />
              <input placeholder="Množstvo" type="number" value={b.quantity} onChange={e => {
                const copy = [...bomItems]; copy[i].quantity = e.target.value; setBomItems(copy);
              }} />
            </div>
          ))}
          <button onClick={() => setBomItems([...bomItems, { parent: '', component: '', quantity: '' }])}>+ Pridať záznam BOM</button>

          <h4>Skladové zásoby</h4>
          {inventoryItems.map((inv, i) => (
            <div key={i}>
              <input placeholder="Položka" value={inv.item} onChange={e => {
                const copy = [...inventoryItems]; copy[i].item = e.target.value; setInventoryItems(copy);
              }} />
              <input placeholder="Množstvo" type="number" value={inv.quantity} onChange={e => {
                const copy = [...inventoryItems]; copy[i].quantity = e.target.value; setInventoryItems(copy);
              }} />
            </div>
          ))}
          <button onClick={() => setInventoryItems([...inventoryItems, { item: '', quantity: '' }])}>+ Pridať položku zásob</button>

          <h4>Výrobné kapacity (len pre vyrábané položky)</h4>
          {[...new Set(bomItems.map(b => b.parent))].map((parentItem, i) => {
            const capIndex = capacityItems.findIndex(c => c.item === parentItem);
            const currentValue = capIndex !== -1 ? capacityItems[capIndex].quantity : '';

            return (
              <div key={i}>
                <input
                  placeholder="Položka"
                  value={parentItem}
                  disabled
                />
                <input
                  placeholder="Množstvo"
                  type="number"
                  value={currentValue}
                  onChange={e => {
                    const copy = [...capacityItems];
                    if (capIndex !== -1) {
                      copy[capIndex].quantity = e.target.value;
                    } else {
                      copy.push({ item: parentItem, quantity: e.target.value });
                    }
                    setCapacityItems(copy);
                  }}
                />
              </div>
            );
          })}

          <h4>Bezpečnostná zásoba</h4>
          {safetyStockItems.map((ss, i) => (
            <div key={i}>
              <input placeholder="Položka" value={ss.item} onChange={e => {
                const copy = [...safetyStockItems]; copy[i].item = e.target.value; setSafetyStockItems(copy);
              }} />
              <input placeholder="Množstvo" type="number" value={ss.quantity} onChange={e => {
                const copy = [...safetyStockItems]; copy[i].quantity = e.target.value; setSafetyStockItems(copy);
              }} />
            </div>
          ))}
          <button onClick={() => setSafetyStockItems([...safetyStockItems, { item: '', quantity: '' }])}>+ Pridať bezpečnostnú zásobu</button>

          <br />
          <button onClick={handleRunMRP2Click}>Spustiť výpočet MRP II</button>
        </div>
      )}
      {subTab === 'outputs' && output && <RenderOutputs output={output} />}
    </div>
  );
}

export default MRP2;
