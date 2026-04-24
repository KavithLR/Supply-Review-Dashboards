import { useState } from 'react';
import { KpiCard } from '../components/KpiCard.jsx';
import { MaterialGapHeatmap } from '../components/MaterialGapHeatmap.jsx';
import { InventorySummaryTemplate } from '../components/templates/InventorySummaryTemplate.jsx';
import { InventoryExceptionTemplate } from '../components/templates/InventoryExceptionTemplate.jsx';
import { rmDioTrend, rmInventoryValueTrend, rmHealthSplit, rmExceptionDual, materialGapByPlant } from '../data/mockData.js';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { RefreshedOn } from '../components/RefreshedOn.jsx';

const INVENTORY_VIEWS = [
  { id: 'summary', label: 'Raw materials summary' },
  { id: 'prioritized', label: 'Prioritized exceptions' },
  { id: 'analytical', label: 'DIO & health (detailed)' },
];

function InventoryAnalytical() {
  return (
    <>
      <div className="kpi-ribbon kpi-ribbon--compact">
        <KpiCard
          label="RM DIO"
          value="42"
          unit="days"
          target="45"
          variance="-3 days"
          rag="green"
          spark={[48, 47, 46, 45, 44, 43, 42]}
        />
        <KpiCard
          label="SLOB / aged %"
          value="8"
          unit="%"
          target="6%"
          variance="+2 pts"
          rag="amber"
          spark={[6, 6.2, 6.5, 7, 7.5, 7.8, 8]}
        />
        <KpiCard
          label="RM availability (index)"
          value="96"
          unit="%"
          target="98%"
          variance="-2 pts"
          rag="amber"
          spark={[99, 98, 98, 97, 97, 96, 96]}
        />
      </div>
      <div className="grid-12" style={{ marginTop: '1rem' }}>
        <div className="span-12">
          <div className="arch-band-title">
            <span>RM — analytical (Gold)</span>
            <p className="arch-band-sub">DIO, trend, health, exceptions, and material×plant heatmap</p>
            <RefreshedOn />
          </div>
        </div>
        <div className="span-6">
          <div className="card">
            <h3 className="card-title">RM inventory value — trend (line)</h3>
            <p className="card-sub">Time × indexed value</p>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={rmInventoryValueTrend} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                  <XAxis dataKey="m" tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} />
                  <YAxis domain={['dataMin - 2', 'dataMax + 2']} tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: 'var(--tooltip-bg)', border: '1px solid var(--tooltip-border)' }} />
                  <Legend />
                  <Line type="monotone" dataKey="value" name="Inv. value index" stroke="var(--color-royal)" strokeWidth={2} dot />
                  <Line
                    type="monotone"
                    dataKey="target"
                    name="Target"
                    stroke="var(--color-gray-mid)"
                    strokeWidth={1.5}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="span-6">
          <div className="card">
            <h3 className="card-title">RM DIO — trend (days)</h3>
            <p className="card-sub">DIO path vs KPI (42d)</p>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={rmDioTrend} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                  <XAxis dataKey="m" tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} />
                  <YAxis tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: 'var(--tooltip-bg)', border: '1px solid var(--tooltip-border)' }} />
                  <Line type="monotone" dataKey="dio" name="DIO" stroke="var(--color-teal)" strokeWidth={2} dot />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="span-12">
          <div className="card">
            <h3 className="card-title">Health split — stacked % (time)</h3>
            <p className="card-sub">Healthy, buffer, at risk, excess</p>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={rmHealthSplit} margin={{ top: 8, right: 12, left: 0, bottom: 8 }} stackOffset="expand">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
                  <XAxis dataKey="m" tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} />
                  <YAxis tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
                  <Tooltip contentStyle={{ background: 'var(--tooltip-bg)', border: '1px solid var(--tooltip-border)' }} />
                  <Legend />
                  <Bar dataKey="healthy" name="Healthy" stackId="h" fill="var(--color-teal)" />
                  <Bar dataKey="buffer" name="Buffer" stackId="h" fill="var(--color-sky)" />
                  <Bar dataKey="atRisk" name="At risk" stackId="h" fill="var(--color-orange)" />
                  <Bar dataKey="excess" name="Excess" stackId="h" fill="var(--color-gold)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="span-6">
          <div className="card">
            <h3 className="card-title">Exceptions — dual bar (shortage vs excess)</h3>
            <p className="card-sub">Material (relative units)</p>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={rmExceptionDual} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
                  <XAxis dataKey="material" tick={{ fill: 'var(--chart-axis)', fontSize: 10 }} />
                  <YAxis tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: 'var(--tooltip-bg)', border: '1px solid var(--tooltip-border)' }} />
                  <Legend />
                  <Bar dataKey="short" name="Shortage" fill="var(--color-rag-red)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="ex" name="Excess" fill="var(--color-royal)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="span-6">
          <MaterialGapHeatmap
            title="RM — material × plant gap (heatmap)"
            subtitle="Gap vs target (days cover); + excess · − shortage"
            rows={materialGapByPlant.rows}
            cols={materialGapByPlant.cols}
            values={materialGapByPlant.values}
          />
        </div>
      </div>
    </>
  );
}

export function InventoryRm() {
  const [view, setView] = useState('summary');

  return (
    <>
      <div className="ref-page-header" style={{ marginBottom: '0.35rem', border: 'none', padding: 0 }}>
        <h2 className="ref-title" style={{ marginBottom: 0 }}>
          Raw materials inventory
        </h2>
        <RefreshedOn />
      </div>
      <nav className="ref-subnav" aria-label="Raw materials view">
        {INVENTORY_VIEWS.map((v) => (
          <button
            key={v.id}
            type="button"
            className={`ref-subnav-btn ${view === v.id ? 'active' : ''}`}
            onClick={() => setView(v.id)}
          >
            {v.label}
          </button>
        ))}
      </nav>
      <div className="ref-subnav-body">
        {view === 'summary' && <InventorySummaryTemplate />}
        {view === 'prioritized' && <InventoryExceptionTemplate />}
        {view === 'analytical' && <InventoryAnalytical />}
      </div>
    </>
  );
}
