import { useState, useRef, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { PieChartProps } from 'interfaces/home';
import { Typography, Stack, Box } from '@mui/material';
import './Chart.css';
import CurrentAttendeesInfoDialog from 'components/home/CurrentAttendeesInfoDialog';

const PieChart = ({ title, value, series, colors, type }: PieChartProps) => {
  return (
    <Box
      id='chart'
      flex={1}
      display='flex'
      flexDirection='row'
      bgcolor='#fcfcfc'
      justifyContent='space-between'
      alignItems='center'
      pl={3.5}
      py={2}
      gap={2}
      borderRadius='15px'
      minHeight='110px'
      width='fit-content'
      position='relative' // Added position relative to the Box component
    >
      <Stack direction='column'>
        <Typography fontSize={14} color='#808191'>
          {title}
        </Typography>
        <Typography fontSize={24} color='#174281' fontWeight={700} mt={1}>
          {value}
        </Typography>
      </Stack>
      <div className='chart-container'>
        <ReactApexChart
          options={{
            colors: colors,
            chart: { type: 'donut' },
            legend: { show: false },
            dataLabels: { enabled: false },
            responsive: [
              { options: { events: { dataPointSelection: false } } },
            ],
          }}
          series={series}
          type='donut'
          width='120px'
        ></ReactApexChart>
      </div>
    </Box>
  );
};

export default PieChart;
