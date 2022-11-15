// Data mapping functions
import getPercentagePerLetter from "./getPercentagePerLetter";
import getSongAmountPerArtist from "./getSongAmountPerArtist";
import getSongsPerPerson from "./getSongsPerPerson";
import getTotalPlaylistLengthPerPerson from "./getTotalPlaylistLengthPerPerson";
import getLengthPerLetterPercentage from './getLengthPerLetterPercentage';
import getAverageLengthPerLetter from './getAverageLengthPerLetter';
import getAveragePopularityPerPerson from './getAveragePopularityPerPerson'
import getMaxArtistPerPerson from './getMaxArtistPerPerson';

// General options
import PieOptions from "./chartOptions/pie";
import BarOptions from './chartOptions/bar';

// Option functions
import percentagePerLetterOptions from './chartOptions/charts/percentagePerLetter';
import numberPerArtistOptions from "./chartOptions/charts/numberPerArtis";
import songsPerPersonOptions from "./chartOptions/charts/songsPerPerson";
import playlistLengthPerPersonOptions from "./chartOptions/charts/playlistLengthPerPerson";
import playlistLengthPerPersonPercentOptions from './chartOptions/charts/playlistLengthPerPersonPercent'
import percentageLengthPerLetterOptions from './chartOptions/charts/percentageLengthPerLetter'
import averageLengthPerLetterOptions from './chartOptions/charts/averageLengthPerLetter';
import averagePopularityPerPersonOptions from './chartOptions/charts/averagePopularityPerPerson';
import maxOfArtistPerPersonOptions from './chartOptions/charts/maxOfArtistPerPerson';

const chartNameDataMap = {
  numberPerArtist: getSongAmountPerArtist,
  percentagePerLetter: getPercentagePerLetter,
  songsPerPerson: getSongsPerPerson,
  playlistLengthPerPerson: getTotalPlaylistLengthPerPerson,
  playlistLengthPerPersonPercent: getTotalPlaylistLengthPerPerson,
  lengthPerLetter: getLengthPerLetterPercentage,
  avgLengthPerLetter: getAverageLengthPerLetter,
  avgPopularityPerPerson: getAveragePopularityPerPerson,
  maxOfArtistPerPerson: getMaxArtistPerPerson
};

const chartOptionsMap = {
  numberPerArtist: BarOptions,
  songsPerPerson: PieOptions,
  percentagePerLetter: PieOptions,
  playlistLengthPerPerson: BarOptions,
  playlistLengthPerPersonPercent: PieOptions,
  lengthPerLetter: PieOptions,
  avgLengthPerLetter: BarOptions,
  avgPopularityPerPerson: BarOptions,
  maxOfArtistPerPerson: BarOptions
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
    case "playlistLengthPerPersonPercent":
      return playlistLengthPerPersonPercentOptions(options, data);
    case "lengthPerLetter":
      return percentageLengthPerLetterOptions(options, data);
    case "avgLengthPerLetter": 
      return averageLengthPerLetterOptions(options, data)
    case "avgPopularityPerPerson":
      return averagePopularityPerPersonOptions(options, data)
    case "maxOfArtistPerPerson":
      return maxOfArtistPerPersonOptions(options, data)
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
