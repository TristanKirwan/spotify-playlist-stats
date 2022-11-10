export default function songsPerPerson(options, data) {
  options.series = data.map((d) => d?.amountSongs);
  options.labels = data.map((d) => d?.name);
  return;
}