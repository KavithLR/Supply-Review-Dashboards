import { useMemo, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { RefreshedOn } from '../components/RefreshedOn.jsx';
import { useDashboardData } from '../context/DashboardDataContext.jsx';
import {
  joinDemandSupply,
  filterJoined,
  aggregateByTime,
  kpiFromJoined,
  topByGap,
} from '../data/demandSupplyData.js';

const tip = { background: 'var(--tooltip-bg)', border: '1px solid var(--tooltip-border)', borderRadius: 8 };

function fmtK(v) {
  if (Math.abs(v) >= 1000) return `${(v / 1000).toFixed(1)}K`;
  return String(Math.round(v));
}

export function DemandSupplyAlignment() {
  const { demandRows, supplyRows } = useDashboardData();
  const joinedAll = useMemo(() => joinDemandSupply(demandRows, supplyRows), [demandRows, supplyRows]);

  const [plant, setPlant] = useState('all');
  const [sku, setSku] = useState('all');
  const [time, setTime] = useState('all');

  const timeOptions = useMemo(() => {
    const s = new Set(joinedAll.map((r) => r.time));
    return [...s].sort();
  }, [joinedAll]);

  const skuOptions = useMemo(() => {
    const s = new Set(joinedAll.map((r) => r.sku));
    return [...s].sort();
  }, [joinedAll]);

  const joined = useMemo(
    () => filterJoined(joinedAll, { plant, sku, time }),
    [joinedAll, plant, sku, time]
  );
  const barData = useMemo(() => aggregateByTime(joined), [joined]);
  const kpis = useMemo(() => kpiFromJoined(joined), [joined]);
  const ranked = useMemo(
    () =>
      topByGap(joined, 8).map((r) => ({
        ...r,
        skuLabel: `${r.sku}  P${r.demandPriority} · ${r.plant}`,
      })),
    [joined]
  );

  return (
    <div className="ref-page dsa-page">
      <div className="ref-page-header">
        <div>
          <h2 className="ref-title">Demand Supply Alignment</h2>
          <RefreshedOn />
        </div>
        <div className="ref-header-actions">
          <label className="ref-field">
            <span>Plant</span>
            <select value={plant} onChange={(e) => setPlant(e.target.value)} className="ref-select">
              <option value="all">All</option>
              <option value="SS">SS</option>
              <option value="SK">SK</option>
            </select>
          </label>
          <label className="ref-field">
            <span>SKU</span>
            <select value={sku} onChange={(e) => setSku(e.target.value)} className="ref-select dsa-sku-select">
              <option value="all">All</option>
              {skuOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <label className="ref-field">
            <span>Time</span>
            <select value={time} onChange={(e) => setTime(e.target.value)} className="ref-select">
              <option value="all">All</option>
              {timeOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="grid-12" style={{ marginTop: 0 }}>
        <div className="span-6">
          <div className="card dsa-kpi">
            <div className="kpi-dsa-title">Fulfillable demand (filtered)</div>
            <div className="kpi-dsa-value">{kpis.fulfillablePct}%</div>
            <p className="kpi-dsa-hint">Aggregate: Σ min(Planned, Demand) / Σ Demand (capped 100%)</p>
          </div>
        </div>
        <div className="span-6">
          <div className="card dsa-kpi dsa-kpi--risk">
            <div className="kpi-dsa-title">At-risk demand (filtered)</div>
            <div className="kpi-dsa-value">{fmtK(kpis.atRiskQty)} t</div>
            <p className="kpi-dsa-hint">Σ max(Demand − Planned, 0) over visible rows</p>
          </div>
        </div>
      </div>

      <div className="grid-12">
        <div className="span-12">
          <div className="card">
            <h3 className="card-title">Demand vs supply vs gap (by time)</h3>
            <p className="card-sub">Planned = production plan; gap = demand − planned</p>
            <div className="chart-wrap" style={{ minHeight: 320 }}>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={barData} barGap={2} barCategoryGap="18%" margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
                  <XAxis dataKey="time" tick={{ fontSize: 10, fill: 'var(--chart-axis)' }} tickLine={false} />
                  <YAxis
                    tick={{ fontSize: 10, fill: 'var(--chart-axis)' }}
                    tickFormatter={(n) => fmtK(n)}
                    domain={['auto', 'auto']}
                  />
                  <Tooltip
                    contentStyle={tip}
                    labelStyle={{ color: 'var(--text-primary)' }}
                    formatter={(v) => (typeof v === 'number' ? [fmtK(v) + ' t', ''] : v)}
                  />
                  <Legend />
                  <Bar dataKey="demandQty" name="Demand" fill="var(--color-royal)" maxBarSize={24} />
                  <Bar dataKey="plannedQty" name="Planned" fill="var(--color-teal)" maxBarSize={24} />
                  <Bar dataKey="gap" name="Gap (D−P)" fill="var(--rag-amber-bg, #a67c1a)" maxBarSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      <p className="dsa-legend-hint" role="note">
        Grouped columns per time bucket. Gap can be positive (short) or negative (excess) when aggregated. Adjust filters to focus slice.
      </p>

      <div className="grid-12">
        <div className="span-12">
          <div className="card">
            <h3 className="card-title">Top SKUs by |gap|</h3>
            <p className="card-sub">P1–P2 demand priority bars in red; other priorities use plant tone (SS / SK)</p>
            <div className="chart-wrap" style={{ minHeight: 300 }}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ranked} layout="vertical" margin={{ top: 8, right: 20, left: 4, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 10, fill: 'var(--chart-axis)' }} tickFormatter={(n) => `${fmtK(n)} t`} />
                  <YAxis
                    type="category"
                    dataKey="skuLabel"
                    width={200}
                    tick={{ fontSize: 9, fill: 'var(--chart-axis)' }}
                    interval={0}
                  />
                  <Tooltip
                    contentStyle={tip}
                    labelStyle={{ color: 'var(--text-primary)' }}
                    formatter={(v, _n, p) => [
                      `${fmtK(v)} t · P${p.payload.demandPriority}`,
                      'Gap (demand − plan)',
                    ]}
                  />
                  <Bar dataKey="gap" name="Gap" radius={[0, 4, 4, 0]}>
                    {ranked.map((e) => (
                      <Cell
                        key={`${e.sku}-${e.plant}-${e.time}`}
                        fill={e.demandPriority <= 2 ? 'var(--rag-red-bg, #e08585)' : e.plant === 'SS' ? 'var(--color-royal)' : 'var(--color-teal)'}
                        stroke={e.demandPriority <= 2 ? '#9a1f1f' : 'none'}
                      />
                    ))}
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
