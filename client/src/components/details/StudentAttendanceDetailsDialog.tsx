import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import AttendanceDataTable from 'components/tables/AttendanceDataTable';

export interface AttendanceData {
  id: string;
  checkIn: string;
  Date: string;
  checkInTime: string;
  checkOutTime: string;
  totalHoursSpent: string;
}

function StudentAttendanceDetialsDialog({
  open,
  handleClose,
  attendances,
  firstName,
}: {
  open: boolean;
  handleClose: () => void;
  attendances: AttendanceData[];
  firstName: string;
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={() => {}}
      aria-labelledby='responsive-dialog-title'
    >
      <DialogTitle
        id='responsive-dialog-title'
        sx={{ textAlign: 'center', color: '#0e344f' }}
      >
        {`${firstName}'s Attendance History`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <AttendanceDataTable rows={attendances} />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} sx={{ color: 'red' }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default StudentAttendanceDetialsDialog;
