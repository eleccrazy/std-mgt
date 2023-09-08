import { useState, useRef, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { PieChartProps } from 'interfaces/home';
import { Typography, Stack, Box, Card, CardContent } from '@mui/material';
import './Chart.css';

const PieChart = ({ title, value, series, colors, type }: PieChartProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
      {isHovered && type === 'current' && (
        <Card
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            transform: `translateY(-50%)`,
            zIndex: 1,
          }}
        >
          <CardContent>Attendees Statistics</CardContent>
        </Card>
      )}
    </Box>
  );
};

export default PieChart;
