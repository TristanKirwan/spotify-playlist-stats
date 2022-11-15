import getSongsPerPerson from './getSongsPerPerson';

export default function getMaxArtistPerPerson(data){
  const songsPerPersonArray = getSongsPerPerson(data);
  const maxPersonArray = [];

  for(let i = 0; i < songsPerPersonArray.length; i++) {
    const item = songsPerPersonArray[i];
    const personSongs = item?.songs;
    // First we have to separate into artists
    const personArtistObject = {};

    // Fallback if somehow there is someone with 0 songs.
    if(!Array.isArray(personSongs) || personSongs.length < 1) {
      item.topArtist = {
        name: "",
        amountSongs: 0,
        songs: []
      }
    }

    // For every song, loop through all artists and add/modify the original personArtistObject
    for(let j = 0; j < personSongs.length; j++){
      const currentSong = personSongs[j];
      const currentArtists = currentSong?.track?.artists || [];

      for(let k = 0; k < currentArtists.length; k++) {
        const currentArtist = currentArtists[k]?.name;
        // First time encountering artist for current person
        if(!personArtistObject[currentArtist]) {
          personArtistObject[currentArtist] = {
            name: currentArtist,
            amountSongs: 1,
            songs: [currentSong]
          }
          continue;
        }
        const currentCount = personArtistObject[currentArtist].amountSongs;

        personArtistObject[currentArtist].amountSongs = currentCount + 1;
        personArtistObject[currentArtist].songs.push(currentSong);

      }
    }

    const personArtistArray = Array.from(Object.values(personArtistObject));
    const currentMax = {
      name: null,
      amount: 0,
      songs: []
    };

    // Get max artist of person and add it to array to return at the end.
    for(let l = 0; l < personArtistArray.length; l++) {
      const currentArtist = personArtistArray[l];
      const amountOfCurrentArtistSongs = currentArtist?.amountSongs || 0;
      const currentSongs = currentArtist?.songs || []
      if(amountOfCurrentArtistSongs > currentMax?.amount) {
        currentMax.name = currentArtist?.name,
        currentMax.amount = amountOfCurrentArtistSongs,
        currentMax.songs = currentSongs
      }
    }

    maxPersonArray.push({
      collaborator: item?.name,
      maxArtist: currentMax
    })
  }

  return maxPersonArray
}