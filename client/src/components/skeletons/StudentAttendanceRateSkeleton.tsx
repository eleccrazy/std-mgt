import { Skeleton, Typography, Stack, Box } from '@mui/material';
import React from 'react';

const StudentAttendanceRateSkeleton = () => {
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
        <Skeleton width={200} />
      </Typography>
      <Stack direction='row' gap={4} flexWrap={'wrap'} my='20px'>
        <Typography fontSize={28} fontWeight={700} color='#174281'>
          <Skeleton width={100} />
        </Typography>
        <Stack direction='column'>
          <Skeleton variant='circular' width={40} height={40} />
          <Stack>
            <Typography fontSize={14} fontWeight={600} color='#2B6EB2'>
              <Skeleton width={40} />
            </Typography>
            <Typography fontSize={14} fontWeight={600} color='#2B6EB2'>
              <Skeleton width={80} />
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Skeleton
        animation='wave'
        variant='rectangular'
        width='90%'
        height={210}
      />
    </Box>
  );
};

export default StudentAttendanceRateSkeleton;
