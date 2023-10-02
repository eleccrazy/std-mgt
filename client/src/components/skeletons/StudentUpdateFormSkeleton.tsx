import React from 'react';
import {
  Skeleton,
  Box,
  Stack,
  FormControl,
  FormHelperText,
} from '@mui/material';

const StudentUpdateFormSkeleton = () => {
  return (
    <Box mt={5} borderRadius='25px' bgcolor='#fff' mx={6} px={2}>
      <Stack direction='row' gap={2} margin={1}>
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
      <Stack direction='row' gap={2} margin={2}>
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
      <Stack direction='row' gap={2} margin={2}>
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
      <Stack direction='row' gap={2} margin={2}>
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

export default StudentUpdateFormSkeleton;
