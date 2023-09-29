import React from 'react';
import { Skeleton, Card, CardContent, Typography } from '@mui/material';

const ProgramCardSkeleton = () => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        background: '#2B6EB2',
        height: 100,
      }}
    >
      <CardContent>
        <Typography gutterBottom component='div' sx={{ color: '#ecebf0' }}>
          <Skeleton
            variant='text'
            width={200}
            height={24}
            style={{
              marginRight: 'auto',
              backgroundColor: '#b5b1a7',
            }}
          />
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          <Skeleton
            variant='text'
            width={150}
            height={16}
            style={{
              marginRight: 'auto',
              backgroundColor: '#a3a098',
            }}
          />
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProgramCardSkeleton;
