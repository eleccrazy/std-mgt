import { useState, useEffect } from 'react';
import { useNavigation } from '@refinedev/core';
import { useForm } from '@refinedev/react-hook-form';
import { FieldValues } from 'react-hook-form';
import { Box, Typography, Stack } from '@mui/material';
import { CustomButton } from 'components';
import { AppRegistration } from '@mui/icons-material';

import { StudentRegisterForm } from 'components';
import axios from 'axios';
import { useNotification } from '@refinedev/core';

import ExcelDataUploadDialog from 'components/forms/ExcelDataUploadDialog';

const RegisterGuests = () => {
  const navigation = useNavigation();
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  // Get some data from the backend
  const [programs, setPrograms] = useState([]);
  const [cohorts, setCohort] = useState([]);
  const [hubs, setHub] = useState([]);

  const { open } = useNotification();
  const [excelOpen, setExcelOpen] = useState(false);

  // Create the base axios api endpoint for fetching our data
  const api = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
  });

  const onFinishHandler = async (data: FieldValues) => {
    // Make an api call to /students with axios
    try {
      console.log(data);
      const response = await api.post('/students', { ...data, isAlumni: true });
      // Redirect to the guests page
      navigation.push('/guests');
      open?.({
        type: 'success',
        message: 'Success',
        description: 'Guest Registered Successfully',
      });
    } catch (error: any) {
      open?.({
        type: 'error',
        message: 'Error',
        description: error.response.data.error,
      });
    }
  };

  useEffect(() => {
    // Get all programs
    async function getPrograms() {
      try {
        const response = await api.get('/programs');
        setPrograms(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    // Get all hubs
    async function getHubs() {
      try {
        const response = await api.get('/hubs');
        setHub(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    // Get all cohorts
    async function getCohorts() {
      try {
        const response = await api.get('/cohorts');
        setCohort(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getPrograms();
    getHubs();
    getCohorts();
  }, []);

  const handleClose = () => {
    setExcelOpen(false);
  };

  const handleOpen = () => {
    setExcelOpen(true);
  };

  return (
    <Box>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Typography fontSize={25} fontWeight={700} color='#11142d'>
          Register a Guest
        </Typography>
        <CustomButton
          title='Register From Excel'
          handleClick={handleOpen}
          backgroundColor='#174281'
          color='#fcfcfc'
          icon={<AppRegistration />}
        />
        <ExcelDataUploadDialog excelOpen={excelOpen} onClose={handleClose} />
      </Stack>
      <StudentRegisterForm
        register={register}
        onFinish={onFinish}
        formLoading={formLoading}
        handleSubmit={handleSubmit}
        onFinishHandler={onFinishHandler}
        programs={programs}
        cohorts={cohorts}
        hubs={hubs}
        watch={watch}
        setValue={setValue}
        errors={errors}
      ></StudentRegisterForm>
    </Box>
  );
};

export default RegisterGuests;
