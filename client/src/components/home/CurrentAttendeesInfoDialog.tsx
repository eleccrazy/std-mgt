import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { CreateAccountDialogProps, HubType } from 'interfaces/common';
import {
  FormControl,
  FormHelperText,
  TextField,
  Box,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import CustomButton from 'components/common/CustomButton';
import { FormEvent } from 'react';
import axios from 'axios';
import { useNotification } from '@refinedev/core';
import { useNavigation } from '@refinedev/core';

const style = {
  fontWeight: 800,
  margin: '10px 0',
  fontSize: 16,
  color: '#11142d',
};

const baseApi = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

interface CurrentAttendeesInfoDialogProps {
  isOpened: boolean;
  handleClose: () => void;
  currentStats: any;
}

function CurrentAttendeesInfoDialog({
  isOpened,
  handleClose,
  currentStats,
}: CurrentAttendeesInfoDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [name, setName] = useState('');
  const { open } = useNotification();
  const { push, goBack } = useNavigation();

  return (
    <Dialog
      fullScreen={fullScreen}
      open={isOpened}
      onClose={handleClose}
      aria-labelledby='responsive-dialog-title'
    >
      <DialogContent>Current Attendees Info</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} sx={{ color: 'red' }}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CurrentAttendeesInfoDialog;
