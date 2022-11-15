export default function numberPerArtist(options, data){
  const test = data.slice(0, 100)
  const dataToReturn = test.map((d) => {
    return {
      x: d?.name,
      y: d?.amountSongs,
    };
  });
  options.series = [
    {
      data: dataToReturn,
    },
  ];

  options.dataLabels.enabled = false;
  return;
}