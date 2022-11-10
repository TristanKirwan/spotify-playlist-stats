export default function getTotalPlaylistLengthPerPerson(data){
  const personLengthObject = {};

  for(let i = 0; i < data.length - 1; i++) {
    const item = data[i];
    const trackLength = item?.track?.duration_ms;
    const addedByData = item?.added_by;

    const userId = addedByData?.id;
    const userUri = addedByData?.uri;

    if(!userId || !trackLength) continue;
    if(!personLengthObject[userId]) {
      personLengthObject[userId] = {
        name: userId,
        url: userUri,
        totalLength: trackLength
      } 
    } else {
      const prevTotalLength = personLengthObject[userId].totalLength;
      personLengthObject[userId].totalLength = prevTotalLength + trackLength;
    }
  }

  const personLengthObjectAsArray = Object.values(personLengthObject);
  personLengthObjectAsArray.sort((a, b) => {
    if(a.totalLength < b.totalLength) return 1;
    if(a.totalLength === b.totalLength) return 0;
    return -1;
  })

  return personLengthObjectAsArray
}