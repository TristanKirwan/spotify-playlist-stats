import getDurationFromms from '../../getDurationFromMs';

export default function averageLengthPerLetter(options, data){

  const seriesDataToUse = data.map((d) => {
    return {
      x: d?.character,
      y: d?.averageLength
    }
  });

  options.series = [{data: seriesDataToUse}];
  options.dataLabels.enabled = false;

  options.yaxis.labels.formatter = function (val){
    return getDurationFromms(val)
  }

  // Tooltip styling/options/readability 
  options.tooltip.y.formatter = function(val){ 
    return `${getDurationFromms(val)} - (${val}ms)`
  }
  // Hide series name in tooltip
  options.tooltip.y.title = {
    formatter: () => ''
  }
  options.tooltip.x.show = false;
  return;
}