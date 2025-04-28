import React from 'react';

function ComputationSteps({ mpsItems, bomItems, inventoryItems, safetyStockItems }) {
  if (!mpsItems || mpsItems.length === 0 || !bomItems || bomItems.length === 0) {
    return <p style={{ fontStyle: 'italic', color: '#666', textAlign: 'center', marginTop: '20px' }}>
      Žiadne vstupy na zobrazenie výpočtu.
    </p>;
  }

  return (
    <div style={{ backgroundColor: '#f8fafc', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginTop: '40px' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1e40af', marginBottom: '30px', textAlign: 'center' }}>
        📚 Výpočtové kroky
      </h2>

      {/* 1. Hrubé požiadavky */}
      <section style={{ marginBottom: 40 }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '12px' }}>1️⃣ Výpočet Hrubých požiadaviek (Gross Requirements)</h3>
        <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#444' }}>
          Hrubé požiadavky vznikajú z <strong>Hlavného výrobného plánu (MPS)</strong> a <strong>kusovníka (BOM)</strong>.<br />
          Vyjadrujú, koľko komponentov je potrebných na výrobu plánovaných množstiev produktov.
        </p>
        <p><em>Vzorec:</em><br />
          <code>Hrubé požiadavky komponentu = Σ (Plánované množstvo produktu × Potreba komponentu na produkt)</code>
        </p>
      </section>

      {/* 2. Čisté požiadavky */}
      <section style={{ marginBottom: 40 }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '12px' }}>2️⃣ Výpočet Čistých požiadaviek (Net Requirements)</h3>
        <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#444' }}>
          Čisté požiadavky vzniknú odpočítaním aktuálnych skladových zásob od hrubých požiadaviek.
        </p>
        <p><em>Vzorec:</em><br />
          <code>Čisté požiadavky = max(Hrubé požiadavky - Počiatočné zásoby, 0)</code>
        </p>
        <p style={{ fontSize: '0.95rem', color: '#555' }}>
          ➔ Funkcia <code>max(..., 0)</code> zabezpečuje, že výsledok je vždy nezáporný.<br />
          ➔ Ak máme dostatok zásob, netreba nové objednávky.
        </p>
      </section>

      {/* 3. Plánované objednávky */}
      <section style={{ marginBottom: 40 }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '12px' }}>3️⃣ Výpočet Plánovaných objednávok (Planned Orders)</h3>
        <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#444' }}>
          Ak sú čisté požiadavky kladné, vytvára sa plánovaná objednávka, ktorá zahrňuje aj požadovanú bezpečnostnú zásobu.
        </p>
        <p><em>Vzorec:</em><br />
          <code>Plánovaná objednávka = Čisté požiadavky + Bezpečnostná zásoba</code>
        </p>
      </section>

      {/* 4. Vývoj zásob */}
      <section style={{ marginBottom: 40 }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '12px' }}>4️⃣ Sledovanie vývoja zásob (Inventory Tracking)</h3>
        <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#444' }}>
          Pre každý týždeň sa eviduje stav zásob v troch krokoch:
        </p>
        <ul style={{ listStyle: 'disc inside', marginLeft: '20px', marginTop: '8px' }}>
          <li><strong>Začiatok týždňa:</strong> Stav na sklade pred výrobou a objednávkami.</li>
          <li><strong>Po objednávke:</strong> Pripočítanie nových plánovaných objednávok.</li>
          <li><strong>Po spotrebe:</strong> Odpočítanie hrubých požiadaviek na výrobu.</li>
        </ul>
        <p style={{ fontSize: '0.95rem', color: '#555', marginTop: '8px' }}>
          Výpočtový postup:<br />
          <code>Stav na začiatku + Prijaté objednávky - Hrubé požiadavky = Stav na konci týždňa</code>
        </p>
      </section>

      {/* 5. Preťaženie kapacít */}
      <section style={{ marginBottom: 40 }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '12px' }}>5️⃣ Preťaženie kapacít (Capacity Overload)</h3>
        <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#444' }}>
          Overujeme, či plánované výrobné množstvo nepresahuje dostupné kapacity výrobných liniek.
        </p>
        <p><em>Vzorec:</em><br />
          <code>Preťaženie = max(Požiadavka - Kapacita, 0)</code>
        </p>
        <p style={{ fontSize: '0.95rem', color: '#555' }}>
          ➔ Ak výrobná požiadavka presiahne dostupnú kapacitu, rozdiel sa eviduje ako preťaženie.<br />
          ➔ Ak je dostatok kapacity, preťaženie = 0.
        </p>
      </section>

      {/* 6. Vyťaženie kapacít */}
      <section style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '12px' }}>6️⃣ Vyťaženie kapacít (%) (Resource Utilization)</h3>
        <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#444' }}>
          Vyjadruje v percentách, koľko kapacity bolo využitej na výrobu v danom týždni.
        </p>
        <p><em>Vzorec:</em><br />
          <code>Vyťaženie (%) = (Plánovaná výroba ÷ Kapacita) × 100</code>
        </p>
      </section>
    </div>
  );
}

export default ComputationSteps;
