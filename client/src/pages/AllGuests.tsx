import { Box, Typography, Stack } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useNavigation } from '@refinedev/core';
import { CustomButton } from 'components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CustomDataTable from 'components/tables/CustomDataTable';
import StudentData from 'interfaces/student';
import { useNotification } from '@refinedev/core';

export const AllGuests = () => {
  const navigation = useNavigation();

  // Create the base axios api endpoint for fetching our data
  const api = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
  });

  const [filteredData, setFilteredData] = useState<StudentData[]>([]);
  const { open } = useNotification();

  async function getGuests() {
    try {
      const response = await api.get('/students/guests');
      const studentData = response?.data;
      setFilteredData(studentData);
    } catch (error: any) {
      open?.({
        type: 'error',
        message: 'Error',
        description: error.response.data.error,
      });
    }
  }
  useEffect(() => {
    getGuests();
  }, []);
  return (
    <Box>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Typography fontSize={25} fontWeight={700} color='#11142d'>
          All Registered Guests
        </Typography>
        <CustomButton
          title='Register Guests'
          handleClick={() => {
            navigation.push('/guests/create');
          }}
          backgroundColor='#174281'
          color='#fcfcfc'
          icon={<Add />}
        ></CustomButton>
      </Stack>
      <CustomDataTable rows={filteredData} />
    </Box>
  );
};

export default AllGuests;
