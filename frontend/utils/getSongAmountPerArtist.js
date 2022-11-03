export default function getSongAmountPerArtist(data) {
  const artistSongObject = {};

  // Go through every song in the playlist
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    // A song can have multiple artists, so we have to check each.
    const songArtist = item?.track?.artists;
    for (let j = 0; j < songArtist.length; j++) {
      const currentArtist = songArtist[j];
      const currentArtistName = currentArtist?.name;

      // For every artist of a song, we check to see if they already have a song
      // in the playlist up untill this point. If they do, we increment the
      // number. Otherwise we add it to the artistSongObject and start the count
      // at 1
      if (artistSongObject[currentArtistName]) {
        const currentCount =
          artistSongObject[currentArtistName]?.amountSongs || 0;
        artistSongObject[currentArtistName].amountSongs = currentCount + 1;
      } else {
        artistSongObject[currentArtistName] = currentArtist;
        artistSongObject[currentArtistName].amountSongs = 1;
      }
    }
  }

  const artistSongObjectAsArray = Object.values(artistSongObject);
  artistSongObjectAsArray.sort((a, b) => {
    if (a.amountSongs < b.amountSongs) return 1;
    if (a.amountSongs === b.amountSongs) return 0;
    return -1;
  });

  return artistSongObjectAsArray;
}
