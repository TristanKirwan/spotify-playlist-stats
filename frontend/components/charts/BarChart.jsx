import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function InternalBarchart({ data, options }) {
  if (!Array.isArray(options?.values) || options.values.length <= 0) return;

  return (
    <ResponsiveContainer width="100%" height="100%" aspect="1">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        {options?.hasXAxis && options?.dataKey && (
          <XAxis dataKey={options.dataKey} angle={-90} />
        )}
        {options?.hasYAxis && <YAxis />}
        {options?.hasTooltip && (
          <Tooltip labelStyle={{ color: "var(--black)" }} />
        )}
        {options?.hasLegend && <Legend />}
        {options.values.map((value) => (
          <Bar dataKey={value?.key} fill={value?.color} key={value?.key} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
