import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNotification } from '@refinedev/core';

import {
  PieChart,
  StudentsPerProgram,
  StudentAttendanceRate,
} from 'components';
import { HubData, StudentStatsData, ActiveStatsData } from 'interfaces/student';
import BASE_API_URL from 'config';

// Define base api endpoint
const api = axios.create({
  baseURL: BASE_API_URL,
});

const Home = () => {
  const [stats, setStats] = useState<StudentStatsData | null>(null);
  const [hubs, setHubs] = useState<HubData[]>([]);
  const [activeCount, setActiveCount] = useState<Record<string, number>>({});
  const [activeStats, setActiveStats] = useState<ActiveStatsData | null>(null);
  const { open } = useNotification();

  useEffect(() => {
    const getStats = async () => {
      try {
        const response = await api.get('/students/stats');
        const { data } = response;
        setStats(data);
      } catch (error: any) {
        open?.({
          type: 'error',
          message: 'Error',
          description: error.response.data.error,
        });
      }
    };
    const getActiveStats = async () => {
      try {
        const response = await api.get('/students/active-students');
        setActiveStats(response.data);
      } catch (error: any) {
        open?.({
          type: 'error',
          message: 'Error',
          description: error.response.data.error,
        });
      }
    };
    const getHubs = async () => {
      try {
        const response = await api.get('/hubs');
        const { data } = response;
        setHubs(data);
      } catch (error: any) {
        open?.({
          type: 'error',
          message: 'Error',
          description: error.response.data.error,
        });
      }
    };
    const getActiveStudents = async () => {
      try {
        const response = await api.get('/attendances/active');
        setActiveCount(response.data);
      } catch (error: any) {
        open?.({
          type: 'error',
          message: 'Error',
          description: error.response.data.error,
        });
      }
    };
    getHubs();
    getStats();
    getActiveStudents();
    getActiveStats();
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
          type='fixed'
        />
        <PieChart
          title='Total Guests'
          value={stats?.totalGuests ? stats?.totalGuests : 0}
          series={[50, 50]}
          colors={['#2B6EB2', '#92C4E7']}
          type='fixed'
        />
        {hubs &&
          hubs.map((hub) => {
            return (
              <PieChart
                key={hub.id}
                title={`Current attendees in ${hub.name} `}
                value={activeCount[hub.name] ? activeCount[hub.name] : 0}
                series={[50, 50]}
                colors={['#2B6EB2', '#92C4E7']}
                type='current'
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
        <StudentsPerProgram
          perProgramPercent={stats?.perProgramPercent}
          title={'Total Registered Attendees Per Program'}
        />
      </Stack>
      <Stack
        mt='25px'
        width='100%'
        direction={{ xs: 'column', lg: 'row' }}
        gap={4}
      >
        <StudentsPerProgram
          perProgramPercent={activeStats?.perProgramPercent}
          studentsPerProgram={activeStats?.studentsPerProgram}
          title={'Total Active Attendees Per Program In All Hubs'}
        />
      </Stack>
    </Box>
  );
};

export default Home;
