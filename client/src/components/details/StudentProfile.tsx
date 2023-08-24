import {
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  CardHeader,
  Stack,
} from '@mui/material';
import CustomButton from 'components/common/CustomButton';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import QRDialoge from './QRDialog';
import { useState, useEffect } from 'react';
import axios from 'axios';
import StudentData from 'interfaces/student';
import { useNavigation } from '@refinedev/core';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
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
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const navigation = useNavigation();
  const [studentData, setStudentData] = useState<StudentData | null>(null);

  useEffect(() => {
    async function getStudentData() {
      const { data } = await api.get(`students/${id}`);
      setStudentData(data);
    }
    getStudentData();
  }, []);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSendingMail = () => {
    alert('Mail Sent');
  };
  return (
    <Card sx={{ minWidth: 275, boxShadow: 'none' }}>
      <CardHeader
        title={
          type === 'students' ? 'Student Information' : 'Guest Information'
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
              value={studentData?.hub.name}
            />
            <StudentInfoDisplay
              title='Email Address'
              value={studentData?.email}
            />
            <StudentInfoDisplay
              title='Phone Number'
              value={studentData?.phone}
            />
            <StudentInfoDisplay
              title='Address Information'
              value={`${studentData?.city},  ${studentData?.area}`}
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
          color='#1e36e8'
          icon={<QrCode2Icon />}
        />
        {/* Pass the state of the dialog to the QRDialog component */}
        <QRDialoge
          studentData={studentData}
          open={isDialogOpen}
          onClose={handleCloseDialog}
          id={id as unknown as string}
          onSendMail={handleSendingMail}
        />
      </CardActions>
    </Card>
  );
};

export default StudentProfile;
