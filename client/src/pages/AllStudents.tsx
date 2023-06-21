import { Box, Typography, Stack } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useNavigation } from '@refinedev/core';
import { CustomButton } from 'components';

const AllStudents = () => {
  const navigation = useNavigation();
  return (
    <Box>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Typography fontSize={25} fontWeight={700} color='#11142d'>
          All Registered Students
        </Typography>
        <CustomButton
          title='Register Students'
          handleClick={() => {
            navigation.push('/students/create');
          }}
          backgroundColor='#475be8'
          color='#fcfcfc'
          icon={<Add />}
        ></CustomButton>
      </Stack>
    </Box>
  );
};

export default AllStudents;
