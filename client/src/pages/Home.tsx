import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNotification } from '@refinedev/core';
import PieChartSkeleton from 'components/skeletons/PieChartSkeleton';
import StudentsPerProgramSkeleton from 'components/skeletons/StudentsPerProgramSkeleton';
import StudentAttendanceRateSkeleton from 'components/skeletons/StudentAttendanceRateSkeleton';

import {
  PieChart,
  StudentsPerProgram,
  StudentAttendanceRate,
} from 'components';
import {
  HubData,
  StudentStatsData,
  ActiveStatsData,
  AttendanceStatsData,
} from 'interfaces/student';
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
  const [attendanceStats, setAttendanceStats] =
    useState<AttendanceStatsData | null>(null);
  const [checkStatsCompleted, setCheckStatsCompleted] = useState(false);
  const [checkActiveStatsCompleted, setCheckActiveStatsCompleted] =
    useState(false);
  const [checkActiveCountCompleted, setCheckActiveCountCompleted] =
    useState(false);
  const { open } = useNotification();

  useEffect(() => {
    const getStats = async () => {
      try {
        const response = await api.get('/students/stats');
        const { data } = response;
        setStats(data);
        setCheckStatsCompleted(true);
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
        setCheckActiveStatsCompleted(true);
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
        setCheckActiveCountCompleted(true);
      } catch (error: any) {
        open?.({
          type: 'error',
          message: 'Error',
          description: error.response.data.error,
        });
      }
    };
    const getAttendanceStats = async () => {
      try {
        const response = await api.get('/attendances/stats');
        setAttendanceStats(response.data);
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
    getAttendanceStats();
  }, []);
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color='#11142D'>
        Dashboard
      </Typography>
      <Box mt='20px' display='flex' flexWrap='wrap' gap={4}>
        {checkStatsCompleted ? (
          <>
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
          </>
        ) : (
          <>
            <PieChartSkeleton width={160} />
            <PieChartSkeleton width={160} />
          </>
        )}
      </Box>

      <Box mt='20px' display='flex' flexWrap='wrap' gap={4}>
        {checkActiveCountCompleted ? (
          hubs.map((hub) => {
            return (
              <PieChart
                key={hub.id}
                title={`Todays Total Attendees in ${hub.name}`}
                value={
                  activeCount[`${hub.name}_total`]
                    ? activeCount[`${hub.name}_total`]
                    : 0
                }
                series={[50, 50]}
                colors={['#3949AB', '#9FA8DA']}
                type='current'
              />
            );
          })
        ) : (
          <>
            <PieChartSkeleton width={230} />
            <PieChartSkeleton width={230} />
          </>
        )}
        {checkActiveCountCompleted ? (
          hubs.map((hub) => {
            return (
              <PieChart
                key={hub.id}
                title={`Currently checked-in attendees in ${hub.name} `}
                value={activeCount[hub.name] ? activeCount[hub.name] : 0}
                series={[50, 50]}
                colors={['#177681', '#7FD6E2']}
                type='current'
              />
            );
          })
        ) : (
          <>
            <PieChartSkeleton width={230} />
          </>
        )}
      </Box>
      <Stack
        mt='25px'
        width='100%'
        direction={{ xs: 'column', lg: 'row' }}
        gap={4}
      >
        {checkStatsCompleted && checkActiveCountCompleted ? (
          <StudentsPerProgram
            perProgramPercent={stats?.perProgramPercent}
            studentsPerProgram={stats?.studentsPerProgram}
            title={'Total Registered Attendees Per Program'}
          />
        ) : (
          <StudentsPerProgramSkeleton />
        )}
        {checkActiveStatsCompleted && checkActiveCountCompleted ? (
          <StudentsPerProgram
            perProgramPercent={activeStats?.perProgramPercent}
            studentsPerProgram={activeStats?.studentsPerProgram}
            title={'Total Active Attendees Per Program In All Hubs'}
          />
        ) : (
          <StudentsPerProgramSkeleton />
        )}
      </Stack>
      <Stack
        mt='25px'
        width='50%'
        direction={{ xs: 'column', lg: 'row' }}
        gap={4}
      >
        {attendanceStats ? (
          <StudentAttendanceRate stats={attendanceStats} />
        ) : (
          <StudentAttendanceRateSkeleton />
        )}
      </Stack>
    </Box>
  );
};

export default Home;
