export default function percentagePerLetterOptions(options, data){
  // !!!! THIS HAS NOT BEEN UPDATED FOR APEXCHARTS 
  options.series = data.map((d) => d?.amountSongs);
  options.labels = data.map((d) => d?.character);
  return;
}