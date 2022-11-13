import getPercentagePerLetter from "./getPercentagePerLetter";

export default function getLengthPerLetterPercentage(data){

  // Returns a sorted array per letter with all songs in the songs property.
  const letterArray = getPercentagePerLetter(data);
  for(let i = 0; i < letterArray.length; i++) {
    const item = letterArray[i];
    
    
    const songsOfItem = item?.songs;

    if(!Array.isArray(songsOfItem) || songsOfItem.length < 1) continue;
  
    const totalDuration = songsOfItem.reduce((prev, current) => prev + current?.duration_ms, 0);
    item.totalDuration = totalDuration;
  }

  letterArray.sort((a, b) => {
    if (a.totalDuration < b.totalDuration) return 1;
    if (a.totalDuration === b.totalDuration) return 0;
    return -1;
  });

  return letterArray
}