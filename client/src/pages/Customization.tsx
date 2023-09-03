import { Box } from '@mui/material';
import { MessagesSection, ProgramsSection } from 'components/customization';

const Customization = () => {
  return (
    <Box mb={5} display='flex' flexDirection='column' bgcolor='#ffffff' p={3}>
      <ProgramsSection mb={3} />
      <MessagesSection />
    </Box>
  );
};

export default Customization;
