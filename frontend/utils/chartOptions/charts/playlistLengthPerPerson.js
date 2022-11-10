import getDurationFromms from "../../getDurationFromMs";


export default function playlistLengthPerPerson(options, data) {
  options.series = [{data: null}];
  options.dataLabels.formatter = function(val){ 
    return `${getDurationFromms(val)}`
  }
  options.tooltip.x.show = false;
  options.tooltip.y.formatter = function(val){ 
    return `${getDurationFromms(val)} - (${val}ms)`
  }
  options.tooltip.y.title = {
    formatter: () => ''
  }
  options.series[0].data = data.map((d) => {
    return {
      x: d?.name,
      y: d?.totalLength
  }})
  options.yaxis.labels.formatter = function (val){
    return getDurationFromms(val)
  }
  return;
}