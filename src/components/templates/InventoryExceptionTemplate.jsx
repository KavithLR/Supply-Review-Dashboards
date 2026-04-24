/**
 * Template: excess vs deficit horizontal bars. ITC material × location copy.
 */
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { invExcessQty, invDeficitQty } from '../../data/referenceTemplateData.js';

const tip = { background: 'var(--tooltip-bg)', border: '1px solid var(--tooltip-border)', borderRadius: 8, color: 'var(--text-primary)' };

export function InventoryExceptionTemplate() {
  const [week, setWeek] = useState('YTD (demo)');
  const [material, setMaterial] = useState('All');
  const [loc, setLoc] = useState('All');
  const [plant, setPlant] = useState('all');
  const [vUnit, setVUnit] = useState('Quantity');

  return (
    <div className="ref-page ref-page--tight">
      <div className="ref-page-header ref-page-header--row">
        <div>
          <h2 className="ref-title">Prioritized raw materials exceptions (above &amp; under target)</h2>
        </div>
        <p className="ref-sub" style={{ margin: 0 }}>
          As of 2026-02-20 ICT — same priority logic as the RM exception list (template)
        </p>
      </div>
      <div className="ref-filter-bar" style={{ flexWrap: 'wrap' }}>
        <label className="ref-field ref-field--grow">
          <span>Time</span>
          <select value={week} onChange={(e) => setWeek(e.target.value)} className="ref-select">
            <option>YTD (demo)</option>
            <option>Feb 2026</option>
            <option>Jan 2026</option>
          </select>
        </label>
        <label className="ref-field ref-field--grow">
          <span>Value / quantity</span>
          <select value={vUnit} onChange={(e) => setVUnit(e.target.value)} className="ref-select">
            <option>Quantity</option>
            <option>Value</option>
          </select>
        </label>
        <label className="ref-field ref-field--grow">
          <span>Material</span>
          <select value={material} onChange={(e) => setMaterial(e.target.value)} className="ref-select">
            <option>All</option>
          </select>
        </label>
        <label className="ref-field ref-field--grow">
          <span>Sloc / location</span>
          <select value={loc} onChange={(e) => setLoc(e.target.value)} className="ref-select">
            <option>All</option>
          </select>
        </label>
        <label className="ref-field ref-field--grow">
          <span>Plant</span>
          <select value={plant} onChange={(e) => setPlant(e.target.value)} className="ref-select">
            <option value="all">All (SS + SK)</option>
            <option value="ss">SS</option>
            <option value="sk">SK</option>
          </select>
        </label>
      </div>
      <div className="ref-grid-except">
        <div className="card ref-card">
          <h3 className="card-title ref-title-excess">RM excess quantity</h3>
          <div className="chart-wrap" style={{ minHeight: 260 }}>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={invExcessQty} layout="vertical" margin={{ top: 4, right: 36, left: 4, bottom: 4 }} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--chart-grid)" />
                <XAxis type="number" tick={{ fontSize: 10, fill: 'var(--chart-axis)' }} tickFormatter={(v) => `${v}K`} />
                <YAxis type="category" dataKey="id" width={220} tick={{ fontSize: 9, fill: 'var(--chart-axis)' }} />
                <Tooltip formatter={(v) => (v == null ? null : [`${v}K`])} contentStyle={tip} />
                <Bar dataKey="k" name="Excess" fill="var(--color-royal)">
                  <LabelList
                    dataKey="k"
                    position="right"
                    formatter={(v) => (v == null ? '' : `${v}K`)}
                    style={{ fontSize: 9, fill: 'var(--chart-axis)' }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card ref-card ref-card--scroll">
          <h3 className="card-title" style={{ color: 'var(--color-rag-red)' }}>
            RM deficit quantity
          </h3>
          <div className="chart-wrap ref-scroll" style={{ minHeight: 260, maxHeight: 300 }}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={invDeficitQty} layout="vertical" margin={{ top: 4, right: 36, left: 4, bottom: 4 }} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--chart-grid)" />
                <XAxis type="number" tick={{ fontSize: 10, fill: 'var(--chart-axis)' }} tickFormatter={(v) => `${v}K`} />
                <YAxis type="category" dataKey="id" width={200} tick={{ fontSize: 9, fill: 'var(--chart-axis)' }} />
                <Tooltip contentStyle={tip} />
                <Bar dataKey="k" name="Deficit" fill="var(--color-orange)">
                  <LabelList dataKey="k" position="right" formatter={(v) => `${v}K`} style={{ fontSize: 9, fill: 'var(--chart-axis)' }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <p className="ref-foot">Non-equivalized units — tie to the RM exception dual-bar module in a live build.</p>
    </div>
  );
}
