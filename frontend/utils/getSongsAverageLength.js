import getDurationFromMs from "./getDurationFromMs";

export default function getAverageSongLength(amountSongs, totalDuration) {
  if (isNaN(amountSongs) || isNaN(totalDuration)) return null;
  const durationPerSong = Math.round(totalDuration / amountSongs);

  const avgReadableDuration = getDurationFromMs(durationPerSong);
  return avgReadableDuration;
}
