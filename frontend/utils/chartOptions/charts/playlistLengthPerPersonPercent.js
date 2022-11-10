export default function playlistLengthPerPersonPercent(options, data){
  options.series = data.map((d) => d?.totalLength)
  options.labels = data.map((d) => d?.name)
  return;
}