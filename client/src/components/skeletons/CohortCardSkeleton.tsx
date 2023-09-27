import { Card, CardContent, Typography, Skeleton } from '@mui/material';

const CohortCardSkeleton = () => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        background: '#2B6EB2',
        maxHeight: 100,
        height: 100,
      }}
    >
      <CardContent>
        <Typography
          gutterBottom
          component='div'
          sx={{ color: '#ecebf0', display: 'flex', alignItems: 'center' }}
        >
          <Skeleton
            variant='text'
            width={120}
            height={24}
            style={{
              marginRight: 'auto',
              backgroundColor: '#b5b1a7',
            }}
          />
          <div style={{ marginLeft: 'auto', display: 'flex' }}>
            <Skeleton
              variant='circular'
              width={24}
              height={24}
              style={{ backgroundColor: '#b5b1a7', marginRight: '14px' }}
            />
            <Skeleton
              variant='circular'
              width={24}
              height={24}
              style={{ backgroundColor: '#b5b1a7' }}
            />
          </div>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CohortCardSkeleton;
