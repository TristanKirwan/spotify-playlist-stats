import Chart from "react-apexcharts";
import CustomTable from './CustomTable';

export default function ChartComponent({ options }) {

  if(options?.type === 'table') {
    return <CustomTable data={options?.data} />
  }

  return (
    <Chart options={options} series={options?.series} type={options?.type} />
  );
}
