import BarChart from "./BarChart";

const chartComponents = {
  bar: BarChart,
};

export default function ChartRenderer({ data, options }) {
  if (!options?.type || !chartComponents[options.type]) return;
  const Comp = chartComponents[options.type];
  return <Comp data={data} options={options} />;
}
