import { RefreshedOn } from '../components/RefreshedOn.jsx';
import { KpiCard } from '../components/KpiCard.jsx';
import { RcaParetoChart } from '../components/RcaParetoChart.jsx';
import { InteractiveIssueTree } from '../components/InteractiveIssueTree.jsx';
import { useDashboardData } from '../context/DashboardDataContext.jsx';
import { otifTrend, rcaPareto, vesselMisses, heatmapRca } from '../data/mockData.js';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export function OtifDashboard() {
  const { rcaPaths } = useDashboardData();

  return (
    <>
      <div className="kpi-ribbon kpi-ribbon--compact">
        <KpiCard
          label="Customer OTIF"
          value="91.3"
          unit="%"
          target="93%"
          variance="-1.7 pts"
          rag="red"
          spark={[94, 93.5, 93, 92.5, 92, 91.5, 91.3]}
          sparkColor="var(--color-orange)"
        />
        <KpiCard
          label="Missed vessel / cut-off"
          value="6.4"
          unit="%"
          target="4%"
          variance="+2.4 pts"
          rag="amber"
          spark={[4.2, 4.5, 5, 5.5, 5.8, 6.1, 6.4]}
        />
        <KpiCard
          label="On-time % (schedule)"
          value="93.8"
          unit="%"
          target="95%"
          variance="-1.2 pts"
          rag="amber"
          spark={[95.5, 95.2, 95, 94.5, 94, 94, 93.8]}
        />
      </div>

      <div className="grid-12" style={{ marginTop: '1rem' }}>
        <div className="span-12">
          <div className="arch-band-title">
            <span>Customer &amp; delivery OTIF</span>
            <p className="arch-band-sub">Trend, drivers, and vessel / cut-off pressure</p>
            <RefreshedOn />
          </div>
        </div>

        <div className="span-5">
          <div className="card">
            <h3 className="card-title">Customer OTIF — trend</h3>
            <p className="card-sub">Monthly % (mock)</p>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={otifTrend} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                  <XAxis dataKey="m" tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} />
                  <YAxis domain={[88, 95]} tickFormatter={(v) => `${v}%`} tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: 'var(--tooltip-bg)', border: '1px solid var(--tooltip-border)' }} />
                  <Line type="monotone" dataKey="otif" name="OTIF %" stroke="var(--color-royal)" strokeWidth={2} dot />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="span-7">
          <RcaParetoChart title="OTIF RCA — Pareto" subtitle="Miss count vs cumulative % — family drivers" data={rcaPareto} />
        </div>
        <div className="span-6">
          <div className="card">
            <h3 className="card-title">% shipments missing vessel / cut-off</h3>
            <p className="card-sub">Leading signal for delivery OTIF (mock)</p>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={vesselMisses} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} />
                  <YAxis tickFormatter={(v) => `${v}%`} tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: 'var(--tooltip-bg)', border: '1px solid var(--tooltip-border)' }} />
                  <Bar dataKey="pct" fill="var(--color-gold)" name="%" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="span-6">
          <div className="card">
            <h3 className="card-title">OTIF RCA contribution by plant</h3>
            <p className="card-sub">% of misses by driver family (mock)</p>
            <div className="table-scroll">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Plant</th>
                    <th>Vessel</th>
                    <th>Customer</th>
                    <th>Material</th>
                    <th>Prod./QA</th>
                    <th>WH</th>
                    <th>External</th>
                  </tr>
                </thead>
                <tbody>
                  {heatmapRca.map((row) => (
                    <tr key={row.plant}>
                      <th scope="row">{row.plant}</th>
                      <td>{row.vessel}%</td>
                      <td>{row.customer}%</td>
                      <td>{row.material}%</td>
                      <td>{row.production}%</td>
                      <td>{row.wh}%</td>
                      <td>{row.external}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="span-12">
          <div className="arch-band-title" style={{ marginTop: '0.5rem' }}>
            <span>OTIF — issue tree</span>
            <p className="arch-band-sub">RCA path drill (mock data)</p>
          </div>
        </div>
        <div className="span-12">
          <InteractiveIssueTree paths={rcaPaths} />
        </div>
      </div>
    </>
  );
}
