import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  CardHeader,
  Grid,
} from '@mui/material';
import CustomButton from 'components/common/CustomButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoCard from 'components/common/InfoCard';
import StudentAttendanceGraph from 'components/charts/StudentAttendanceGraph';
import AttendanceActionDialog from './AttendanceActionDialog';
import { useEffect, useState } from 'react';
import { useNotification, useNavigation } from '@refinedev/core';
import StudentData from 'interfaces/student';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Define base api endpoint
const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

const CustomAttendanceInfo = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => {
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      xl={3}
      display='flex'
      flexWrap='wrap'
    >
      <InfoCard title={title} value={value} />
    </Grid>
  );
};

const AttendanceSection = () => {
  const [isAttendanceDialogOpen, setIsAttendanceDialgoOpen] = useState(false);
  const [student, setStudent] = useState<StudentData | null>(null);

  const { open } = useNotification();
  const navigate = useNavigate();

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const { goBack, push } = useNavigation();

  useEffect(() => {
    async function getStudent() {
      const { data } = await api.get(`/students/${id}`);
      setStudent(data);
    }
    getStudent();
  }, []);

  // Handle attendance action dialog open and close
  const handleOpenAttendanceDialog = () => {
    setIsAttendanceDialgoOpen(true);
  };
  const handleCloseAttendanceDialog = () => {
    setIsAttendanceDialgoOpen(false);
  };

  const handleAttendanceAction = async () => {
    setIsAttendanceDialgoOpen(false);
    // Attendance action goes here
    const message = student?.attendanceId ? 'Out' : 'In';
    try {
      const data = !student?.attendanceId
        ? await api.post('attendances/check-in', {
            studentId: id,
          })
        : await api.patch(`attendances/${student?.attendanceId}/check-out`, {
            studentId: id,
          });
      if (data.status === 201 || data.status === 200) {
        // Refresh the page
        navigate(0);
        open?.({
          type: 'success',
          message: 'Success',
          description: `Student Checked ${message} Successfully`,
        });
      }
    } catch (error: any) {
      open?.({
        type: 'error',
        message: 'Error',
        description: error.response.data.error,
      });
    }
  };

  return (
    <Card sx={{ minWidth: 275, boxShadow: 'none' }}>
      <CardHeader
        title='Attendance Information'
        sx={{ display: 'flex', justifyContent: 'space-between' }}
        action={
          <CustomButton
            title='Check In/Out'
            handleClick={handleOpenAttendanceDialog}
            backgroundColor='#f5f5f5'
            color='#3fa164'
            icon={<CheckCircleOutlineIcon />}
          />
        }
      />
      <CardContent>
        <Box mt='20px'>
          <Grid container spacing={4}>
            <CustomAttendanceInfo title='Total Attendances' value='56' />
            <CustomAttendanceInfo title='Total hours Spent' value='233 hours' />
            <CustomAttendanceInfo title='Current Week Attendances' value='4' />
            <CustomAttendanceInfo
              title='Current Week total hours'
              value='6 hours'
            />
            <CustomAttendanceInfo
              title='Average hours per Week'
              value='6.8 hours'
            />
            <CustomAttendanceInfo
              title='Average hours per month'
              value='35.78 hours'
            />
            <CustomAttendanceInfo
              title='Status'
              value='Checked In @ CapStone'
            />
          </Grid>
        </Box>
        <Box mt='20px'>
          <StudentAttendanceGraph />
        </Box>
      </CardContent>
      <CardActions>
        <Button size='medium' style={{ textTransform: 'none' }}>
          Get More Information
        </Button>
      </CardActions>
      <AttendanceActionDialog
        open={isAttendanceDialogOpen}
        onClose={handleCloseAttendanceDialog}
        id={id as unknown as string}
        onAttendanceAction={handleAttendanceAction}
      />
    </Card>
  );
};

export default AttendanceSection;
