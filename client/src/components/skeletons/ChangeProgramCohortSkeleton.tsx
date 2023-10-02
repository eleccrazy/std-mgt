import {
  Box,
  CardContent,
  CardHeader,
  Stack,
  FormControl,
  FormHelperText,
  Skeleton,
} from '@mui/material';

const ChangeProgramCohortSkeleton = () => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <CardHeader
        title={
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Skeleton variant='text' width={500} height={34} />
          </div>
        }
        sx={{ textAlign: 'center' }}
      />
      <CardContent>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Skeleton style={{ width: 320 }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Skeleton style={{ width: 150 }} />
        </div>
      </CardContent>
      <CardContent sx={{ textAlign: 'right' }}>
        <div style={{ display: 'flex', justifyContent: 'right' }}>
          <Skeleton width={200} height={80} />
        </div>
      </CardContent>
      <Stack direction='row' gap={2} margin={2} px={8}>
        <FormControl fullWidth>
          <FormHelperText>
            <Skeleton width={100} />
          </FormHelperText>
          <Skeleton height={80} />
        </FormControl>
        <FormControl fullWidth>
          <FormHelperText>
            <Skeleton width={100} />
          </FormHelperText>
          <Skeleton height={80} />
        </FormControl>
      </Stack>
      <Box
        style={{ textAlign: 'center' }}
        marginTop={6}
        display='flex'
        justifyContent='center'
      >
        <Skeleton variant='rectangular' width={140} height={40} />
      </Box>
    </Box>
  );
};

export default ChangeProgramCohortSkeleton;
