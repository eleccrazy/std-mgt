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
import { useState } from 'react';

const StudentProfile = () => {
  // Manage the state of the dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
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
        title='Student Informtion'
        sx={{ display: 'flex', justifyContent: 'space-between' }}
        action={
          <CustomButton
            title='Edit Information'
            handleClick={() => {
              alert('Update Students Information');
            }}
            backgroundColor='transparent'
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
            <Grid item xs={8}>
              <Typography>Full Name: Gizachew Bayness Kassa</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>Gender: Male</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>Programme: AWS Cloud Practioner</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>Cohort: July 2023</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>Email Address: eleccrazy24@gmail.com</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>Phone Number: +251918309763</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>Address Information: Addis Ababa, Kaliti</Typography>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
      <CardActions>
        <CustomButton
          title='QR Code'
          handleClick={() => {
            handleOpenDialog();
          }}
          backgroundColor='transparent'
          color='#1e36e8'
          icon={<QrCode2Icon />}
        />
        {/* Pass the state of the dialog to the QRDialog component */}
        <QRDialoge
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
