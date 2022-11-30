import getSongsPerPerson from "./getSongsPerPerson";

export default function getAveragePopularityPerPerson(data) {
  const songsPerPersonArray = getSongsPerPerson(data);

  for (let i = 0; i < songsPerPersonArray.length; i++) {
    const personObject = songsPerPersonArray[i];
    const personSongs = personObject?.songs;
    const totalPopularity = personSongs.reduce((prev, song) => {
      const songPopularity = song?.track?.popularity || 0;
      return prev + songPopularity;
    }, 0);

    personObject.avgPopularity = Math.round(
      totalPopularity / personSongs.length
    );
  }

  songsPerPersonArray.sort((a, b) => {
    if (a.avgPopularity < b.avgPopularity) return 1;
    if (a.avgPopularity === b.avgPopularity) return 0;
    return -1;
  });

  return songsPerPersonArray;
}
