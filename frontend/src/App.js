import React, { useState } from 'react';
import Main from './components/Main/Main';
import MRP1 from './components/MRP1/MRP1';
import MRP2 from './components/MRP2/MRP2';
import RenderOutputs from './components/RenderOutputs';

function App() {
  const [tab, setTab] = useState('main');
  const [subTab, setSubTab] = useState('inputs');

  const [mpsItemsMRP1, setMpsItemsMRP1] = useState([{ item: 'Dzus', schedule: { Week1: 100, Week2: 150 } }]);
  const [mpsItemsMRP2, setMpsItemsMRP2] = useState([{ item: 'Dzus', schedule: { Week1: 50, Week2: 100 } }]);

  const [bomItems, setBomItems] = useState([
    { parent: 'Dzus', component: 'OvocnaZlozka', quantity: '1' },
    { parent: 'Dzus', component: 'Obal', quantity: '1' },
    { parent: 'OvocnaZlozka', component: 'JablkovyKoncentrat', quantity: '2' },
    { parent: 'OvocnaZlozka', component: 'PomerancovyKoncentrat', quantity: '1' }
  ]);

  const [inventoryItems, setInventoryItems] = useState([
    { item: 'OvocnaZlozka', quantity: '30' },
    { item: 'Obal', quantity: '50' },
    { item: 'JablkovyKoncentrat', quantity: '20' },
    { item: 'PomerancovyKoncentrat', quantity: '10' }
  ]);

  const [capacityItems, setCapacityItems] = useState([
    { item: 'Dzus', quantity: '100' },
    { item: 'OvocnaZlozka', quantity: '80' }
  ]);
  
  const [safetyStockItems, setSafetyStockItems] = useState([
    { item: 'OvocnaZlozka', quantity: '10' },
    { item: 'Obal', quantity: '10' },
    { item: 'JablkovyKoncentrat', quantity: '10' },
    { item: 'PomerancovyKoncentrat', quantity: '10' }
  ]);

  const [leadTimeItems, setLeadTimeItems] = useState([
    { item: 'OvocnaZlozka', leadTime: '1' },
    { item: 'Obal', leadTime: '1' },
    { item: 'JablkovyKoncentrat', leadTime: '2' },
    { item: 'PomerancovyKoncentrat', leadTime: '1' }
  ]);

  const [output, setOutput] = useState(null);

  const handleRunMRP1 = async (payload) => {
    const response = await fetch("https://mrp-backend-550i.onrender.com/calculate-mrp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    setOutput(data);
    setSubTab("outputs");
  };

  const handleRunMRP2 = async (payload) => {
    const response = await fetch("https://mrp-backend-550i.onrender.com/calculate-mrp-ii", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    setOutput(data);
    setSubTab("outputs");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>MRP Simulátor</h1>
      <div>
        <button onClick={() => setTab('main')}>Hlavná stránka</button>
        <button onClick={() => setTab('mrp1')}>MRP 1</button>
        <button onClick={() => setTab('mrp2')}>MRP 2</button>
      </div>

      {tab === 'main' && <Main />}
      {tab === 'mrp1' && <MRP1 {
        ...{
          mpsItems: mpsItemsMRP1, setMpsItems: setMpsItemsMRP1,
          bomItems, setBomItems,
          inventoryItems, setInventoryItems,
          safetyStockItems, setSafetyStockItems,
          leadTimeItems, setLeadTimeItems,
          handleRunMRP1, output, subTab, setSubTab
        }
      } />}
      {tab === 'mrp2' && <MRP2 {
        ...{
          mpsItems: mpsItemsMRP2, setMpsItems: setMpsItemsMRP2,
          bomItems, setBomItems,
          inventoryItems, setInventoryItems,
          capacityItems, setCapacityItems,
          safetyStockItems, setSafetyStockItems,
          leadTimeItems, setLeadTimeItems,
          handleRunMRP2, output, subTab, setSubTab
        }
      } />}
    </div>
  );
}

export default App;
