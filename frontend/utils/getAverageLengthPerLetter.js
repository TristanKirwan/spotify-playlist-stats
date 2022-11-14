import getLengthPerLetterPercentage from "./getLengthPerLetterPercentage";

export default function getAverageLengthPerLetter(data){

  // returns a sorted array with total length per letter.
  const totalLengthPerLetterArray = getLengthPerLetterPercentage(data); 

  const filteredLetterArray = totalLengthPerLetterArray.filter((item) => Array.isArray(item?.songs) && item?.songs.length > 1);
  
  for(let i = 0; i < filteredLetterArray.length; i++) {
    const item = filteredLetterArray[i];
    if(!Array.isArray(item?.songs)) {
      item.averageLength = 0;
      continue;
    }
    item.averageLength = Math.round(item.totalDuration / item.songs.length);
  }

  filteredLetterArray.sort((a, b) => {
    if (a.averageLength < b.averageLength) return 1;
    if (a.averageLength === b.averageLength) return 0;
    return -1;
  });

  return filteredLetterArray
}