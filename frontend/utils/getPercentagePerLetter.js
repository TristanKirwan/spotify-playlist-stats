export default function getPercentagePerLetter(data) {
  const characterSongObject = {};
  const replaceAbleString = "the";

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const originalTrackName = item?.track?.name;

    // We have to check if the first word in the title of the song is the, so we
    // split on spaces
    const checkableTrackName = originalTrackName.toLowerCase().split(" ");

    const shouldReplaceStart =
      checkableTrackName[0].toLowerCase() === replaceAbleString;

    let nameToUseForObject = originalTrackName;
    // If song starts with "the", remove it from the original array.
    if (shouldReplaceStart) {
      checkableTrackName.shift();
      nameToUseForObject = checkableTrackName.join(" ");
    }

    const firstCharacterOfTrack = nameToUseForObject[0].toUpperCase();
    // If the first character of the song (number letter etc) is already
    // accounted for, we add 1 to its count and add the song in the songs array.
    // Otherwise we create an initial object for the current character
    if (characterSongObject[firstCharacterOfTrack]) {
      const originalAmount =
        characterSongObject[firstCharacterOfTrack].amountSongs;
      characterSongObject[firstCharacterOfTrack].amountSongs =
        originalAmount + 1;
      characterSongObject[firstCharacterOfTrack].songs.push(item?.track);
    } else {
      characterSongObject[firstCharacterOfTrack] = {
        character: firstCharacterOfTrack,
        amountSongs: 1,
        songs: [item?.track],
      };
    }
  }

  const characterSongAsArray = Object.values(characterSongObject);
  characterSongAsArray.sort((a, b) => {
    if (a.amountSongs < b.amountSongs) return 1;
    if (a.amountSongs === b.amountSongs) return 0;
    return -1;
  });

  return characterSongAsArray;
}
