export default function getSongsPerPerson(data) {
  const personSongObject = {};

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const addedByData = item?.added_by;

    const userId = addedByData?.id;
    const userUri = addedByData?.uri;

    if (!userId) continue;

    if (!personSongObject[userId]) {
      personSongObject[userId] = {
        name: userId,
        url: userUri,
        amountSongs: 1,
        songs: [item]
      };
    } else {
      const newAmountSongs = personSongObject[userId].amountSongs + 1;
      personSongObject[userId].amountSongs = newAmountSongs;
      personSongObject[userId].songs.push(item);
    }
  }

  const personSongObjectAsArray = Object.values(personSongObject);
  personSongObjectAsArray.sort((a, b) => {
    if (a.amountSongs < b.amountSongs) return 1;
    if (a.amountSongs === b.amountSongs) return 0;
    return -1;
  });

  const filteredArray = personSongObjectAsArray.filter((item) => item.amountSongs > 1)

  return filteredArray;
}
