import getSongAmountPerArtist from "./getSongAmountPerArtist";

const chartNameDataMap = {
  numberPerArtist: getSongAmountPerArtist,
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
};

export default function generateChart(chartName, data) {
  if (
    !chartName ||
    !chartNameDataMap[chartName] ||
    !chartOptionsMap[chartName] ||
    !Array.isArray(data)
  )
    return null;

  const chartData = chartNameDataMap[chartName](data);
  const chartOptions = chartOptionsMap[chartName];

  return {
    data: chartData,
    options: chartOptions,
  };
}
