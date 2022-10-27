import { ClientOnly } from "remix-utils";
import Chart from "./Chart.client";

export default function ChartRenderer({ options }) {
  return <ClientOnly>{() => <Chart options={options} />}</ClientOnly>;
}
