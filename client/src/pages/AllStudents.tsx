import { Box, Typography, Stack, Table } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useNavigation } from '@refinedev/core';
import { CustomButton } from 'components';
import StudentData from 'interfaces/student';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CustomDataTable from 'components/tables/CustomDataTable';
import { useNotification } from '@refinedev/core';
import BASE_API_URL from 'config';

const AllStudents = () => {
  const navigation = useNavigation();
  // Create the base axios api endpoint for fetching our data
  const api = axios.create({
    baseURL: BASE_API_URL,
  });
  const [filteredData, setFilteredData] = useState<StudentData[]>([]);
  const { open } = useNotification();
  async function getStudents() {
    try {
      const response = await api.get('/students/learners');
      const studentData = response.data;
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
    getStudents();
  }, []);
  return (
    <Box>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Typography fontSize={25} fontWeight={700} color='#11142d'>
          All Registered Learners
        </Typography>
        <CustomButton
          title='Register Learners'
          handleClick={() => {
            navigation.push('/learners/create');
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

export default AllStudents;
