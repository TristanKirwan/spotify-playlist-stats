import getPercentagePerLetter from "./getPercentagePerLetter";

export default function getLongestAndShortesSongPerLetter(data) {
  const songsPerLetter = getPercentagePerLetter(data);
  if(!Array.isArray(songsPerLetter) || songsPerLetter.length < 1) return [];

  for(let i = 0; i < songsPerLetter.length; i++) {
    const item = songsPerLetter[i];
    const songsOfLetter = item?.songs;

    // If a letter somehow has no songs
    if(!Array.isArray(songsOfLetter) || songsOfLetter.length < 1) {
      item.longestSong = {
        name: "Unknown",
        length: 0
      }
      item.shortestSong = {
        name: "Unknown",
        length: 0
      }
    }

    // Starting points of comparison
    const longestSongOfLetter = {
      name : "Unknown",
      duration: 0
    }

    // To comparte the shortest song, we have to set the initial duration to infinity
    const shortestSongOfLetter = {
      name: "Unknown",
      duration: Infinity
    }

    for(let j = 0; j < songsOfLetter.length; j++) {
      const currentSong = songsOfLetter[j];
      
      const currentDuration = currentSong?.duration_ms;
      const currentSongName = currentSong?.name;

      if(longestSongOfLetter.duration < currentDuration) {
        longestSongOfLetter.name = currentSongName;
        longestSongOfLetter.duration = currentDuration
      }
      if(shortestSongOfLetter.duration > currentDuration) {
        shortestSongOfLetter.name = currentSongName;
        shortestSongOfLetter.duration = currentDuration;
      }
    }

    item.longestSong = longestSongOfLetter
    item.shortestSong = shortestSongOfLetter
  }
  
  // Sort alphabetically
  songsPerLetter.sort((a,b) => a?.character > b?.character);

  return songsPerLetter
}