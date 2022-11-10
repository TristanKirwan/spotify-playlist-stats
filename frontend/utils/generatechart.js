import PieOptions from "./chartOptions/pie";
import BarOptions from './chartOptions/bar';
import getPercentagePerLetter from "./getPercentagePerLetter";
import getSongAmountPerArtist from "./getSongAmountPerArtist";
import getSongsPerPerson from "./getSongsPerPerson";
import getTotalPlaylistLengthPerPerson from "./getTotalPlaylistLengthPerPerson";

import percentagePerLetterOptions from './chartOptions/charts/percentagePerLetter';
import numberPerArtistOptions from "./chartOptions/charts/numberPerArtis";
import songsPerPersonOptions from "./chartOptions/charts/songsPerPerson";
import playlistLengthPerPersonOptions from "./chartOptions/charts/playlistLengthPerPerson";

const chartNameDataMap = {
  numberPerArtist: getSongAmountPerArtist,
  percentagePerLetter: getPercentagePerLetter,
  songsPerPerson: getSongsPerPerson,
  playlistLengthPerPerson: getTotalPlaylistLengthPerPerson
};

const chartOptionsMap = {
  numberPerArtist: {
    type: "bar",
  },
  songsPerPerson: PieOptions,
  percentagePerLetter: PieOptions,
  playlistLengthPerPerson: BarOptions
};

function chartSpecificSeriesMapping(chartName, options, data) {
  switch (chartName) {
    case "percentagePerLetter":
      return percentagePerLetterOptions(options, data);
    case "numberPerArtist":
      return numberPerArtistOptions(options, data);
    case "songsPerPerson":
      return songsPerPersonOptions(options, data);
    case "playlistLengthPerPerson": 
      return playlistLengthPerPersonOptions(options, data);
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
