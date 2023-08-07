import { Box, Typography } from '@mui/material';
import Login from './LoginNew';
const ProfilePage = () => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color='#11142D'>
        Profile Page
      </Typography>
      <Login />
    </Box>
  );
};

export default ProfilePage;
