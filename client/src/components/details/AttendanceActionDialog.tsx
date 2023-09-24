import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContentText } from '@mui/material';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Typography, Button, Box, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import StudentData from 'interfaces/student';
import BASE_API_URL from 'config';

interface AttendanceDialogProps {
  open: boolean;
  onClose: () => void;
  onAttendanceAction: () => void;
  id: string;
}

// Define base api endpoint
const api = axios.create({
  baseURL: BASE_API_URL,
});

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const AttendanceActionDialog = ({
  open,
  onClose,
  onAttendanceAction,
  id,
}: AttendanceDialogProps) => {
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [hubs, setHubs] = useState([]);
  useEffect(() => {
    async function getStudentData() {
      const { data } = await api.get(`students/${id}`);
      setStudentData(data);
    }

    async function getHubs() {
      const { data } = await api.get('hubs');
      setHubs(data);
    }
    getStudentData();
    getHubs();
  }, []);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>
          <span style={{ fontWeight: '700' }}>Current Status: </span>
          <span style={{ color: '#051149' }}>
            {studentData &&
              `${studentData.attendanceId ? 'Checked In' : 'Checked Out'}`}
          </span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            By confirming this action, the student's attendance record will be
            updated accordingly.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} sx={{ color: 'red' }}>
            Discard
          </Button>
          <Button onClick={onAttendanceAction}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AttendanceActionDialog;
