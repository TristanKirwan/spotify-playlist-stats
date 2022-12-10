export default function maxOfArtistPerPerson(options, data) {
  const seriesToUse = data.map((d) => {
    return {
      x: d?.collaborator,
      y: d?.maxArtist?.amount,
    };
  });

  options.series = [{ data: seriesToUse }];
  options.dataLabels.formatter = (val) => val;

  options.tooltip.x.show = false;
  // Hide series name in tooltip
  options.tooltip.y.title = {
    formatter: () => "",
  };
  options.tooltip.y.formatter = function (val, opts) {
    return `${
      data[opts?.dataPointIndex]?.maxArtist?.name || "Unknown artist"
    } - ${val}
    `;
  };
}
