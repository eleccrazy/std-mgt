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

const AllStudents = () => {
  const navigation = useNavigation();
  // Create the base axios api endpoint for fetching our data
  const api = axios.create({
    baseURL: BASE_API_URL,
  });
  const [filteredData, setFilteredData] = useState<StudentData[]>([]);
  const { open } = useNotification();
  const [openDialog, setOpenDialog] = useState(false);

  async function checkOutStudents() {
    try {
      alert('Checked out');
      setOpenDialog(false);
    } catch (error: any) {}
  }

  const handleClose = () => {
    setOpenDialog(false);
  };

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
        <Tooltip
          title={
            <Typography
              sx={{ color: '#174281', bgcolor: 'none', background: 'none' }}
            >
              Checkout All Attendees
            </Typography>
          }
          placement='bottom'
          color='none'
        >
          <IconButton
            aria-label='delete'
            sx={{ color: '#174281' }}
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
      <CustomDataTable rows={filteredData} />
      <ConfirmationDialog
        open={openDialog}
        handleClose={handleClose}
        handleConfirm={checkOutStudents}
        dialogTitle='Are you sure you want to check them out?'
        dialogDescription='Caution: Initiating this action will automatically check out all students who 
        neglected to check out using their QRCode. Please exercise extreme caution when executing this action, 
        as it cannot be undone. This operation should be performed with utmost care and consideration.'
      />
    </Box>
  );
};

export default AllStudents;
