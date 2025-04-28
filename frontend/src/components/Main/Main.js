import React from 'react';
import ComputationSteps from '../ComputationSteps';

function Main() {
  return (
    <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '20px', color: '#333', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Úvodná sekcia */}
      <div style={{ backgroundColor: '#f0f4f8', borderRadius: '8px', padding: '32px', marginBottom: '32px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', color: '#1e3a8a', marginBottom: '20px' }}>
          Vitajte v MRP Simulátore
        </h1>
        <p style={{ fontSize: '1.1rem', textAlign: 'center', marginBottom: '10px' }}>
          Táto aplikácia slúži na simuláciu plánovania potreby materiálu pomocou metód
          <strong style={{ color: '#2563eb' }}> MRP I</strong> a
          <strong style={{ color: '#2563eb' }}> MRP II</strong>.
        </p>
        <p style={{ textAlign: 'center', fontSize: '1rem', color: '#555' }}>
          Vyberte jednu z kariet vyššie (MRP 1 alebo MRP 2), zadajte vstupné údaje a spustite výpočet.
        </p>
      </div>

      {/* Sekcia - Vstupy */}
      {/* Sekcia - Vstupy */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#1e40af', marginBottom: '16px' }}>🔧 Vstupy</h2>
          <ul style={{ listStyle: 'disc inside', fontSize: '1rem', lineHeight: '1.6' }}>
            <div style={{ marginBottom: '20px' }}>
            <li>
              <strong>MPS (Hlavný výrobný plán):</strong> Definuje plánovanú výrobu výrobkov v jednotlivých časových obdobiach. Slúži ako základ pre výpočet požiadaviek na materiál a reflektuje očakávaný dopyt.
              <br /><em>Príklad:</em> Výroba 100 kusov Džúsu v 1. týždni, 150 kusov v 2. týždni.
            </li>
            </div>
            <div style={{ marginBottom: '20px' }}>
            <li>
              <strong>BOM (Kusovník):</strong> Predstavuje štrukturovaný zoznam všetkých komponentov a materiálov potrebných na výrobu výrobku. Zobrazuje vzťahy medzi výrobkom a jeho komponentmi.
              <br /><em>Príklad:</em> Na výrobu 1 kusu Džúsu sú potrebné 2 jednotky Ovocného koncentrátu a 1 jednotka Vody.
            </li>
            </div>
            <div style={{ marginBottom: '20px' }}>
            <li>
              <strong>Skladové zásoby:</strong> Udáva počiatočný stav dostupných komponentov a materiálov na sklade pred začiatkom plánovania. Využíva sa na optimalizáciu nových objednávok a výroby.
              <br /><em>Príklad:</em> Na sklade je 50 jednotiek Ovocného koncentrátu a 30 jednotiek Vody.
            </li>
            </div>
            <div style={{ marginBottom: '20px' }}>
            <li>
              <strong>Bezpečnostná zásoba:</strong> Stanovuje minimálnu úroveň zásob, ktorá musí byť vždy dostupná na sklade na pokrytie nepredvídaných výkyvov v dopyte alebo oneskorení dodávok.
              <br /><em>Príklad:</em> Pre Ovocný koncentrát je bezpečnostná zásoba nastavená na 10 jednotiek.
            </li>
            </div>
            <div style={{ marginBottom: '20px' }}>
            <li>
              <strong>Dodacia lehota:</strong> Vyjadruje čas potrebný na doručenie komponentu od objednania po prijatie na sklad. Ovplyvňuje správne načasovanie objednávok.
              <br /><em>Príklad:</em> Dodacia lehota pre Vodu je 1 týždeň, pre Ovocný koncentrát 2 týždne.
            </li>
            </div>
            <div style={{ marginBottom: '20px' }}>
            <li>
              <strong>Kapacita:</strong> (iba v MRP II) Udáva maximálne množstvo výrobku, ktoré je možné vyrobiť za jedno časové obdobie, zohľadňujúce výrobné možnosti zariadení, pracovnej sily a procesov.
              <br /><em>Príklad:</em> Výrobná kapacita pre Džús je 500 kusov za týždeň.
            </li>
            </div>
          </ul>
        </div>


      {/* Sekcia - Výstupy */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#1e40af', marginBottom: '16px' }}>📤 Výstupy</h2>
          <ul style={{ listStyle: 'disc inside', fontSize: '1rem', lineHeight: '1.6' }}>
            
            <div style={{ marginBottom: '20px' }}>
              <li>
                <strong>Hrubé požiadavky (Gross Requirements):</strong> Predstavujú celkový dopyt po komponentoch, vypočítaný na základe MPS a BOM.
              </li>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <li>
                <strong>Čisté požiadavky (Net Requirements):</strong> Hrubé požiadavky upravené o stav zásob. Zohľadňuje, čo už máme na sklade.
                 </li>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <li>
                <strong>Plánované objednávky (Planned Orders):</strong> Množstvá komponentov, ktoré musíme objednať alebo vyrobiť, aby sme pokryli čisté požiadavky.
                 </li>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <li>
                <strong>Harmonogram uvoľnenia objednávok:</strong> Určuje, v ktorom týždni musíme objednávky zadať, aby dorazili načas (berieme do úvahy dodaciu lehotu).
                 </li>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <li>
                <strong>Vývoj zásob (Inventory Tracking):</strong> Sleduje priebeh zmien stavu zásob v každom týždni — pred objednávkou, po objednávke a po spotrebe.
                  </li>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <li>
                <strong>Preťaženie kapacity (Capacity Overload):</strong> (iba v MRP II) Označuje, ak plánované objednávky presahujú dostupnú výrobnú kapacitu.
                </li>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <li>
                <strong>Vyťaženie kapacít (Resource Utilization %):</strong> (iba v MRP II) Vyjadruje, koľko % z výrobnej kapacity sa využilo v danom týždni.
                </li>
            </div>

          </ul>
        </div>


      {/* Sekcia - Rozdiel medzi MRP I a MRP II */}
        <div style={{ marginBottom: '50px' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#1e40af', marginBottom: '16px' }}>🔍 Rozdiel medzi MRP I a MRP II</h2>
          <ul style={{ listStyle: 'disc inside', fontSize: '1rem', lineHeight: '1.6' }}>

          <div style={{ marginBottom: '20px' }}>
            <strong>MRP I (Material Requirements Planning):</strong>
            <p style={{ fontSize: '1rem', textAlign: 'justify', color: '#444', marginTop: '8px', lineHeight: '1.6' }}>
              ➔ Zameriava sa na plánovanie materiálových potrieb pre výrobu.
              Cieľom je zabezpečiť, aby boli komponenty k dispozícii v správnom množstve a čase.
            </p>
            <ul style={{ paddingLeft: '20px', marginTop: '8px', fontSize: '1rem', color: '#555' }}>
              <li>Výpočet <strong>hrubých požiadaviek</strong> na základe MPS a BOM.</li>
              <li>Zohľadnenie <strong>aktuálnych zásob</strong> a ich odpočítanie.</li>
              <li>Plánovanie <strong>objednávok komponentov</strong> podľa potreby.</li>
            </ul>
          </div>

          <div>
            <strong>MRP II (Manufacturing Resource Planning):</strong>
            <p style={{ fontSize: '1rem', textAlign: 'justify', color: '#444', marginTop: '8px', lineHeight: '1.6' }}>
              ➔ Rozširuje MRP I o plánovanie dostupných výrobných kapacít (strojov, pracovníkov).
              Zisťuje, či výroba stíha pokryť požiadavky v požadovaných termínoch.
            </p>
            <ul style={{ paddingLeft: '20px', marginTop: '8px', fontSize: '1rem', color: '#555' }}>
              <li>Kontrola <strong>preťaženia kapacít</strong> (ak požiadavky presahujú možnosti výroby).</li>
              <li>Výpočet <strong>vyťaženia kapacít (%)</strong> pre jednotlivé obdobia.</li>
              <li>Optimalizácia plánovania s ohľadom na <strong>výrobné obmedzenia</strong>.</li>
            </ul>
          </div>
          </ul>
        </div>


      {/* Výpočtové kroky (ComputationSteps) */}
      <div style={{ marginBottom: '40px' }}>
        <ComputationSteps 
          mpsItems={[{ item: 'Demo', schedule: { Week1: 100 } }]}
          bomItems={[{ parent: 'Demo', component: 'Component', quantity: 2 }]}
          inventoryItems={[{ item: 'Component', quantity: 50 }]}
          safetyStockItems={[{ item: 'Component', quantity: 10 }]}
          module="mrp1"
        />
      </div>

      {/* Footer */}
      <div style={{ backgroundColor: '#f0f0f0', borderRadius: '8px', padding: '16px', marginTop: '40px', textAlign: 'center', fontSize: '0.9rem', color: '#777' }}>
        Vytvorené ako učebná pomôcka pre simuláciu plánovania výroby
      </div>
    </div>
  );
}

export default Main;
