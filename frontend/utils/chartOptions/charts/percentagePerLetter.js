export default function percentagePerLetterOptions(options, data) {
  options.series = data.map((d) => d?.amountSongs);
  options.labels = data.map((d) => d?.character);
  return;
}
