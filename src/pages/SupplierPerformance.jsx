import { RefreshedOn } from '../components/RefreshedOn.jsx';
import { KpiCard } from '../components/KpiCard.jsx';
import { supplierOtif, supplierOtifTrend, supplierLeadTime, openPoStacked } from '../data/mockData.js';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

export function SupplierPerformance() {
  return (
    <>
      <div className="kpi-ribbon kpi-ribbon--compact">
        <KpiCard
          label="Supplier OTIF"
          value="88.7"
          unit="%"
          target="90%"
          variance="-1.3 pts"
          rag="amber"
          spark={[90, 89.8, 89.5, 89.2, 89, 88.8, 88.7]}
        />
        <KpiCard
          label="In-full % (qty)"
          value="94.1"
          unit="%"
          target="95%"
          variance="-0.9 pts"
          rag="amber"
          spark={[95.5, 95.2, 95, 94.5, 94.3, 94.2, 94.1]}
        />
        <KpiCard
          label="Avg lead time signal"
          value="2.0"
          unit="d"
          target="1.5d"
          variance="+0.5d"
          rag="amber"
          spark={[1.0, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0]}
        />
      </div>

      <div className="grid-12" style={{ marginTop: '1rem' }}>
        <div className="span-12">
          <div className="arch-band-title">
            <span>Supplier performance</span>
            <p className="arch-band-sub">OTIF, lead time, and open purchase-order risk</p>
            <RefreshedOn />
          </div>
        </div>

        <div className="span-6">
          <div className="card">
            <h3 className="card-title">Supplier OTIF — trend (line, %)</h3>
            <p className="card-sub">Roll-up to 88.7% (same as KPI) — top vendors (mock)</p>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={supplierOtifTrend} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                  <XAxis dataKey="m" tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} />
                  <YAxis domain={[84, 92]} tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                  <Tooltip contentStyle={{ background: 'var(--tooltip-bg)', border: '1px solid var(--tooltip-border)' }} />
                  <Legend />
                  <Line type="monotone" dataKey="all" name="All (roll-up)" stroke="var(--color-royal)" strokeWidth={2.5} dot />
                  <Line type="monotone" dataKey="vendorA" name="Vendor A" stroke="var(--color-teal)" strokeWidth={1.5} dot={false} />
                  <Line type="monotone" dataKey="vendorB" name="Vendor B" stroke="var(--color-sky)" strokeWidth={1.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="span-6">
          <div className="card">
            <h3 className="card-title">Supplier OTIF — rank (bar)</h3>
            <p className="card-sub">Current month (mock)</p>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={supplierOtif} layout="vertical" margin={{ top: 8, right: 12, left: 96, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" horizontal={false} />
                  <XAxis type="number" domain={[80, 100]} tickFormatter={(v) => `${v}%`} tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" width={92} tick={{ fill: 'var(--chart-axis)', fontSize: 10 }} />
                  <Tooltip contentStyle={{ background: 'var(--tooltip-bg)', border: '1px solid var(--tooltip-border)' }} />
                  <Bar dataKey="v" fill="var(--color-teal)" name="OTIF %" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="span-6">
          <div className="card">
            <h3 className="card-title">Lead time — bar (days)</h3>
            <p className="card-sub">Receipt vs order (delay signal, mock)</p>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={supplierLeadTime} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: 'var(--chart-axis)', fontSize: 10 }} />
                  <YAxis tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} label={{ value: 'days', angle: -90, position: 'insideLeft' }} />
                  <Tooltip
                    contentStyle={{ background: 'var(--tooltip-bg)', border: '1px solid var(--tooltip-border)' }}
                    formatter={(v) => [`${v} d`, 'Lead time']}
                  />
                  <Bar dataKey="days" name="Days" fill="var(--color-orange)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="span-6">
          <div className="card">
            <h3 className="card-title">Open PO — stacked (count by risk)</h3>
            <p className="card-sub">On track, at risk, past due (mock time series)</p>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={openPoStacked} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
                  <XAxis dataKey="m" tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} />
                  <YAxis tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: 'var(--tooltip-bg)', border: '1px solid var(--tooltip-border)' }} />
                  <Legend />
                  <Bar dataKey="onTrack" name="On track" stackId="p" fill="var(--color-teal)" />
                  <Bar dataKey="atRisk" name="At risk" stackId="p" fill="var(--color-gold)" />
                  <Bar dataKey="pastDue" name="Past due" stackId="p" fill="var(--color-rag-red)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
