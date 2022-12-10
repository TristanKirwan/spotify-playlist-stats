import Chart from "react-apexcharts";
import CustomTable from "./CustomTable";

export default function ChartComponent({ options, series, type }) {
  if (options?.type === "table") {
    return <CustomTable data={options?.data} />;
  }

  return <Chart options={options} series={series} type={type} />;
}
