import { Box, Typography } from '@mui/material';
import AddButton from 'components/customization/AddButton';
import CreateAccountDialog from 'components/account/CreateAccountDialog';
import { useState, useEffect } from 'react';
import { AccountData, HubType } from 'interfaces/common';
import axios from 'axios';
import { useNotification } from '@refinedev/core';
import AccountList from 'components/account/AccountList';
import BASE_API_URL from 'config';
import AccountPageSkeleton from 'components/skeletons/AccountPageSkeleton';

const baseApi = axios.create({
  baseURL: BASE_API_URL,
});

const AccountPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { open } = useNotification();
  const [admins, setAdmins] = useState<AccountData[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleCreateAccountDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const updateAccount = (account: AccountData) => {
    const updatedAccount = [...admins, account];
    setAdmins(updatedAccount);
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const rsponse = await baseApi.get('/admins');
        setAdmins(rsponse.data);
        setIsCompleted(true);
      } catch (error: any) {
        open?.({
          type: 'error',
          message: 'Error',
          description: error.response.data.message,
        });
      }
    };
    fetchAccounts();
  }, []);

  return isCompleted ? (
    <>
      <Box mb={5} display='flex' flexDirection='column' bgcolor='#ffffff' p={3}>
        <Box
          boxShadow={2}
          p={2}
          sx={{ background: '#7cabcf' }}
          borderRadius={2}
        >
          <Typography
            variant='h5'
            p={2}
            gutterBottom
            component='div'
            sx={{ color: '#ecebf0', display: 'flex', alignItems: 'center' }}
          >
            Manage Accounts
            <div style={{ marginLeft: 'auto' }}>
              <AddButton
                onClick={handleCreateAccountDialog}
                backgroundColor='#2B6EB2'
                hoverColor='#21365e'
              />
            </div>
          </Typography>
          <Box mt={3}>
            {admins &&
              admins.map((account) => {
                return <AccountList key={account.id} account={account} />;
              })}
          </Box>
        </Box>
      </Box>
      <CreateAccountDialog
        isOpened={openDialog}
        handleClose={handleCloseDialog}
        updateAccount={updateAccount}
      />
    </>
  ) : (
    <AccountPageSkeleton />
  );
};

export default AccountPage;
