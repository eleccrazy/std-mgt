import React from 'react';
import { useGetIdentity } from '@refinedev/core';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import SettingsIcon from '@mui/icons-material/Settings';

export const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { data: user } = useGetIdentity({
    v3LegacyAuthProviderCompatible: true,
  });
  const showUserInfo = user && (user.name || user.avatar);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const admin = localStorage.getItem('admin');
  const userAdmin = admin ? JSON.parse(admin) : null;

  return (
    <AppBar
      position='sticky'
      elevation={0}
      sx={{
        backgroundColor: '#fff',
        color: 'black',
      }}
    >
      <Toolbar>
        <Stack
          direction='row'
          width='100%'
          justifyContent='space-between'
          alignItems='center'
        >
          <Typography variant='subtitle2'>
            ALX Learner Tracking System{' '}
            {userAdmin?.role === 'admin'
              ? 'Admin'
              : 'Attendant' + `@ ${userAdmin?.hub.name}`}
          </Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
