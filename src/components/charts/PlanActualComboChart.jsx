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
} from 'recharts';

const fmtK = (v) => (v >= 1_000 ? `${(v / 1_000).toFixed(1)}k` : `${v}`);

export function PlanActualComboChart({ data, title, subtitle }) {
  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>
      {subtitle ? <p className="card-sub">{subtitle}</p> : null}
      <div className="chart-wrap chart-wrap--tall">
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
            <XAxis dataKey="t" tick={{ fill: 'var(--chart-axis)', fontSize: 10 }} interval={0} angle={-20} textAnchor="end" height={56} />
            <YAxis
              yAxisId="q"
              tick={{ fill: 'var(--chart-axis)', fontSize: 11 }}
              tickFormatter={fmtK}
            />
            <YAxis
              yAxisId="p"
              orientation="right"
              domain={[90, 100]}
              tickFormatter={(v) => `${v}%`}
              tick={{ fill: 'var(--chart-axis)', fontSize: 11 }}
            />
            <Tooltip
              contentStyle={{ background: 'var(--tooltip-bg)', border: '1px solid var(--tooltip-border)', borderRadius: 8 }}
              formatter={(value, name) => {
                if (name === 'adherence' || name === 'Adherence %') return [`${Number(value).toFixed(1)}%`, 'Adherence %'];
                if (name === 'plan' || name === 'Plan (qty index)') return [fmtK(value), 'Plan (qty)'];
                return [fmtK(value), 'Actual (qty)'];
              }}
            />
            <Legend />
            <Bar yAxisId="q" dataKey="plan" name="Plan (qty index)" fill="var(--color-sky-light)" radius={[4, 4, 0, 0]} maxBarSize={32} />
            <Bar yAxisId="q" dataKey="actual" name="Actual" fill="var(--color-teal)" radius={[4, 4, 0, 0]} maxBarSize={32} />
            <Line
              yAxisId="p"
              type="monotone"
              dataKey="adh"
              name="Adherence %"
              stroke="var(--color-royal)"
              strokeWidth={2.5}
              dot={{ r: 3 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
