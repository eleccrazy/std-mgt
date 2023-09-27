import { Skeleton, Typography, Stack, Box } from '@mui/material';
import React from 'react';

const PieChartSkeleton = ({ width }: { width: number }) => {
  return (
    <Box
      id='chart'
      flex={1}
      display='flex'
      flexDirection='row'
      bgcolor='#fcfcfc'
      justifyContent='space-between'
      alignItems='center'
      px={3.5}
      py={2}
      gap={2}
      borderRadius='15px'
      minHeight='110px'
      width='fit-content'
      position='relative'
    >
      <Stack direction='column'>
        <Typography fontSize={14} color='#808191'>
          <Skeleton width={width} />
        </Typography>
        <Typography fontSize={24} color='#174281' fontWeight={700} mt={1}>
          <Skeleton width={80} />
        </Typography>
      </Stack>
      <div className='chart-container'>
        <Skeleton animation='wave' variant='circular' width={80} height={80} />
      </div>
    </Box>
  );
};

export default PieChartSkeleton;
