/**
 * Template: production adherence & attainment (same chart types as reference wireframe;
 * data from ITC supply review demo — `referenceTemplateData.js` + `planVsActual`).
 * Theme: bar/line colors follow `theme.css` chart tokens (light + dark).
 */
import { useState } from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  LabelList,
} from 'recharts';
import {
  productionWeekLabels,
  productionAttainmentCombo,
  productionOverallAdherence,
  productionAdherenceBySeries,
  productionTableLatest,
  topOverproductions,
  topUnderproductions,
} from '../../data/referenceTemplateData.js';
import { refAdherenceCellClass } from './productionAdherenceRag.js';

const fmtK = (v) => (Math.abs(v) >= 1000 ? `${(v / 1000).toFixed(0)}K` : `${Math.round(v)}`);

const tipStyle = {
  borderRadius: 8,
  border: '1px solid var(--tooltip-border)',
  background: 'var(--tooltip-bg)',
  color: 'var(--text-primary)',
};

export function ProductionAttainmentTemplate() {
  const [locationId, setLocationId] = useState('All');
  const [materialId, setMaterialId] = useState('All');
  const [materialName, setMaterialName] = useState('All');
  const [packaging, setPackaging] = useState('All');
  const [series, setSeries] = useState('All');
  const [plant, setPlant] = useState('all');

  const maxQty = Math.max(
    ...productionAttainmentCombo.map((d) => Math.max(d.plan, d.produced)),
    1
  );

  return (
    <div className="ref-page">
      <div className="ref-page-header">
        <div>
          <h2 className="ref-title">Production adherence and attainment</h2>
          <p className="ref-sub">Refreshed 2026-02-20 06:00 ICT — same demo path as the ITC supply review model.</p>
        </div>
        <div className="ref-header-actions">
          <label className="ref-field">
            <span>Plant</span>
            <select value={plant} onChange={(e) => setPlant(e.target.value)} className="ref-select">
              <option value="all">All (SS + SK)</option>
              <option value="ss">SS only</option>
              <option value="sk">SK only</option>
            </select>
          </label>
          <button
            type="button"
            className="gfb-btn secondary"
            onClick={() => {
              setLocationId('All');
              setMaterialId('All');
              setMaterialName('All');
              setPackaging('All');
              setSeries('All');
              setPlant('all');
            }}
          >
            Clear filters
          </button>
        </div>
      </div>

      <div className="ref-filter-bar">
        {[
          ['Location / sloc', locationId, setLocationId],
          ['Material code', materialId, setMaterialId],
          ['Material name', materialName, setMaterialName],
          ['Packaging', packaging, setPackaging],
          ['Product family', series, setSeries],
        ].map(([label, val, set]) => (
          <label key={label} className="ref-field ref-field--grow">
            <span>{label}</span>
            <select value={val} onChange={(e) => set(e.target.value)} className="ref-select">
              <option>All</option>
              <option>Filtered</option>
            </select>
          </label>
        ))}
      </div>

      <div className="ref-two-col">
        <div className="ref-col-left">
          <div className="card ref-card">
            <h3 className="card-title">Planned / produced quantities</h3>
            <p className="card-sub">Indexed output · lines = weighted adherence &amp; attainment (template)</p>
            <div className="chart-wrap" style={{ minHeight: 300 }}>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={productionAttainmentCombo} barGap={4} margin={{ top: 20, right: 16, left: 0, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
                  <XAxis dataKey="w" tick={{ fontSize: 10, fill: 'var(--chart-axis)' }} tickLine={false} />
                  <YAxis
                    yAxisId="qty"
                    tickFormatter={fmtK}
                    domain={[0, Math.ceil(maxQty * 1.12)]}
                    tick={{ fontSize: 10, fill: 'var(--chart-axis)' }}
                  />
                  <YAxis
                    yAxisId="pct"
                    orientation="right"
                    domain={[75, 105]}
                    tickFormatter={(v) => `${v}%`}
                    tick={{ fontSize: 10, fill: 'var(--chart-axis)' }}
                  />
                  <Tooltip
                    contentStyle={tipStyle}
                    formatter={(v, name) =>
                      name === 'wAdh' || name === 'wAtt' || name === 'Weighted adherence' || name === 'Weighted attainment'
                        ? [`${v}%`, name]
                        : [fmtK(v), name]
                    }
                  />
                  <Legend wrapperStyle={{ color: 'var(--text-primary)' }} />
                  <Bar
                    yAxisId="qty"
                    dataKey="plan"
                    name="Planned quantity"
                    fill="var(--chart-planned-bar)"
                    radius={[2, 2, 0, 0]}
                    maxBarSize={16}
                  />
                  <Bar
                    yAxisId="qty"
                    dataKey="produced"
                    name="Produced quantity"
                    fill="var(--chart-produced-bar)"
                    radius={[2, 2, 0, 0]}
                    maxBarSize={16}
                  />
                  <Line
                    yAxisId="pct"
                    type="monotone"
                    dataKey="wAdh"
                    name="Weighted adherence"
                    stroke="var(--chart-line-adherence)"
                    strokeWidth={2}
                    dot={{ r: 3, fill: 'var(--chart-line-adherence)' }}
                  >
                    <LabelList
                      dataKey="wAdh"
                      position="top"
                      formatter={(v) => `${v}%`}
                      style={{ fontSize: 9, fill: 'var(--chart-line-adherence)' }}
                    />
                  </Line>
                  <Line
                    yAxisId="pct"
                    type="monotone"
                    dataKey="wAtt"
                    name="Weighted attainment"
                    stroke="var(--chart-line-attainment)"
                    strokeWidth={2}
                    dot={{ r: 3, fill: 'var(--chart-line-attainment)' }}
                  >
                    <LabelList
                      dataKey="wAtt"
                      position="top"
                      formatter={(v) => `${v}%`}
                      style={{ fontSize: 9, fill: 'var(--chart-line-attainment)' }}
                      offset={10}
                    />
                  </Line>
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <p className="ref-foot">Overall % is weighted adherence (same concept as the Gold architecture plan-adherence view).</p>
          </div>

          <div className="card ref-card">
            <h3 className="card-title">Overall performance (weekly %)</h3>
            <div className="ref-heatmap-legend ref-heatmap-legend--inline">
              <span>
                <i className="ref-dot ref-bucket-1" /> ≤ 80%
              </span>
              <span>
                <i className="ref-dot ref-bucket-2" /> 80%–90%
              </span>
              <span>
                <i className="ref-dot ref-bucket-3" /> 90%–95%
              </span>
              <span>
                <i className="ref-dot ref-bucket-4" /> &gt; 95%
              </span>
            </div>
            <div className="ref-scroll">
              <table className="ref-heatmap-compact">
                <thead>
                  <tr>
                    <th />
                    {productionWeekLabels.map((w) => (
                      <th key={w}>
                        {w}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Overall</th>
                    {productionOverallAdherence.map((p, i) => (
                      <td key={productionWeekLabels[i] ?? i}>
                        <span className={`ref-heatcell ${refAdherenceCellClass(p)}`}>{p}%</span>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="card ref-card">
            <h3 className="card-title">Average production adherence by packaging</h3>
            <div className="ref-scroll">
              <table className="ref-heatmap-compact ref-heatmap-compact--tall">
                <thead>
                  <tr>
                    <th>Line / family</th>
                    {productionWeekLabels.map((w) => (
                      <th key={w}>{w}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {productionAdherenceBySeries.rows.map((rowName, ri) => (
                    <tr key={rowName}>
                      <th scope="row">{rowName}</th>
                      {productionAdherenceBySeries.values[ri].map((p, ci) => (
                        <td key={productionWeekLabels[ci] ?? ci}>
                          <span className={`ref-heatcell ${refAdherenceCellClass(p)}`}>{p}%</span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card ref-card">
            <h3 className="card-title">Latest week summary</h3>
            <div className="table-scroll">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Planned quantity</th>
                    <th>Produced quantity</th>
                    <th>Delta</th>
                  </tr>
                </thead>
                <tbody>
                  {productionTableLatest.map((r) => (
                    <tr key={r.date}>
                      <th scope="row">{r.date}</th>
                      <td>{r.plan.toLocaleString()}</td>
                      <td>{r.produced.toLocaleString()}</td>
                      <td className={r.delta < 0 ? 'ref-neg' : r.delta > 0 ? 'ref-pos' : ''}>{r.delta.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="ref-col-right">
          <div className="card ref-card">
            <h3 className="card-title ref-title-excess">Top overproductions (qty)</h3>
            <p className="card-sub">Largest over-plan (demo SKUs, SS/SK mix)</p>
            <div className="chart-wrap" style={{ minHeight: 240 }}>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={topOverproductions} layout="vertical" margin={{ top: 4, right: 28, left: 4, bottom: 4 }} barSize={16}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--chart-grid)" />
                  <XAxis type="number" tickFormatter={fmtK} tick={{ fontSize: 10, fill: 'var(--chart-axis)' }} />
                  <YAxis type="category" dataKey="material" width={200} tick={{ fontSize: 9, fill: 'var(--chart-axis)' }} />
                  <Tooltip contentStyle={tipStyle} />
                  <Bar dataKey="delta" name="Over" fill="var(--color-royal)" radius={[0, 4, 4, 0]}>
                    <LabelList
                      dataKey="delta"
                      position="right"
                      formatter={(v) => fmtK(v)}
                      style={{ fontSize: 9, fill: 'var(--chart-axis)' }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="card ref-card">
            <h3 className="card-title ref-title-deficit">Top underproductions (gap)</h3>
            <p className="card-sub">Largest under-plan (same `underproductionGaps` story)</p>
            <div className="chart-wrap" style={{ minHeight: 240 }}>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={topUnderproductions} layout="vertical" margin={{ top: 4, right: 28, left: 4, bottom: 4 }} barSize={16}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--chart-grid)" />
                  <XAxis type="number" domain={['dataMin - 20', 0]} tick={{ fontSize: 10, fill: 'var(--chart-axis)' }} />
                  <YAxis type="category" dataKey="material" width={200} tick={{ fontSize: 9, fill: 'var(--chart-axis)' }} />
                  <Tooltip contentStyle={tipStyle} />
                  <Bar dataKey="delta" name="Under" fill="var(--color-orange)" radius={[0, 4, 4, 0]}>
                    <LabelList dataKey="delta" position="right" style={{ fontSize: 9, fill: 'var(--chart-axis)' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
