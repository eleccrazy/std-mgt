import React from 'react';
import { Skeleton } from '@mui/material';
import {
  Grid,
  Box,
  Stack,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from '@mui/material';

const CustomAttendanceInfoSkeleton = ({}) => {
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      xl={3}
      display='flex'
      flexWrap='wrap'
    >
      <InfoCardSkeleton />
    </Grid>
  );
};

const InfoCardSkeleton = () => {
  return (
    <Box
      id='chart'
      flex={1}
      display='flex'
      bgcolor='#E3F0F9'
      flexDirection='row'
      justifyContent='space-between'
      alignItems='center'
      pl={3.5}
      py={2}
      gap={2}
      borderRadius='15px'
      minHeight='110px'
      width='fit-content'
    >
      <Stack direction='column'>
        <Skeleton variant='text' width={200} />
        <Skeleton variant='text' width={100} />
      </Stack>
    </Box>
  );
};

const AttendanceSectionSkeleton = () => {
  return (
    <Card sx={{ minWidth: 275, boxShadow: 'none' }}>
      <CardHeader
        title={<Skeleton variant='text' />}
        sx={{ display: 'flex', justifyContent: 'space-between' }}
        action={<Skeleton variant='text' />}
      />
      <CardContent>
        <Box mt='20px'>
          <Grid container spacing={4}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <CustomAttendanceInfoSkeleton key={item} />
            ))}
          </Grid>
        </Box>
        <Box mt='20px'>
          <Skeleton variant='rectangular' height={300} />
        </Box>
      </CardContent>
      <CardActions>
        <Skeleton variant='rectangular' width={200} height={40} />
      </CardActions>
    </Card>
  );
};

export default AttendanceSectionSkeleton;
