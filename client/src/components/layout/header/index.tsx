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

  return (
    <AppBar
      color='default'
      position='sticky'
      elevation={0}
      sx={{ background: '#ffffff' }}
    >
      <Toolbar>
        <Stack
          direction='row'
          width='100%'
          justifyContent='space-between'
          alignItems='center'
        >
          <Typography variant='subtitle2'>
            ALX Student Attendance Tracking System
          </Typography>
          <Stack direction='row' gap='16px' alignItems='center'>
            {/* Settings button */}
            <Tooltip title='Settings'>
              <IconButton onClick={handleClick}>
                <SettingsIcon />
              </IconButton>
            </Tooltip>
            {/* Profile button */}
            {showUserInfo && (
              <>
                <Avatar src={user?.avatar} alt={user?.name} />
                <Typography variant='subtitle2'>{user?.name}</Typography>
              </>
            )}
          </Stack>
        </Stack>
      </Toolbar>
      {/* Settings menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Option 1</MenuItem>
        <MenuItem onClick={handleClose}>Option 2</MenuItem>
        <MenuItem onClick={handleClose}>Option 3</MenuItem>
      </Menu>
    </AppBar>
  );
};
