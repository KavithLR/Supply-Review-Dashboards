import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

export function BottleneckScatterChart({ data, title, subtitle }) {
  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>
      {subtitle ? <p className="card-sub">{subtitle}</p> : null}
      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height={280}>
          <ScatterChart margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
            <XAxis type="category" dataKey="line" name="Line" tick={{ fill: 'var(--chart-axis)', fontSize: 10 }} allowDuplicatedCategory={false} />
            <YAxis type="number" dataKey="load" name="Load index" domain={[60, 120]} tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              contentStyle={{ background: 'var(--tooltip-bg)', border: '1px solid var(--tooltip-border)', borderRadius: 8 }}
              formatter={(_v, _n, p) => {
                const pl = p?.payload;
                if (!pl) return null;
                return [`${pl.load} (cap ref ${pl.cap})`, 'Load vs cap ref'];
              }}
            />
            <Legend />
            <ReferenceLine y={100} stroke="var(--color-gray-mid)" strokeDasharray="4 4" label={{ value: '100% cap ref', fill: 'var(--chart-axis)', fontSize: 10 }} />
            <Scatter name="Line load" data={data} fill="var(--color-royal)" shape="circle" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
