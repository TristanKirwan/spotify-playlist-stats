import Chart from "react-apexcharts";

export default function ChartComponent({ options }) {
  console.log("options", options);
  return (
    <Chart options={options} series={options?.series} type={options?.type} />
  );
}
