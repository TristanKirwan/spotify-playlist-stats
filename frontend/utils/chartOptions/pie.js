import defaultOptions from "./default";

export default {
  ...defaultOptions,
  type: "pie",
  series: [
    {
      name: "%",
    },
  ],
  dataLabels: {
    enabled: true,
    formatter: function (val, opts) {
      return `${opts?.w?.config?.labels[opts?.seriesIndex]} - ${Math.round(
        val
      )}%`;
    },
  },
  legend: {
    fontFamily: "barlow-regular, Helvetica, Arial",
    fontSize: "14px",
    labels: {
      colors: ["fff8e1"],
    },
  },
};
