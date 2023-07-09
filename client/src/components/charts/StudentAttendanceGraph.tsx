import ReactApexChart from 'react-apexcharts';
import { Box } from '@mui/material';
import { ApexOptions } from 'apexcharts';

const series = [
  {
    name: 'Current Week',
    data: [4, 3, 6, 0, 0, 5, 0],
  },
  {
    name: 'Last Week',
    data: [2, 8, 5, 4, 5, 6, 6],
  },
  {
    name: 'Two Weeks Ago',
    data: [7, 7, 1, 4.3, 8, 3, 5],
  },
];

const options: ApexOptions = {
  chart: {
    height: 400,
    type: 'line',
    zoom: {
      enabled: false,
    },
  },
  colors: ['#65eb4d', '#4263f5', '#f283c8'],
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
  stroke: {
    width: [5, 7, 5],
    curve: 'straight',
    dashArray: [0, 8, 5],
  },
  title: {
    text: 'Attendance Rate Week from Week',
    align: 'left',
  },

  grid: {
    borderColor: '#f1f1f1',
  },
  markers: {
    size: 0,
    hover: {
      sizeOffset: 6,
    },
  },
  xaxis: {
    categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  },
  yaxis: {
    title: {
      text: 'Total hours spent',
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
        return val > 1 ? `${val} hours` : `${val} hour`;
      },
    },
  },
};

const StudentAttendanceGraph = () => {
  return (
    <Box
      p={4}
      flex={4}
      bgcolor={'#fcfcfc'}
      id='chart'
      display='flex'
      flexDirection='column'
      borderRadius='15px'
    >
      <ReactApexChart
        series={series}
        type='line'
        height={400}
        width='100%'
        options={options}
      ></ReactApexChart>
    </Box>
  );
};

export default StudentAttendanceGraph;
