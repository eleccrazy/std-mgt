import ReactApexChart from 'react-apexcharts';
import { Typography, Stack, Box } from '@mui/material';
import { ArrowCircleUpRounded } from '@mui/icons-material';
import { TotalRevenueOptions, TotalRevenueSeries } from './chart.config';

const StudentAttendanceRate = () => {
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
        Stuent Attendance Rate
      </Typography>
      <Stack direction='row' gap={4} flexWrap={'wrap'} my='20px'>
        <Typography fontSize={28} fontWeight={700} color='#11142d'>
          470
        </Typography>
        <Stack>
          <ArrowCircleUpRounded sx={{ color: '#475be8', fontSize: 25 }} />
          <Stack>
            <Typography fontSize={14} fontWeight={600} color='#475be8'>
              7%
            </Typography>
            <Typography fontSize={14} fontWeight={600} color='#475be8'>
              Since last weak
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <ReactApexChart
        series={TotalRevenueSeries}
        type='bar'
        height={210}
        width='90%'
        options={TotalRevenueOptions}
      ></ReactApexChart>
    </Box>
  );
};

export default StudentAttendanceRate;
