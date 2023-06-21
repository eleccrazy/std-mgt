import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import {
  PieChart,
  StudentsPerProgram,
  StudentAttendanceRate,
  PropertyCard,
} from 'components';

const Home = () => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color='#11142D'>
        Dashboard
      </Typography>
      <Box mt='20px' display='flex' flexWrap='wrap' gap={4}>
        <PieChart
          title='Total Students'
          value={1034}
          series={[90, 10]}
          colors={['#275be8', '#c4e8ef']}
        />
        <PieChart
          title='Total Guests'
          value={431}
          series={[30, 70]}
          colors={['#275be8', '#c4e8ef']}
        />
        <PieChart
          title='Current Attendees In CapStone'
          value={326}
          series={[50, 50]}
          colors={['#275be8', '#c4e8ef']}
        />
        <PieChart
          title='Current Attendees In CityHub'
          value={210}
          series={[75, 25]}
          colors={['#275be8', '#c4e8ef']}
        />
      </Box>
      <Stack
        mt='25px'
        width='100%'
        direction={{ xs: 'column', lg: 'row' }}
        gap={4}
      >
        <StudentAttendanceRate />
        <StudentsPerProgram />
      </Stack>
    </Box>
  );
};

export default Home;
