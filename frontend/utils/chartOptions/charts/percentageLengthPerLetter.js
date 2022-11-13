import getDurationFromms from "../../getDurationFromMs";

export default function percentageLengthPerLetter(options, data) {
  options.series = data.map((d) => d?.totalDuration);
  options.labels = data.map((d) => d?.character);

  options.tooltip.y.formatter = function(val){ 
    return `${getDurationFromms(val)} - (${val}ms)`
  }
  return;
}