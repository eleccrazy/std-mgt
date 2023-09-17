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
import { HubType } from 'interfaces/common';
import BASE_API_URL from 'config';
import StudentAttendanceDetialsDialog from './StudentAttendanceDetailsDialog';
import { AttendanceData } from './StudentAttendanceDetailsDialog';

// Define base api endpoint
const api = axios.create({
  baseURL: BASE_API_URL,
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
  const [studentStats, setStudentStats] = useState<{
    totalAttendances: string;
    totalHoursSpent: string;
    currentWeekAttendances: string;
    currentWeekTotalHours: string;
  } | null>(null);
  const [checkInStats, setCheckInStats] = useState(false);
  const [hub, setHub] = useState<HubType | null>(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [attendances, setAttendances] = useState<AttendanceData[]>([]);

  const { open } = useNotification();

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  const admin = localStorage.getItem('admin');
  const user = admin ? JSON.parse(admin) : null;

  const handleGetMoreInfo = () => {
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  useEffect(() => {
    async function getStudent() {
      try {
        const { data } = await api.get(`/students/${id}`);
        setStudent(data);
        setCheckInStats(data.attendanceId !== null);
        if (data.attendanceId) {
          try {
            const attendance = await api.get(
              `/attendances/${data.attendanceId}`,
            );
            if (attendance.data) {
              setHub(attendance.data?.hub.name);
            }
          } catch (error: any) {
            console.log(error);
            open?.({
              type: 'error',
              message: 'Error',
              description: error.response.data.error,
            });
          }
        }
      } catch (error: any) {
        open?.({
          type: 'error',
          message: 'Error',
          description: error.response.data.error,
        });
      }
    }

    getStudent();
  }, [checkInStats]);

  // Using another useEffect to avoid unnecessery requests to backnd api as the checkInStats changing.
  useEffect(() => {
    async function getStudentStats() {
      try {
        const { data } = await api.get(`/students/${id}/attendance-stats`);
        setStudentStats(data);
      } catch (error: any) {
        open?.({
          type: 'error',
          message: 'Error',
          description: error.response.data.error,
        });
      }
    }

    // Get all attendances of the student
    async function getAllAttenanceRecords() {
      try {
        const { data } = await api.get(`/students/${id}/attendances`);
        setAttendances(data);
      } catch (error: any) {
        open?.({
          type: 'error',
          message: 'Error',
          description: error.response.data.error,
        });
      }
    }
    getStudentStats();
    getAllAttenanceRecords();
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
    const message = checkInStats ? 'Out' : 'In';
    if (user && user?.role === 'admin') {
      open?.({
        type: 'error',
        message: 'Error',
        description:
          'Please login as an attendant to check-in and check-out attendees.',
      });
      return;
    }

    const hubId = user ? user?.hub.id : null;
    if (checkInStats) {
      if (hub !== user?.hub.name) {
        open?.({
          type: 'error',
          message: 'Error',
          description: `You need have to log in with ${hub} account to check-out this attendee.`,
        });
      }
      return;
    }
    try {
      const data = !checkInStats
        ? await api.post('attendances/check-in', {
            studentId: id,
            hubId: hubId,
          })
        : await api.patch(`attendances/${student?.attendanceId}/check-out`, {
            studentId: id,
          });
      if (data.status === 201 || data.status === 200) {
        setCheckInStats(data.status === 201);
        setHub(data.data?.hub?.name);
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
            <CustomAttendanceInfo
              title='Total Attendances'
              value={studentStats ? studentStats.totalAttendances : '0'}
            />
            <CustomAttendanceInfo
              title='Total hours Spent'
              value={
                studentStats
                  ? studentStats?.totalHoursSpent + ' hours'
                  : '0' + ' hours'
              }
            />
            <CustomAttendanceInfo
              title='Current Week Attendances'
              value={studentStats ? studentStats.currentWeekAttendances : '0'}
            />
            <CustomAttendanceInfo
              title='Current Week total hours'
              value={
                studentStats
                  ? studentStats.currentWeekTotalHours + ' hours'
                  : '0' + ' hours'
              }
            />
            <CustomAttendanceInfo
              title='Average hours per Week'
              value={
                studentStats
                  ? studentStats.currentWeekTotalHours + ' hours'
                  : '0' + ' hours'
              }
            />
            <CustomAttendanceInfo
              title='Average hours per month'
              value={
                studentStats && studentStats.currentWeekAttendances
                  ? studentStats.currentWeekTotalHours + ' hours'
                  : '0' + ' hours'
              }
            />
            <CustomAttendanceInfo
              title='Status'
              value={
                checkInStats && hub ? `Checked In @ ${hub}` : 'Checked Out'
              }
            />
          </Grid>
        </Box>
        <Box mt='20px'>
          <StudentAttendanceGraph />
        </Box>
      </CardContent>
      <CardActions>
        <Button
          size='medium'
          style={{ textTransform: 'none' }}
          onClick={handleGetMoreInfo}
        >
          Get More Information
        </Button>
      </CardActions>
      <AttendanceActionDialog
        open={isAttendanceDialogOpen}
        onClose={handleCloseAttendanceDialog}
        id={id as unknown as string}
        onAttendanceAction={handleAttendanceAction}
      />
      {attendances && (
        <StudentAttendanceDetialsDialog
          open={openDetails}
          handleClose={handleCloseDetails}
          attendances={attendances}
        />
      )}
    </Card>
  );
};

export default AttendanceSection;
