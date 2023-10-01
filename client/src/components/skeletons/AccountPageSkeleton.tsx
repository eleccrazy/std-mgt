import {
  Skeleton,
  Typography,
  Box,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';

const AccountListSkeleton = () => {
  return (
    <Card
      sx={{
        marginBottom: '8px',
        width: '100%',
        backgroundColor: '#6b9fc7',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 3,
        marginTop: 3,
      }}
    >
      <CardContent>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            color: 'white',
          }}
        >
          <Skeleton variant='text' width={100} />
          <Skeleton variant='text' width={100} />
          <Skeleton variant='text' width={100} />
        </div>
      </CardContent>
      <IconButton>
        <Skeleton variant='circular' width={40} height={40} />
      </IconButton>
    </Card>
  );
};

const AccountPageSkeleton = () => {
  return (
    <Box mb={5} display='flex' flexDirection='column' bgcolor='#ffffff' p={3}>
      <Box boxShadow={2} p={2} sx={{ background: '#7cabcf' }} borderRadius={2}>
        <Typography
          variant='h5'
          p={2}
          gutterBottom
          component='div'
          sx={{ color: '#ecebf0', display: 'flex', alignItems: 'center' }}
        >
          <Skeleton width={200} />
          <div style={{ marginLeft: 'auto' }}>
            <IconButton>
              <Skeleton variant='circular' width={40} height={40} />
            </IconButton>
          </div>
        </Typography>
        <Box mt={3}>
          <AccountListSkeleton />
          <AccountListSkeleton />
        </Box>
      </Box>
    </Box>
  );
};

export default AccountPageSkeleton;
