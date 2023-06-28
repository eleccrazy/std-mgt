import { Box, Typography, Stack } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useNavigation } from '@refinedev/core';
import { CustomButton } from 'components';
import { useTable } from '@refinedev/core';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CustomDataTable from 'components/tables/CustomDataTable';
import StudentData from 'interfaces/student';

export const AllGuests = () => {
  const navigation = useNavigation();

  // Create the base axios api endpoint for fetching our data
  const api = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
  });

  const [filteredData, setFilteredData] = useState<StudentData[]>([]);

  /*// Use the useTable hook to fetch all students data from the backend
  const {
    tableQueryResult: { data, isLoading, isError },
  } = useTable<StudentData>();
  // Filter out only students
  const studentData = data?.data;
  const filteredData = Array.isArray(studentData)
    ? studentData.filter((item) => item.isAlumni === true)
    : []; */
  async function getGuests() {
    try {
      const response = await api.get('/students');
      const studentData = response?.data;
      // filter out only guests with isAlumni === true
      const filtered = Array.isArray(studentData)
        ? studentData.filter((item) => item.isAlumni === true)
        : [];
      setFilteredData(filtered);
    } catch (error) {
      console.log(error);
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
          backgroundColor='#475be8'
          color='#fcfcfc'
          icon={<Add />}
        ></CustomButton>
      </Stack>
      <CustomDataTable rows={filteredData} />
    </Box>
  );
};

export default AllGuests;
