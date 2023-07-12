import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { ConfirmationDialogProps } from 'interfaces/common';

function ConfirmationDialog({
  open,
  handleClose,
  handleConfirm,
  dialogTitle,
  dialogDescription,
}: ConfirmationDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby='responsive-dialog-title'
    >
      <DialogTitle id='responsive-dialog-title'>{dialogTitle} </DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogDescription}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} sx={{ color: 'red' }}>
          Disagree
        </Button>
        <Button onClick={handleConfirm} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationDialog;
