export default function averagePopularityPerPerson(options, data){
  const seriesDataToUse = data.map((d) => {
    return {
      x: d?.name,
      y: d?.avgPopularity
    }
  })
  options.series = [{data: seriesDataToUse}];

  options.dataLabels.formatter = function(val) {
    return val
  }

  options.tooltip.enabled = false
  return;
}