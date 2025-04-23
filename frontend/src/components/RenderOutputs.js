import React from 'react';

const RenderOutputs = ({ output }) => {
  const renderTable = (title, data) => {
    const items = Object.keys(data || {});
    const columns = Array.from(
      new Set(items.flatMap(item => Object.keys(data[item])))
    );

    return (
      <div>
        <h2>{title}</h2>
        <table border="1" cellPadding="6">
          <thead>
            <tr>
              <th>Položka</th>
              {columns.map(col => (
                <th key={col}>{col.replace('Week', 'Týždeň ')}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item}>
                <td>{item}</td>
                {columns.map(col => (
                  <td key={col}>{data[item][col] ?? 0}</td>
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
      const typeTranslated = {
        start: 'Začiatok',
        after: 'po objednaní',
        order: '',
        end: 'po spotrebe'
      }[type] || type;

      if (col.includes('after_order')) return `${weekTranslated} - po objednaní`;
      if (col.includes('start')) return `${weekTranslated} - Začiatok`;
      if (col.includes('end')) return `${weekTranslated} - po spotrebe`;
      return col;
    };

    return (
      <div>
        <h2>Vývoj zásob v čase</h2>
        <table border="1" cellPadding="6">
          <thead>
            <tr>
              <th>Položka</th>
              {columns.map(col => (
                <th key={col}>{translateColumn(col)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item}>
                <td>{item}</td>
                {columns.map(col => (
                  <td key={col}>{data[item]?.[col] ?? 0}</td>
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
      <div>
        <h2>Preťaženie kapacít</h2>
        <table border="1" cellPadding="6">
          <thead>
            <tr>
              <th>Položka</th><th>Obdobie</th><th>Požadované</th><th>Dostupné</th><th>Preťaženie</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ item, period, required, available, overload }, index) => (
              <tr key={index}>
                <td>{item}</td>
                <td>{period.replace('Week', 'Týždeň ')}</td>
                <td>{required}</td>
                <td>{available}</td>
                <td>{overload}</td>
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
      return Object.values(periods).some(value => value > 0); // len ak aspoň 1 hodnota > 0
    });
  
    const periods = Array.from(
      new Set(filteredItems.flatMap(item => Object.keys(data[item])))
    ).sort();
  
    if (filteredItems.length === 0) return null;
  
    return (
      <div>
        <h2>Vyťaženie kapacít (%)</h2>
        <table border="1" cellPadding="6">
          <thead>
            <tr>
              <th>Položka</th>
              {periods.map(period => (
                <th key={period}>{period.replace('Week', 'Týždeň ')}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredItems.map(item => (
              <tr key={item}>
                <td>{item}</td>
                {periods.map(p => (
                  <td key={p}>
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
    <div>
      {renderTable('Hrubé požiadavky', output.gross_requirements)}
      {renderTable('Čisté požiadavky', output.net_requirements)}
      {renderTable('Plánované objednávky (dodávky)', output.planned_orders)}
      {renderOrderedInventory(output.inventory_trace)}
      {renderCapacityOverload(output.capacity_overload)}
      {renderResourceUtilization(output.resource_utilization)}

    </div>
  );
};

export default RenderOutputs;
