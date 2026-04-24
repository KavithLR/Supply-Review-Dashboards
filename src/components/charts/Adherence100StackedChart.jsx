import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function Adherence100StackedChart({ data, title, subtitle }) {
  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>
      {subtitle ? <p className="card-sub">{subtitle}</p> : null}
      <div className="chart-wrap chart-wrap--tall">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 8 }} stackOffset="expand">
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
            <XAxis dataKey="m" tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} />
            <YAxis tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
            <Tooltip
              contentStyle={{ background: 'var(--tooltip-bg)', border: '1px solid var(--tooltip-border)', borderRadius: 8 }}
              formatter={(value, _n, p) => [`${value}%`, p?.name]}
            />
            <Legend />
            <Bar dataKey="onPlan" name="On plan" stackId="a" fill="var(--color-teal)" />
            <Bar dataKey="overPlan" name="Over-produce" stackId="a" fill="var(--color-gold)" />
            <Bar dataKey="underPlan" name="Under-produce" stackId="a" fill="var(--color-orange)" />
            <Bar dataKey="notRun" name="No run / N/A" stackId="a" fill="var(--color-gray-mid)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
