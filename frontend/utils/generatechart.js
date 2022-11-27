// Data mapping functions
import BarOptions from "./chartOptions/bar";
import averageLengthPerLetterOptions from "./chartOptions/charts/averageLengthPerLetter";
import averagePopularityPerPersonOptions from "./chartOptions/charts/averagePopularityPerPerson";
import longestShortestSongPerLetterOptions from "./chartOptions/charts/longestShortestSongPerLetter";
import maxOfArtistPerPersonOptions from "./chartOptions/charts/maxOfArtistPerPerson";
import numberPerArtistOptions from "./chartOptions/charts/numberPerArtis";
import percentageLengthPerLetterOptions from "./chartOptions/charts/percentageLengthPerLetter";
// Option functions
import percentagePerLetterOptions from "./chartOptions/charts/percentagePerLetter";
import playlistLengthPerPersonOptions from "./chartOptions/charts/playlistLengthPerPerson";
import playlistLengthPerPersonPercentOptions from "./chartOptions/charts/playlistLengthPerPersonPercent";
import songsPerPersonOptions from "./chartOptions/charts/songsPerPerson";
// General options
import PieOptions from "./chartOptions/pie";
import TableOptions from "./chartOptions/table";
import getAverageLengthPerLetter from "./getAverageLengthPerLetter";
import getAveragePopularityPerPerson from "./getAveragePopularityPerPerson";
import getLengthPerLetterPercentage from "./getLengthPerLetterPercentage";
import getLongestAndShortesSongPerLetter from "./getLongestAndShortesSongPerLetter";
import getMaxArtistPerPerson from "./getMaxArtistPerPerson";
import getPercentagePerLetter from "./getPercentagePerLetter";
import getSongAmountPerArtist from "./getSongAmountPerArtist";
import getSongsPerPerson from "./getSongsPerPerson";
import getTotalPlaylistLengthPerPerson from "./getTotalPlaylistLengthPerPerson";

const chartNameDataMap = {
  numberPerArtist: getSongAmountPerArtist,
  percentagePerLetter: getPercentagePerLetter,
  songsPerPerson: getSongsPerPerson,
  playlistLengthPerPerson: getTotalPlaylistLengthPerPerson,
  playlistLengthPerPersonPercent: getTotalPlaylistLengthPerPerson,
  lengthPerLetter: getLengthPerLetterPercentage,
  avgLengthPerLetter: getAverageLengthPerLetter,
  avgPopularityPerPerson: getAveragePopularityPerPerson,
  maxOfArtistPerPerson: getMaxArtistPerPerson,
  longestShortestSongPerLetter: getLongestAndShortesSongPerLetter,
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
  maxOfArtistPerPerson: BarOptions,
  longestShortestSongPerLetter: TableOptions,
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
      return averageLengthPerLetterOptions(options, data);
    case "avgPopularityPerPerson":
      return averagePopularityPerPersonOptions(options, data);
    case "maxOfArtistPerPerson":
      return maxOfArtistPerPersonOptions(options, data);
    case "longestShortestSongPerLetter":
      return longestShortestSongPerLetterOptions(options, data);
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
