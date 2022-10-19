export default function getShortestSong(data) {
  if (!Array.isArray(data) || data.length < 1) return null;
  let shortestSong = null;

  for (let i = 0; i < data.length - 1; i++) {
    const item = data[i];
    const itemLength = item?.track?.duration_ms || 0;

    // For whatever reason it's possible to have a bug in a spotify playlist
    // where there is/are tracks without data, so we have to keep that in mind.
    if (!item?.track) continue;

    if (!shortestSong) {
      shortestSong = item;
      continue;
    }

    if (itemLength < shortestSong?.track?.duration_ms) {
      shortestSong = item;
    }
  }

  return shortestSong;
}
