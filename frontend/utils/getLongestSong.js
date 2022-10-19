export default function getLongestSong(data) {
  if (!Array.isArray(data) || data.length < 1) return null;
  let longestSong = null;

  for (let i = 0; i < data.length - 1; i++) {
    const item = data[i];
    const itemLength = item?.track?.duration_ms || 0;

    // For whatever reason it's possible to have a bug in a spotify playlist
    // where there is/are tracks without data, so we have to keep that in mind.
    if (!item?.track) continue;

    if (!longestSong) {
      longestSong = item;
      continue;
    }

    if (itemLength > longestSong?.track?.duration_ms) {
      longestSong = item;
    }
  }

  return longestSong;
}
