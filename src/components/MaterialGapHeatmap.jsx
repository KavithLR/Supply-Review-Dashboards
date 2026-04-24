/** Material × plant risk heatmap — gap vs target (days cover); positive = excess, negative = shortage */

function cellClass(v) {
  if (v < -0.5) return 'hm-red';
  if (v < 0) return 'hm-amber';
  if (v > 0.5) return 'hm-blue';
  return 'hm-green';
}

export function MaterialGapHeatmap({ title, subtitle, rows, cols, values }) {
  return (
    <div className="card heatmap-card">
      <h3 className="card-title">{title}</h3>
      {subtitle ? <p className="card-sub">{subtitle}</p> : null}
      <div className="hm-table-wrap">
        <table className="hm-table">
          <thead>
            <tr>
              <th className="hm-corner">Material / Plant</th>
              {cols.map((c) => (
                <th key={c}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, ri) => (
              <tr key={r}>
                <th scope="row">{r}</th>
                {cols.map((_, ci) => {
                  const v = values[ri]?.[ci] ?? 0;
                  return (
                    <td key={`${ri}-${ci}`}>
                      <span className={`hm-cell ${cellClass(v)}`} title={`${v} d vs target`}>
                        {v > 0 ? `+${v}` : v}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="hm-legend">
        <span>
          <i className="hm-dot hm-red" /> Short
        </span>
        <span>
          <i className="hm-dot hm-amber" /> Tight
        </span>
        <span>
          <i className="hm-dot hm-green" /> OK
        </span>
        <span>
          <i className="hm-dot hm-blue" /> Excess
        </span>
      </div>
    </div>
  );
}
