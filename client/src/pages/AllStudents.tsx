import { Box, Typography, Stack, IconButton, Tooltip } from '@mui/material';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { Add } from '@mui/icons-material';
import { useNavigation } from '@refinedev/core';
import { CustomButton } from 'components';
import StudentData from 'interfaces/student';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CustomDataTable from 'components/tables/CustomDataTable';
import { useNotification } from '@refinedev/core';
import BASE_API_URL from 'config';
import ConfirmationDialog from 'components/common/ConfirmationDialog';
import CustomDataTableSkeleton from 'components/skeletons/CustomDataTableSkeleton';
import CustomSpinner from 'components/common/CustomSpinner';

const AllStudents = () => {
  const navigation = useNavigation();
  // Create the base axios api endpoint for fetching our data
  const api = axios.create({
    baseURL: BASE_API_URL,
  });
  const [filteredData, setFilteredData] = useState<StudentData[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { open } = useNotification();
  const [openDialog, setOpenDialog] = useState(false);

  async function checkOutStudents() {
    setOpenDialog(false);
    const admin = localStorage.getItem('admin');
    const user = admin ? JSON.parse(admin) : null;
    const hubId = user?.hub?.id;
    if (user && user?.role === 'admin') {
      open?.({
        type: 'error',
        message: 'Error',
        description: 'Please login as an attendant to check-out attendees.',
      });
      return;
    }
    try {
      setIsLoading(true);
      const { data } = await api.post('/attendances/check-out', {
        hubId: hubId,
      });
      setIsLoading(false);
      navigation.replace('/dashboard');
      open?.({
        type: 'success',
        message: 'Success',
        description: `${data.total} Student(s) Checked Out Successfully.`,
      });
    } catch (error: any) {
      setIsLoading(false);
      open?.({
        type: 'error',
        message: 'Error',
        description: error.response.data.message,
      });
    }
  }

  const handleClose = () => {
    setOpenDialog(false);
  };

  async function getStudents() {
    try {
      const response = await api.get('/students/learners');
      const studentData = response.data;
      setIsCompleted(true);
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
        <Tooltip
          title={
            <Typography
              sx={{ color: '#FFF', bgcolor: 'none', background: 'none' }}
            >
              Checkout All Attendees
            </Typography>
          }
          placement='bottom'
          color='none'
        >
          <IconButton
            aria-label='delete'
            sx={{ color: 'red' }}
            onClick={() => {
              setOpenDialog(true);
            }}
          >
            <PublishedWithChangesIcon />
          </IconButton>
        </Tooltip>
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
      {isCompleted ? (
        <CustomDataTable rows={filteredData} />
      ) : (
        <CustomDataTableSkeleton />
      )}
      <ConfirmationDialog
        open={openDialog}
        handleClose={handleClose}
        handleConfirm={checkOutStudents}
        dialogTitle='Are you sure you want to check them out?'
        dialogDescription='Caution: Initiating this action will automatically check out all students who 
        neglected to check out using their QRCode. Please exercise extreme caution when executing this action, 
        as it cannot be undone. This operation should be performed with utmost care and consideration.'
      />
      <CustomSpinner
        isLoading={isLoading}
        color='#174281'
        size={40}
        background='no'
      />
    </Box>
  );
};

export default AllStudents;
