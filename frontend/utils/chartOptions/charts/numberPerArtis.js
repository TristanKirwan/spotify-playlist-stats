export default function numberPerArtist(options, data){
  const dataToReturn = data.map((dataPoint) => {
    return {
      x: dataPoint?.name,
      y: dataPoint?.amountSongs,
    };
  });
  options.series = [
    {
      data: dataToReturn,
    },
  ];
  return;
}