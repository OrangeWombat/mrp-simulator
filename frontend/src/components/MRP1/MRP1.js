import React from 'react';
import RenderOutputs from '../RenderOutputs';

function MRP1({
  mpsItems, setMpsItems,
  bomItems, setBomItems,
  inventoryItems, setInventoryItems,
  safetyStockItems, setSafetyStockItems,
  handleRunMRP1, output, subTab, setSubTab
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

  const handleRunMRP1Click = () => {
    const formattedSafetyStock = Object.fromEntries(safetyStockItems.map(i => [i.item, Number(i.quantity)]));
    const formattedMPS = Object.fromEntries(mpsItems.map(m => [m.item, m.schedule]));
    const formattedBOM = bomItems.reduce((acc, { parent, component, quantity }) => {
      if (!acc[parent]) acc[parent] = {};
      acc[parent][component] = Number(quantity);
      return acc;
    }, {});
    const formattedInventory = Object.fromEntries(inventoryItems.map(i => [i.item, Number(i.quantity)]));

    handleRunMRP1({
      mps: formattedMPS,
      bom: formattedBOM,
      inventory: formattedInventory,
      safety_stock: formattedSafetyStock
    });
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* Prepínacie tlačidlá */}
      <div style={{ marginBottom: '24px', display: 'flex', gap: '10px' }}>
        <button onClick={() => setSubTab('inputs')} style={{ padding: '8px 16px', backgroundColor: subTab === 'inputs' ? '#2563eb' : '#e2e8f0', color: subTab === 'inputs' ? '#fff' : '#333', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
          Vstupy
        </button>
        <button onClick={() => setSubTab('outputs')} style={{ padding: '8px 16px', backgroundColor: subTab === 'outputs' ? '#2563eb' : '#e2e8f0', color: subTab === 'outputs' ? '#fff' : '#333', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
          Výstupy
        </button>
      </div>

      {/* Obsah záložiek */}
      {subTab === 'inputs' && (
        <div style={{ backgroundColor: '#f9fafb', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#1e40af', marginBottom: '20px' }}>
            Zadajte vstupy (MRP 1)
          </h2>

          {/* MPS */}
          <h4 style={{ color: '#1e40af' }}>Hlavný výrobný plán (MPS)</h4>
          {mpsItems.map((m, i) => (
            <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <input
                placeholder="Položka"
                value={m.item}
                onChange={e => handleMpsItemChange(i, 'item', e.target.value)}
                style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
              />
              {weeks.map(w => (
                <input
                  key={w}
                  placeholder={w}
                  type="number"
                  value={m.schedule[w] || ''}
                  onChange={e => handleMpsItemChange(i, w, e.target.value)}
                  style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
              ))}
            </div>
          ))}
          <button onClick={() => setMpsItems([...mpsItems, { item: '', schedule: {} }])} style={{ marginTop: '8px', padding: '6px 12px', borderRadius: '6px', border: 'none', backgroundColor: '#1e40af', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
            + Pridať položku MPS
          </button>

          {/* BOM */}
          <h4 style={{ color: '#1e40af', marginTop: '20px' }}>Kusovník (BOM)</h4>
          {bomItems.map((b, i) => (
            <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <input placeholder="Rodič" value={b.parent} onChange={e => {
                const copy = [...bomItems]; copy[i].parent = e.target.value; setBomItems(copy);
              }} style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }} />
              <input placeholder="Komponent" value={b.component} onChange={e => {
                const copy = [...bomItems]; copy[i].component = e.target.value; setBomItems(copy);
              }} style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }} />
              <input placeholder="Množstvo" type="number" value={b.quantity} onChange={e => {
                const copy = [...bomItems]; copy[i].quantity = e.target.value; setBomItems(copy);
              }} style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }} />
            </div>
          ))}
          <button onClick={() => setBomItems([...bomItems, { parent: '', component: '', quantity: '' }])} style={{ marginTop: '8px', padding: '6px 12px', borderRadius: '6px', border: 'none', backgroundColor: '#1e40af', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
            + Pridať záznam BOM
          </button>

          {/* Inventory */}
          <h4 style={{ color: '#1e40af', marginTop: '20px' }}>Skladové zásoby</h4>
          {inventoryItems.map((inv, i) => (
            <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <input placeholder="Položka" value={inv.item} onChange={e => {
                const copy = [...inventoryItems]; copy[i].item = e.target.value; setInventoryItems(copy);
              }} style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }} />
              <input placeholder="Množstvo" type="number" value={inv.quantity} onChange={e => {
                const copy = [...inventoryItems]; copy[i].quantity = e.target.value; setInventoryItems(copy);
              }} style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }} />
            </div>
          ))}
          <button onClick={() => setInventoryItems([...inventoryItems, { item: '', quantity: '' }])} style={{ marginTop: '8px', padding: '6px 12px', borderRadius: '6px', border: 'none', backgroundColor: '#1e40af', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
            + Pridať zásoby
          </button>

          {/* Safety Stock */}
          <h4 style={{ color: '#1e40af', marginTop: '20px' }}>Bezpečnostná zásoba</h4>
          {safetyStockItems.map((ss, i) => (
            <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <input placeholder="Položka" value={ss.item} onChange={e => {
                const copy = [...safetyStockItems]; copy[i].item = e.target.value; setSafetyStockItems(copy);
              }} style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }} />
              <input placeholder="Množstvo" type="number" value={ss.quantity} onChange={e => {
                const copy = [...safetyStockItems]; copy[i].quantity = e.target.value; setSafetyStockItems(copy);
              }} style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }} />
            </div>
          ))}
          <button onClick={() => setSafetyStockItems([...safetyStockItems, { item: '', quantity: '' }])} style={{ marginTop: '8px', padding: '6px 12px', borderRadius: '6px', border: 'none', backgroundColor: '#1e40af', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
            + Pridať bezpečnostnú zásobu
          </button>

          {/* Tlačidlo na spustenie výpočtu */}
          <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <button onClick={handleRunMRP1Click} style={{
              backgroundColor: '#2563eb',
              color: 'white',
              fontWeight: 'bold',
              padding: '12px 24px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem'
            }}>
              Spustiť výpočet MRP
            </button>
          </div>
        </div>
      )}

      {/* Výstupy */}
      {subTab === 'outputs' && output && (
        <RenderOutputs output={output} />
      )}
    </div>
  );
}

export default MRP1;
