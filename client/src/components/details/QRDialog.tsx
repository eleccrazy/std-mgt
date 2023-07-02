import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import StudentData from 'interfaces/student';

interface QRDialogeProps {
  open: boolean;
  onClose: () => void;
  onSendMail: () => void;
  id: string;
}

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1/students',
});

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const QRDialoge = ({ open, onClose, id, onSendMail }: QRDialogeProps) => {
  // Get the student QR code image from the backend
  const [qrCode, setQrCode] = useState('');
  const [studentData, setStudentData] = useState<StudentData | null>(null);

  useEffect(() => {
    setQrCode(`http://localhost:3000/api/v1/images/qrcodes/${id}.png`);
    async function getStudentData() {
      const { data } = await api.get(`/${id}`);
      setStudentData(data);
    }
    getStudentData();
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
        {`Information of ${
          studentData && studentData.firstName + ' ' + studentData.lastName
        } is embedded on this QR code`}
      </DialogTitle>
      <DialogContent>
        {/* Insert an image to the dialog */}
        {qrCode && <img src={qrCode} alt='QR Code' />}
      </DialogContent>
      <DialogActions>
        <Button onClick={onSendMail}>Mail it</Button>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default QRDialoge;
