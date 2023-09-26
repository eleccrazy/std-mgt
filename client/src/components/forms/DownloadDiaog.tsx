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

function DownloadDialog({
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
      onClose={() => {}} // Prevent closing on escape key press
      aria-labelledby='responsive-dialog-title'
    >
      <DialogTitle
        id='responsive-dialog-title'
        sx={{ textAlign: 'center', fontWeight: 700 }}
      >
        {dialogTitle}{' '}
      </DialogTitle>
      <DialogContent>
        <DialogContentText fontWeight={700} fontFamily={'sans-serif'}>
          {dialogDescription}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} sx={{ color: 'red' }}>
          Cancel
        </Button>
        <Button onClick={handleConfirm} autoFocus>
          Download
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DownloadDialog;
