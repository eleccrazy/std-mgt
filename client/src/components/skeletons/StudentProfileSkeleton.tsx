import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Box,
  Grid,
  Typography,
} from '@mui/material';
import { Skeleton } from '@mui/material';

const StudentInfoDisplaySkeleton = () => {
  return (
    <Grid item xs={8}>
      <Typography fontSize={16}>
        <span
          style={{
            fontWeight: '700',

            display: 'inline-block',
            width: '250px',
            color: '#331e4a',
          }}
        >
          <Skeleton variant='text' />
        </span>
        <span
          style={{
            fontWeight: '700',

            display: 'inline-block',
            width: '250px',
            color: '#331e4a',
            marginLeft: '40px',
          }}
        >
          <Skeleton variant='text' />
        </span>
      </Typography>
    </Grid>
  );
};

const StudentProfileSkeleton = () => {
  return (
    <Card sx={{ minWidth: 275, boxShadow: 'none' }}>
      <CardHeader
        title={<Skeleton variant='text' width={250} />}
        sx={{ display: 'flex', justifyContent: 'space-between' }}
        action={
          <Box width={120}>
            <Skeleton variant='rectangular' width={120} height={40} />
          </Box>
        }
      />
      <CardContent>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={2}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <StudentInfoDisplaySkeleton />
            <StudentInfoDisplaySkeleton />
            <StudentInfoDisplaySkeleton />
            <StudentInfoDisplaySkeleton />
            <StudentInfoDisplaySkeleton />
            <StudentInfoDisplaySkeleton />
            <StudentInfoDisplaySkeleton />
            <StudentInfoDisplaySkeleton />
            <StudentInfoDisplaySkeleton />
            <StudentInfoDisplaySkeleton />
          </Grid>
        </Box>
      </CardContent>
      <CardActions>
        <Skeleton variant='rectangular' width={200} height={40} />
      </CardActions>
    </Card>
  );
};

export default StudentProfileSkeleton;
