import { ClientOnly } from "remix-utils";
import Chart from "./Chart.client";

export default function ChartRenderer({ options, series, type }) {
  // The key we send along to the Chart component is very important! It forces a
  // remount of the chart, which is necessary because Apexcharts has a problem
  // with updating options. It seems to merge the previous with the new so you
  // don't start with a clean slate.
  return (
    <ClientOnly>
      {() => (
        <Chart
          options={options}
          series={series}
          type={type}
          key={options?.chart?.id}
        />
      )}
    </ClientOnly>
  );
}
