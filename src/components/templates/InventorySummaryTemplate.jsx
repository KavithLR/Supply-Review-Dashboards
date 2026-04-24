/**
 * Template: inventory summary (area, 100% health, tables).
 * Data: `rmInventoryValueTrend`–aligned months in `referenceTemplateData.js`.
 * Colors: same tokens as the rest of the app in dark / light.
 */
import { useState } from 'react';
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { invValueByLocation, invHealthByMaterial, invSummaryWeeks, invClosingByPlant, invExcessByPlant } from '../../data/referenceTemplateData.js';

const tip = { borderRadius: 8, background: 'var(--tooltip-bg)', border: '1px solid var(--tooltip-border)', color: 'var(--text-primary)' };

export function InventorySummaryTemplate() {
  const [unit, setUnit] = useState('Value');
  const [plant, setPlant] = useState('all');

  return (
    <div className="ref-page ref-page--tight">
      <div className="ref-page-header ref-page-header--row">
        <div>
          <h2 className="ref-title">Raw materials summary</h2>
          <p className="ref-sub">RM index path from the ITC demo</p>
        </div>
        <div className="ref-header-actions ref-header-actions--gap">
          <label className="ref-field">
            <span>Value / quantity</span>
            <select value={unit} onChange={(e) => setUnit(e.target.value)} className="ref-select">
              <option>Value</option>
              <option>Quantity</option>
            </select>
          </label>
          <label className="ref-field">
            <span>Plant</span>
            <select value={plant} onChange={(e) => setPlant(e.target.value)} className="ref-select">
              <option value="all">All (SS + SK)</option>
              <option value="ss">SS</option>
              <option value="sk">SK</option>
            </select>
          </label>
        </div>
      </div>

      <div className="ref-grid-2x2">
        <div className="card ref-card">
          <h3 className="card-title">Raw materials value (index) by time</h3>
          <p className="card-sub">Same series scale as the RM value trend (mock index)</p>
          <div className="chart-wrap" style={{ minHeight: 260 }}>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={invValueByLocation} margin={{ top: 16, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                <XAxis dataKey="w" tick={{ fontSize: 9, fill: 'var(--chart-axis)' }} tickLine={false} />
                <YAxis
                  domain={['dataMin - 4', 'dataMax + 4']}
                  tick={{ fontSize: 10, fill: 'var(--chart-axis)' }}
                  tickFormatter={(v) => `${v}`}
                />
                <Tooltip formatter={(v) => (v == null ? null : [`Index ${v}`, ''])} contentStyle={tip} />
                <Area
                  type="monotone"
                  dataKey="valueM"
                  name="Value index"
                  stroke="var(--color-royal)"
                  fill="var(--color-royal-light)"
                  strokeWidth={2}
                  fillOpacity={0.5}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card ref-card">
          <h3 className="card-title">Raw materials health by % material</h3>
          <p className="card-sub">100% stacked — OOS, healthy, above standard</p>
          <div className="ref-legend-row">
            <span>
              <i className="ref-dot" style={{ background: 'var(--color-rag-red)' }} /> OOS
            </span>
            <span>
              <i className="ref-dot" style={{ background: 'var(--color-rag-green)' }} /> Healthy
            </span>
            <span>
              <i className="ref-dot" style={{ background: 'var(--color-royal)' }} /> Above std
            </span>
          </div>
          <div className="chart-wrap" style={{ minHeight: 260 }}>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={invHealthByMaterial} margin={{ top: 8, right: 8, left: 0, bottom: 0 }} stackOffset="expand">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
                <XAxis dataKey="w" tick={{ fontSize: 8, fill: 'var(--chart-axis)' }} interval={0} angle={-20} textAnchor="end" height={56} />
                <YAxis tick={{ fontSize: 10, fill: 'var(--chart-axis)' }} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
                <Tooltip
                  formatter={(v) => (v == null ? null : [`${(Number(v) * 100).toFixed(0)}%`, ''])}
                  contentStyle={tip}
                />
                <Legend wrapperStyle={{ color: 'var(--text-primary)' }} />
                <Bar dataKey="oos" stackId="a" name="OOS" fill="var(--color-rag-red)" />
                <Bar dataKey="healthy" stackId="a" name="Healthy" fill="var(--color-rag-green)" />
                <Bar dataKey="aboveStd" stackId="a" name="Above std" fill="var(--color-royal)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card ref-card">
          <h3 className="card-title">Closing raw materials value</h3>
          <div className="ref-scroll ref-scroll--h">
            <table className="data-table data-table--compact">
              <thead>
                <tr>
                  <th>Scope</th>
                  {invSummaryWeeks.map((d) => (
                    <th key={d}>{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {invClosingByPlant.map((row) => (
                  <tr key={row.id}>
                    <th scope="row">{row.label}</th>
                    {row.byWeek.map((n, i) => (
                      <td key={invSummaryWeeks[i]}>{(n / 1000).toFixed(0)}K</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card ref-card">
          <h3 className="card-title">Excess raw materials value</h3>
          <p className="ref-foot" style={{ margin: '0 0 0.5rem' }}>
            Non-equivalized units (illustrative)
          </p>
          <div className="ref-scroll ref-scroll--h">
            <table className="data-table data-table--compact">
              <thead>
                <tr>
                  <th>Scope</th>
                  {invSummaryWeeks.map((d) => (
                    <th key={d}>{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {invExcessByPlant.map((row) => (
                  <tr key={row.id}>
                    <th scope="row">{row.label}</th>
                    {row.byWeek.map((n, i) => (
                      <td key={invSummaryWeeks[i]}>{(n / 1000).toFixed(0)}K</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
