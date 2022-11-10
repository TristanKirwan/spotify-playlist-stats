import Chart from "react-apexcharts";

export default function ChartComponent({ options }) {
  return (
    <Chart options={options} series={options?.series} type={options?.type} />
  );
}
