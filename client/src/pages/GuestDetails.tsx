import { AttendanceSection, StudentProfile } from 'components/details';
import { Box } from '@mui/material';

const GuestDetails = () => {
  return (
    <Box mb={5} display='flex' flexDirection='column' bgcolor='#ffffff' p={3}>
      <StudentProfile type='guests' />
      <AttendanceSection />
    </Box>
  );
};

export default GuestDetails;
