import getPercentagePerLetter from "./getPercentagePerLetter";
import getSongAmountPerArtist from "./getSongAmountPerArtist";

const chartNameDataMap = {
  numberPerArtist: getSongAmountPerArtist,
  percentagePerLetter: getPercentagePerLetter,
};

const chartOptionsMap = {
  numberPerArtist: {
    type: "bar",
    dataKey: "name",
    hasXAxis: true,
    hasYAxis: true,
    hasLegend: true,
    hasTooltip: true,
    values: [
      {
        key: "amountSongs",
        color: "#e57a55",
      },
    ],
  },
  percentagePerLetter: {
    type: "pie",
    series: [
      {
        name: "%",
      },
    ],
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        return `${opts?.w?.config?.labels[opts?.seriesIndex]} - ${Math.round(
          val
        )}%`;
      },
    },
    legend: {
      fontFamily: "barlow-regular, Helvetica, Arial",
      fontSize: "14px",
      labels: {
        colors: ["fff8e1"],
      },
    },
  },
};

function generateChartOptions(chartName, data) {
  const options = chartOptionsMap[chartName];
  options.series = data.map((d) => d?.amountSongs);
  options.labels = data.map((d) => d?.character);
  return options;
}

export default function generateChart(chartName, data) {
  if (
    !chartName ||
    !chartNameDataMap[chartName] ||
    !chartOptionsMap[chartName] ||
    !Array.isArray(data)
  )
    return null;

  const chartData = chartNameDataMap[chartName](data);
  const chartOptions = generateChartOptions(chartName, chartData);

  return chartOptions;
}
