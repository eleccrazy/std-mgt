import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { useEffect, useState } from 'react';

import {
  PieChart,
  StudentsPerProgram,
  StudentAttendanceRate,
} from 'components';
import { HubData, StudentStatsData } from 'interfaces/student';

// Define base api endpoint
const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

const Home = () => {
  const [stats, setStats] = useState<StudentStatsData | null>(null);
  const [hubs, setHubs] = useState<HubData[]>([]);

  useEffect(() => {
    const getStats = async () => {
      try {
        const response = await api.get('/students/stats');
        const { data } = response;
        setStats(data);
      } catch (error: any) {
        console.log(error);
      }
    };
    const getHubs = async () => {
      try {
        const response = await api.get('/hubs');
        const { data } = response;
        setHubs(data);
      } catch (error: any) {
        console.log(error);
      }
    };
    getHubs();
    getStats();
  }, []);
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color='#11142D'>
        Dashboard
      </Typography>
      <Box mt='20px' display='flex' flexWrap='wrap' gap={4}>
        <PieChart
          title='Total Learners'
          value={stats?.totalLearners ? stats?.totalLearners : 0}
          series={[50, 50]}
          colors={['#2B6EB2', '#92C4E7']}
        />
        <PieChart
          title='Total Guests'
          value={stats?.totalGuests ? stats?.totalGuests : 0}
          series={[50, 50]}
          colors={['#2B6EB2', '#92C4E7']}
        />
        {hubs &&
          hubs.map((hub) => {
            return (
              <PieChart
                key={hub.id}
                title={`Current attendees in ${hub.name} `}
                value={0}
                series={[50, 50]}
                colors={['#275be8', '#c4e8ef']}
              />
            );
          })}
      </Box>
      <Stack
        mt='25px'
        width='100%'
        direction={{ xs: 'column', lg: 'row' }}
        gap={4}
      >
        <StudentAttendanceRate />
        <StudentsPerProgram perProgramPercent={stats?.perProgramPercent} />
      </Stack>
    </Box>
  );
};

export default Home;
