import PieOptions from "./chartOptions/pie";
import getPercentagePerLetter from "./getPercentagePerLetter";
import getSongAmountPerArtist from "./getSongAmountPerArtist";
import getSongsPerPerson from "./getSongsPerPerson";

const chartNameDataMap = {
  numberPerArtist: getSongAmountPerArtist,
  percentagePerLetter: getPercentagePerLetter,
  songsPerPerson: getSongsPerPerson,
};

const chartOptionsMap = {
  numberPerArtist: {
    type: "bar",
  },
  songsPerPerson: PieOptions,
  percentagePerLetter: PieOptions,
};

function chartSpecificSeriesMapping(chartName, options, data) {
  switch (chartName) {
    case "percentagePerLetter":
      options.series = data.map((d) => d?.amountSongs);
      options.labels = data.map((d) => d?.character);
      return;
    case "numberPerArtist":
      const dataToReturn = data.map((dataPoint) => {
        return {
          x: dataPoint?.name,
          y: dataPoint?.amountSongs,
        };
      });
      options.series = [
        {
          data: dataToReturn,
        },
      ];
      return;
    case "songsPerPerson":
      options.series = data.map((d) => d?.amountSongs);
      options.labels = data.map((d) => d?.name);
      return;
  }
}

function generateChartOptions(chartName, data) {
  const options = chartOptionsMap[chartName];
  chartSpecificSeriesMapping(chartName, options, data);

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
