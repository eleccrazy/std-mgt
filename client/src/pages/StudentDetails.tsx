import {
  ActionSection,
  AttendanceSection,
  StudentProfile,
} from 'components/details';
import { Box } from '@mui/material';

const StudentDetails = () => {
  return (
    <Box
      mt={7}
      mb={5}
      display='flex'
      flexDirection='column'
      bgcolor='#ffffff'
      p={3}
    >
      <StudentProfile type='learners' />
      <AttendanceSection />
    </Box>
  );
};

export default StudentDetails;
