import {
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  CardHeader,
} from '@mui/material';
import CustomButton from 'components/common/CustomButton';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import QRDialoge from './QRDialog';
import { useState, useEffect } from 'react';
import axios from 'axios';
import StudentData, { SettingData } from 'interfaces/student';
import { useNavigation, useNotification } from '@refinedev/core';
import BASE_API_URL from 'config';
import StudentProfileSkeleton from 'components/skeletons/StudentProfileSkeleton';

const api = axios.create({
  baseURL: BASE_API_URL,
});
// Custom component for displaying student profile
const StudentInfoDisplay = ({
  title,
  value,
}: {
  title: string;
  value: string | undefined;
}) => {
  return (
    <Grid item xs={8}>
      <Typography fontSize={16}>
        <span
          style={{
            fontWeight: '700',
            display: 'inline-block',
            width: '250px',
            color: '#331e4a',
          }}
        >
          {title}:
        </span>
        <span>{value}</span>
      </Typography>
    </Grid>
  );
};

const StudentProfile = ({ type }: { type: string }) => {
  // Manage the state of the dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const navigation = useNavigation();
  const { open } = useNotification();
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [setting, setSetting] = useState<SettingData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getStudentData() {
      try {
        const { data } = await api.get(`/students/${id}`);
        setStudentData(data);
        setIsCompleted(true);
      } catch (error: any) {}
    }
    async function getSetting() {
      try {
        const response = await api.get('/settings');
        setSetting(response.data.length > 0 ? response.data[0] : null);
      } catch (error: any) {}
    }
    getSetting();
    getStudentData();
  }, []);

  // Handle qr code dialog open and close
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  const handleSendingMail = async () => {
    // Mail sending logic goes here
    try {
      setIsLoading(true);
      setIsDialogOpen(false);
      await api.post(`students/${id}/mail`);
      setIsLoading(false);
      open?.({
        type: 'success',
        message: 'Success',
        description: 'Mail Sent Successfully.',
      });
    } catch (error: any) {
      setIsLoading(false);
      setIsDialogOpen(false);
      open?.({
        type: 'error',
        message: 'Error',
        description: error.response.data.message,
      });
    }
  };

  return isCompleted ? (
    <Card sx={{ minWidth: 275, boxShadow: 'none' }}>
      <CardHeader
        title={
          type === 'learners' ? 'Learner Information' : 'Guest Information'
        }
        sx={{ display: 'flex', justifyContent: 'space-between' }}
        action={
          <CustomButton
            title='Edit Information'
            handleClick={() => {
              navigation.push(`/${type}/edit?id=${id}`);
            }}
            backgroundColor='#f5f5f5'
            color='#3fa164'
            icon={<EditIcon />}
          />
        }
      />
      <CardContent>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={2}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <StudentInfoDisplay
              title='First Name'
              value={studentData?.firstName}
            />
            <StudentInfoDisplay
              title='Last Name'
              value={studentData?.lastName}
            />
            <StudentInfoDisplay title='Gender' value={studentData?.gender} />
            <StudentInfoDisplay
              title='Programme'
              value={studentData?.program.name}
            />
            <StudentInfoDisplay
              title='Cohort'
              value={studentData?.cohort.name}
            />
            <StudentInfoDisplay
              title='Preferred Hub'
              value={studentData?.hub ? studentData.hub.name : 'Not Specified'}
            />
            <StudentInfoDisplay
              title='Email Address'
              value={studentData?.email}
            />
            <StudentInfoDisplay
              title='Mail Status'
              value={
                studentData?.isEmailSent ? 'Delivered' : 'Not Delivered Yet'
              }
            />
            <StudentInfoDisplay
              title='Phone Number'
              value={studentData?.phone}
            />
            <StudentInfoDisplay
              title='Address Information'
              value={
                studentData?.city && studentData?.area
                  ? studentData.city + ', ' + studentData.area
                  : 'Not Specified'
              }
            />
          </Grid>
        </Box>
      </CardContent>
      <CardActions>
        <CustomButton
          title='QR Code'
          handleClick={() => {
            handleOpenDialog();
          }}
          backgroundColor='#f5f5f5'
          color='#174281'
          icon={<QrCode2Icon />}
        />
        {/* Pass the state of the dialog to the QRDialog component */}
        <QRDialoge
          studentData={studentData}
          open={isDialogOpen}
          onClose={handleCloseDialog}
          id={id as unknown as string}
          onSendMail={handleSendingMail}
          setting={setting ? setting : null}
          isLoading={isLoading}
        />
      </CardActions>
    </Card>
  ) : (
    <StudentProfileSkeleton />
  );
};

export default StudentProfile;
