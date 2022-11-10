export default {
  dataLabels: {
    enabled: true,
  },
  legend: {
    fontFamily: "barlow-regular, Helvetica, Arial",
    fontSize: "14px",
    labels: {
      colors: ["fff8e1"],
    },
  },
  xaxis: {
    labels: {
      show: true,
      style: {
        cssClass: 'apexcharts-xaxis-label'
      }
    }
  },
  yaxis: {
    labels: {
      show: true,
      style: {
        cssClass: 'apexcharts-yaxis-label'
      }
    }
  },
  tooltip: {
    fontFamily: "barlow-regular, Helvetica, Arial",
    fontSize: '14px',
    theme: false,
    x: {
      show: true
    },
    y: {
      show: true,
    }
  }
}