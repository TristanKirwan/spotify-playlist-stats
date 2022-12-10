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
  numberPerArtist: JSON.parse(JSON.stringify(BarOptions)),
  songsPerPerson: JSON.parse(JSON.stringify(PieOptions)),
  percentagePerLetter: JSON.parse(JSON.stringify(PieOptions)),
  playlistLengthPerPerson: JSON.parse(JSON.stringify(BarOptions)),
  playlistLengthPerPersonPercent: JSON.parse(JSON.stringify(PieOptions)),
  lengthPerLetter: JSON.parse(JSON.stringify(PieOptions)),
  avgLengthPerLetter: JSON.parse(JSON.stringify(BarOptions)),
  avgPopularityPerPerson: JSON.parse(JSON.stringify(BarOptions)),
  maxOfArtistPerPerson: JSON.parse(JSON.stringify(BarOptions)),
  longestShortestSongPerLetter: JSON.parse(JSON.stringify(TableOptions)),
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
  const originOptions = chartOptionsMap[chartName];
  const options = JSON.parse(JSON.stringify(originOptions));
  chartSpecificSeriesMapping(chartName, options, data);

  options.chart = {
    ...options?.chart,
    id: chartName,
  };

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
