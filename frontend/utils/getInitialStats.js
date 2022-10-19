import getDurationFromMs from "./getDurationFromMs";
import getSongsAverageLength from "./getSongsAverageLength";
import getSongsTotalLength from "./getSongsTotalLength";

export default function getInitialStats(data) {
  if (!data || !data?.length) return null;

  const amountSongs = data.length;
  const duration = getSongsTotalLength(data);
  const humanReadableduration = getDurationFromMs(duration);

  if (!duration) return null;
  const avgSongLength = getSongsAverageLength(amountSongs, duration);

  return [
    {
      label: "⏳Total playlist duration",
      value: humanReadableduration,
    },
    {
      label: "🔢Total amount of tracks",
      value: amountSongs,
    },

    {
      label: "🕐Average song length",
      value: avgSongLength,
    },
  ];
}
