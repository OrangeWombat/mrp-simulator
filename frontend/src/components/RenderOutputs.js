import React from 'react';

const RenderOutputs = ({ output }) => {
  const renderTable = (title, data) => {
    const items = Object.keys(data || {});
    const columns = Array.from(
      new Set(items.flatMap(item => Object.keys(data[item])))
    );

    if (items.length === 0) return null;

    return (
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>{title}</h2>
        <table style={tableStyle}>
          <thead style={theadStyle}>
            <tr>
              <th style={thStyle}>Položka</th>
              {columns.map(col => (
                <th key={col} style={thStyle}>{col.replace('Week', 'Týždeň ')}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item}>
                <td style={tdStyle}>{item}</td>
                {columns.map(col => (
                  <td key={col} style={tdStyle}>{data[item][col] ?? 0}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderOrderedInventory = (data) => {
    const items = Object.keys(data || {});
    const allWeeks = Array.from(
      new Set(items.flatMap(item => Object.keys(data[item]).map(p => p.split('_')[0])))
    ).sort();

    const columns = allWeeks.flatMap(week => [`${week}_start`, `${week}_after_order`, `${week}_end`]);

    const translateColumn = (col) => {
      const [week, type] = col.split('_');
      const weekTranslated = week.replace('Week', 'Týždeň');
      if (col.includes('after_order')) return `${weekTranslated} - po objednaní`;
      if (col.includes('start')) return `${weekTranslated} - Začiatok`;
      if (col.includes('end')) return `${weekTranslated} - po spotrebe`;
      return col;
    };

    if (items.length === 0) return null;

    return (
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Vývoj zásob v čase</h2>
        <table style={tableStyle}>
          <thead style={theadStyle}>
            <tr>
              <th style={thStyle}>Položka</th>
              {columns.map(col => (
                <th key={col} style={thStyle}>{translateColumn(col)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item}>
                <td style={tdStyle}>{item}</td>
                {columns.map(col => (
                  <td key={col} style={tdStyle}>{data[item]?.[col] ?? 0}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderCapacityOverload = (data) => {
    const rows = Object.entries(data || {}).flatMap(([item, periods]) => (
      Object.entries(periods).map(([period, values]) => ({ item, period, ...values }))
    ));

    if (rows.length === 0) return null;

    return (
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Preťaženie kapacít</h2>
        <table style={tableStyle}>
          <thead style={theadStyle}>
            <tr>
              <th style={thStyle}>Položka</th>
              <th style={thStyle}>Obdobie</th>
              <th style={thStyle}>Požadované</th>
              <th style={thStyle}>Dostupné</th>
              <th style={thStyle}>Preťaženie</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ item, period, required, available, overload }, index) => (
              <tr key={index}>
                <td style={tdStyle}>{item}</td>
                <td style={tdStyle}>{period.replace('Week', 'Týždeň ')}</td>
                <td style={tdStyle}>{required}</td>
                <td style={tdStyle}>{available}</td>
                <td style={tdStyle}>{overload}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderResourceUtilization = (data) => {
    const items = Object.keys(data || {});
    const filteredItems = items.filter(item => {
      const periods = data[item] || {};
      return Object.values(periods).some(value => value > 0); 
    });

    const periods = Array.from(
      new Set(filteredItems.flatMap(item => Object.keys(data[item])))
    ).sort();

    if (filteredItems.length === 0) return null;

    return (
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Vyťaženie kapacít (%)</h2>
        <table style={tableStyle}>
          <thead style={theadStyle}>
            <tr>
              <th style={thStyle}>Položka</th>
              {periods.map(period => (
                <th key={period} style={thStyle}>{period.replace('Week', 'Týždeň ')}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredItems.map(item => (
              <tr key={item}>
                <td style={tdStyle}>{item}</td>
                {periods.map(p => (
                  <td key={p} style={tdStyle}>
                    {data[item][p] != null ? `${data[item][p]} %` : '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div style={{ marginTop: '30px' }}>
      {renderTable('Hrubé požiadavky', output.gross_requirements)}
      {renderTable('Čisté požiadavky', output.net_requirements)}
      {renderTable('Plánované objednávky (dodávky)', output.planned_orders)}
      {renderOrderedInventory(output.inventory_trace)}
      {renderCapacityOverload(output.capacity_overload)}
      {renderResourceUtilization(output.resource_utilization)}
    </div>
  );
};

// 🔵 Štýly
const sectionStyle = {
  backgroundColor: '#f9fafb',
  padding: '24px',
  borderRadius: '8px',
  marginBottom: '32px',
  boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
};

const sectionTitleStyle = {
  fontSize: '1.5rem',
  color: '#1e40af',
  marginBottom: '16px'
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  backgroundColor: 'white',
  borderRadius: '8px',
  overflow: 'hidden',
  fontSize: '0.95rem'
};

const theadStyle = {
  backgroundColor: '#e0e7ff'
};

const thStyle = {
  padding: '10px',
  borderBottom: '2px solid #ccc',
  textAlign: 'left'
};

const tdStyle = {
  padding: '8px',
  borderBottom: '1px solid #e5e7eb'
};

export default RenderOutputs;
