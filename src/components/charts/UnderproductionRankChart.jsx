import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export function UnderproductionRankChart({ data, title, subtitle }) {
  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>
      {subtitle ? <p className="card-sub">{subtitle}</p> : null}
      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} layout="vertical" margin={{ top: 8, right: 12, left: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" horizontal={false} />
            <XAxis type="number" tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} tickFormatter={(v) => `${v} t`} />
            <YAxis type="category" dataKey="sku" width={112} tick={{ fill: 'var(--chart-axis)', fontSize: 10 }} />
            <Tooltip
              contentStyle={{ background: 'var(--tooltip-bg)', border: '1px solid var(--tooltip-border)', borderRadius: 8 }}
              formatter={(v) => [`${v} t (gap)`, 'Underproduction']}
            />
            <Bar dataKey="gap" name="Gap" radius={[0, 4, 4, 0]}>
              {data.map((e) => (
                <Cell key={e.sku} fill={e.plant === 'SS' ? 'var(--color-royal)' : 'var(--color-teal)'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
