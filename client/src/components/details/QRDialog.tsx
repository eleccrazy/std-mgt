import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Typography, Button, Box, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import StudentData from 'interfaces/student';

interface QRDialogeProps {
  open: boolean;
  onClose: () => void;
  onSendMail: () => void;
  id: string;
  studentData: StudentData | null;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const QRDialoge = ({
  open,
  onClose,
  id,
  onSendMail,
  studentData,
}: QRDialogeProps) => {
  // Get the student QR code image from the backend
  const [qrCode, setQrCode] = useState('');
  const [defaultSubject, setDefaultSubject] = useState('');
  const [defaultContent, setDefaultConent] = useState('');

  useEffect(() => {
    setQrCode(`http://localhost:3000/api/v1/images/qrcodes/${id}.png`);
    setDefaultSubject('QR Attendance Information');
    setDefaultConent(
      'Some sort of default content that is being sent to the student or guest. Some sort of default content that is being sent to the student or guest.',
    );
  }, []);
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby='alert-dialog-slide-description'
    >
      <DialogTitle>
        <Typography textAlign='center' fontSize={17}>
          <span style={{ fontWeight: '700' }}>Mailing Address: </span>
          <span style={{ color: '#051149' }}>
            {studentData && `${studentData.email}`}
          </span>
        </Typography>
      </DialogTitle>
      <DialogContent>
        {/* Insert an image to the dialog */}
        <Box display='flex' flexDirection='row' alignItems='center'>
          {qrCode && <img src={qrCode} alt='QR Code' />}
          <Box display='flex' flexDirection='column' gap={2} paddingTop={1}>
            <TextField
              id='outlined-read-only-input'
              label='Subject:'
              variant='outlined'
              value={defaultSubject}
              inputProps={{
                readOnly: true,
              }}
            />
            <TextField
              id='outlined-multiline-static'
              label='Content:'
              defaultValue={defaultContent}
              multiline
              rows={4}
              InputProps={{
                readOnly: true,
              }}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={onSendMail}>
          Mail it
        </Button>
        <Button variant='outlined' onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QRDialoge;
