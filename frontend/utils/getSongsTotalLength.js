export default function getSongsTotalLength(data) {
  if (!data || !Array.isArray(data)) return null;
  const totalDuration = data.reduce((previousvalue, currentTrack) => {
    const currentSongDuration = currentTrack?.track?.duration_ms || 0;

    return previousvalue + currentSongDuration;
  }, 0);

  return totalDuration;
}
