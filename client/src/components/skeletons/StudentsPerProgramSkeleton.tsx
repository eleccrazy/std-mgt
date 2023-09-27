import { Skeleton, Typography, Stack, Box } from '@mui/material';
import React from 'react';

const StudentsPerProgramSkeleton = () => {
  return (
    <Box
      p={4}
      bgcolor={'#fcfcfc'}
      id='chart'
      minWidth={490}
      display='flex'
      flexGrow={1}
      flexDirection='column'
      borderRadius='15px'
    >
      <Typography fontSize={18} fontWeight={600} color='#11142d'>
        <Skeleton width={370} />
      </Typography>
      <Stack my='20px' direction='column' gap={4}>
        {[1, 2, 3, 4, 5].map((index) => (
          <Stack
            key={index}
            direction='row'
            justifyContent='space-between'
            alignItems='center'
          >
            <Typography fontSize={14} fontWeight={600} color='#11142d'>
              <Skeleton width={(50 * 5) / index} />
            </Typography>
            <Typography fontSize={14} fontWeight={600} color='#11142d'>
              <Skeleton width={40} />
            </Typography>
            <Typography fontSize={14} fontWeight={600} color='#174281'>
              <Skeleton width={40} />
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};

export default StudentsPerProgramSkeleton;
