import { Box, Typography, Stack, Table } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useNavigation } from '@refinedev/core';
import { CustomButton } from 'components';
import { useTable } from '@refinedev/core';
import StudentData from 'interfaces/student';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CustomDataTable from 'components/tables/CustomDataTable';

const AllStudents = () => {
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
    ? studentData.filter((item) => item.isAlumni === false)
    : []; */
  async function getStudents() {
    try {
      const response = await api.get('/students');
      const studentData = response.data;
      // Filter out only students with isAlumni === false
      const filtered = Array.isArray(studentData)
        ? studentData.filter((item) => item.isAlumni === false)
        : [];
      setFilteredData(filtered);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getStudents();
  }, []);
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
      <CustomDataTable rows={filteredData} />
    </Box>
  );
};

export default AllStudents;
