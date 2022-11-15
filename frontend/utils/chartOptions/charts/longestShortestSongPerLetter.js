import getDurationFromms from "frontend/utils/getDurationFromMs";

export default function longestShortestSongPerLetter(options, data){
  const headerRow = ['Character', 'Shortest song', 'Longest song']
  const dataRows = data.map((d) => {
    const currentCharacter = d?.character;

    const shortestSongReadableDuration = getDurationFromms(d?.shortestSong?.duration || 0);
    const shortestSongString = `${d?.shortestSong?.name} - ${shortestSongReadableDuration}`;

    const longestSongReadableDuration = getDurationFromms(d?.longestSong?.duration || 0);
    const longestSongString = `${d?.longestSong?.name} - ${longestSongReadableDuration}`;

    return [
      currentCharacter,
      shortestSongString,
      longestSongString
    ]
  })

  options.data = {
    headerRow: headerRow,
    bodyRows: dataRows
  }

  return;
}