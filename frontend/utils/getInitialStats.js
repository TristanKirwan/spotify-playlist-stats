import getDurationFromMs from "./getDurationFromMs";
import getLongestSong from "./getLongestSong";
import getShortestSong from "./getShortestSong";
import getSongsAverageLength from "./getSongsAverageLength";
import getSongsTotalLength from "./getSongsTotalLength";

export default function getInitialStats(data) {
  if (!data || !data?.length) return null;

  const initialStats = [];

  const amountSongs = data.length;
  const duration = getSongsTotalLength(data);
  if (!duration) return null;

  const humanReadableduration = getDurationFromMs(duration);
  if (humanReadableduration) {
    initialStats.push({
      label: "Total playlist duration",
      value: humanReadableduration,
    });
  }

  if (amountSongs) {
    initialStats.push({
      label: "Total amount of tracks",
      value: amountSongs,
    });
  }

  const avgSongLength = getSongsAverageLength(amountSongs, duration);
  if (avgSongLength) {
    initialStats.push({
      label: "Average song length",
      value: avgSongLength,
    });
  }

  const shortestSong = getShortestSong(data);
  if (shortestSong?.track?.duration_ms) {
    const shortestReadableDuration = getDurationFromMs(
      shortestSong?.track?.duration_ms
    );
    initialStats.push({
      label: "Shortest song",
      value: shortestReadableDuration,
    });
  }

  const longestSong = getLongestSong(data);
  if (longestSong?.track?.duration_ms) {
    const longestSongduration = getDurationFromMs(
      longestSong?.track?.duration_ms
    );
    initialStats.push({
      label: "Longest song",
      value: longestSongduration,
    });
  }

  return initialStats;
}
