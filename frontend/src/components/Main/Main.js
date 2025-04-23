import React from 'react';

function Main() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', color: '#333' }}>
      
      {/* Top Section */}
      <div style={{ backgroundColor: '#f0f0f0', borderRadius: '8px', padding: '24px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', color: '#1e40af', marginBottom: '16px' }}>
          Vitajte v MRP Simulátore
        </h2>
        <p style={{ fontSize: '1.1rem', textAlign: 'center' }}>
          Táto aplikácia slúži na simuláciu plánovania potreby materiálu pomocou metód 
          <strong style={{ color: '#2563eb' }}> MRP I</strong> a 
          <strong style={{ color: '#2563eb' }}> MRP II</strong>.
        </p>
        <p style={{ textAlign: 'center', marginTop: '10px' }}>
          Vyberte jednu z kariet vyššie (MRP 1 alebo MRP 2), zadajte vstupné údaje a spustite výpočet.
        </p>
      </div>

      {/* Middle Section */}
      <div style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '12px' }}>🔧 Vstupy</h3>
        <ul style={{ listStyle: 'disc inside', marginBottom: '24px' }}>
          <li><strong>MPS (Hlavný výrobný plán):</strong> Množstvo finálneho produktu, ktoré má byť vyrobené v jednotlivých týždňoch.</li>
          <li><strong>BOM (Kusovník):</strong> Zoznam komponentov a ich množstiev potrebných na výrobu každého produktu.</li>
          <li><strong>Skladové zásoby:</strong> Počiatočné množstvo každého komponentu na sklade.</li>
          <li><strong>Bezpečnostná zásoba:</strong> Minimálne množstvo, ktoré musí ostať na sklade v každom týždni.</li>
          <li><strong>Dodacia lehota:</strong> Počet týždňov potrebný na dodanie položky od objednania po doručenie.</li>
          <li><strong>Kapacita:</strong> (iba v MRP II) Maximálne množstvo, ktoré môže byť vyrobené z každého komponentu za týždeň.</li>
        </ul>

        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '12px' }}>📤 Výstupy</h3>
        <ul style={{ listStyle: 'disc inside', marginBottom: '24px' }}>
          <li><strong>Hrubé požiadavky:</strong> Celkový dopyt po komponentoch vyplývajúci z MPS a BOM.</li>
          <li><strong>Čisté požiadavky:</strong> Hrubé požiadavky znížené o aktuálne zásoby.</li>
          <li><strong>Plánované objednávky:</strong> Požadované doručenia komponentov na základe potreby.</li>
          <li><strong>Harmonogram uvoľnenia objednávok:</strong> Týždne, kedy je potrebné objednávky zadať s ohľadom na dodaciu lehotu.</li>
          <li><strong>Vývoj zásob:</strong> Sleduje stav zásob počas týždňov (začiatok, po objednávke, po použití).</li>
          <li><strong>Preťaženie kapacity:</strong> (iba v MRP II) Označuje, kde sú požiadavky vyššie než dostupná výrobná kapacita.</li>
          <li><strong>Vyťaženie kapacít:</strong> (iba v MRP II) Zobrazuje vyťaženie výrobných liniek v percentách pre každý týždeň.</li>
        </ul>

        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '12px' }}>🔍 Rozdiel medzi MRP I a MRP II</h3>
        <p style={{ textAlign: 'justify' }}>
          <strong>MRP I</strong> sa zameriava na výpočet potreby materiálu (požiadavky, zásoby, objednávky).<br />
          <strong>MRP II</strong> rozširuje MRP I o plánovanie kapacít a umožňuje zistiť, či výroba stíha požiadavky v daných časoch.
        </p>
      </div>

      {/* Bottom Section */}
      <div style={{ backgroundColor: '#f0f0f0', borderRadius: '8px', padding: '16px', marginTop: '24px', textAlign: 'center', fontSize: '0.875rem', color: '#666' }}>
        Vytvorené ako výučbový nástroj pre simuláciu plánovania výroby
      </div>
    </div>
  );
}

export default Main;
