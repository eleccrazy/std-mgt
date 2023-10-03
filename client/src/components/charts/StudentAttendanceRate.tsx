import ReactApexChart from 'react-apexcharts';
import { Typography, Stack, Box } from '@mui/material';
import {
  ArrowCircleUpRounded,
  ArrowCircleDownRounded,
} from '@mui/icons-material';
import { TotalRevenueOptions } from './chart.config';
import { AttendanceStatsData } from 'interfaces/student';

const StudentAttendanceRate = ({ stats }: { stats: AttendanceStatsData }) => {
  // Extract data to represent it on the graph.
  const lastWeek = Object.values(stats.lastWeek) as number[];
  const currentWeek = Object.values(stats.currentWeek) as number[];

  const attendanceDataSeries = [
    {
      name: 'Last Weak',
      data: lastWeek,
    },
    {
      name: 'Running Weak',
      data: currentWeek,
    },
  ];
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
      <Typography fontSize={18} fontWeight={600} color='#11142d'>
        Student Attendance Rate
      </Typography>
      <Stack direction='row' gap={4} flexWrap={'wrap'} my='20px'>
        <Typography fontSize={28} fontWeight={700} color='#174281'>
          {stats.totalDiff}
        </Typography>
        <Stack>
          {stats.totalDiff < 0 ? (
            <ArrowCircleDownRounded sx={{ color: '#2B6EB2', fontSize: 25 }} />
          ) : (
            <ArrowCircleUpRounded sx={{ color: '#2B6EB2', fontSize: 25 }} />
          )}
          <Stack>
            <Typography fontSize={14} fontWeight={600} color='#2B6EB2'>
              {Math.abs(stats.percentageRate)}%
            </Typography>
            <Typography fontSize={14} fontWeight={600} color='#2B6EB2'>
              Since last weak
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <ReactApexChart
        series={attendanceDataSeries}
        type='bar'
        height={210}
        width='90%'
        options={TotalRevenueOptions}
      ></ReactApexChart>
    </Box>
  );
};

export default StudentAttendanceRate;
