import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { CreateAccountDialogProps, HubType } from 'interfaces/common';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNotification } from '@refinedev/core';
import { useNavigation } from '@refinedev/core';
import CreateAccountForm from './CreateAccountForm';
import BASE_API_URL from 'config';

const style = {
  fontWeight: 800,
  margin: '10px 0',
  fontSize: 16,
  color: '#11142d',
};

const baseApi = axios.create({
  baseURL: BASE_API_URL,
});

function CreateAccountDialog({
  isOpened,
  handleClose,
  updateAccount,
}: CreateAccountDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [name, setName] = useState('');
  const { open } = useNotification();
  const { push, goBack } = useNavigation();
  const [hubs, setHubs] = useState<HubType[]>([]);

  useEffect(() => {
    const fetchHubs = async () => {
      try {
        const response = await baseApi.get('/hubs');
        setHubs(response.data);
      } catch (error: any) {
        open?.({
          type: 'error',
          message: 'Error',
          description: error.response.data.message,
        });
      }
    };
    fetchHubs();
  }, []);

  return (
    <Dialog
      fullScreen={fullScreen}
      open={isOpened}
      onClose={handleClose}
      aria-labelledby='responsive-dialog-title'
    >
      <DialogTitle>
        <Box style={{ textAlign: 'center' }} marginTop={1}>
          <Typography style={{ fontWeight: 700, fontSize: '25sp' }}>
            Enter Account Credentials
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <CreateAccountForm
          hubs={hubs}
          closeDialog={handleClose}
          updateAccount={updateAccount}
        />
      </DialogContent>
    </Dialog>
  );
}

export default CreateAccountDialog;
