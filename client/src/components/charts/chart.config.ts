import { ApexOptions } from 'apexcharts';

export const TotalRevenueSeries = [
  {
    name: 'Last Weak',
    data: [95, 84, 72, 44, 108, 108, 47],
  },
  {
    name: 'Running Weak',
    data: [183, 124, 115, 85, 143, 143, 96],
  },
];

export const TotalRevenueOptions: ApexOptions = {
  chart: {
    type: 'bar',
    toolbar: {
      show: false,
    },
  },
  colors: ['#92C4E7', '#2B6EB2'],
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: false,
      columnWidth: '55%',
    },
  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    show: false,
  },
  stroke: {
    colors: ['transparent'],
    width: 4,
  },
  xaxis: {
    categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  },
  yaxis: {
    title: {
      text: 'students',
    },
  },
  fill: {
    opacity: 1,
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
  },
  tooltip: {
    y: {
      formatter(val: number) {
        return `${val} Students`;
      },
    },
  },
};
