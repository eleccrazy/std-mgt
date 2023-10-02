import React, { useState, useEffect } from 'react';
import Tab from '@mui/material/Tab';
import QrCodeIcon from '@mui/icons-material/QrCode';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import { Box } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import axios from 'axios';
import StudentData from 'interfaces/student';
import StudentUpdateForm from 'components/forms/StudentUpdateForm';
import ChangeProgramCohort from './ChangeProgramCohort';
import ReGenerateQRCode from './ReGenerateQRCode';
import BASE_API_URL from 'config';
import StudentUpdateFormSkeleton from 'components/skeletons/StudentUpdateFormSkeleton';

function StudentUpdateTabs() {
  const [value, setValue] = useState('basic-info');
  const [hubs, setHubs] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [cohorts, setCohorts] = useState([]);
  const [student, setStudent] = useState<StudentData | null>(null);

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  // Create the base axios api endpoint for fetching our data
  const api = axios.create({
    baseURL: BASE_API_URL,
  });

  useEffect(() => {
    // Get all hubs
    async function getHubs() {
      try {
        const response = await api.get('/hubs');
        setHubs(response.data);
      } catch (error) {}
    }

    // Get the student data
    async function getStudent() {
      try {
        const response = await api.get(`/students/${id}`);
        setStudent(response.data);
      } catch (error) {}
    }

    // Get all programs
    async function getPrograms() {
      try {
        const response = await api.get('/programs');
        setPrograms(response.data);
      } catch (error) {}
    }

    // Get all cohorts
    async function getCohorts() {
      try {
        const response = await api.get('/cohorts');
        setCohorts(response.data);
      } catch (error) {}
    }
    getPrograms();
    getCohorts();
    getHubs();
    getStudent();
  }, []);

  return (
    <TabContext value={value}>
      <Box sx={{ bgcolor: 'background.paper' }} mx={2}>
        <TabList
          onChange={handleChange}
          aria-label='icon label tabs example'
          variant='fullWidth'
          TabIndicatorProps={{
            style: {
              backgroundColor: 'blue',
              height: '3px',
            },
          }}
          sx={{
            backgroundColor: '#d5ede8',
          }}
        >
          <Tab
            icon={<PermIdentityIcon />}
            label='Edit Basic Info'
            value='basic-info'
            style={{ textTransform: 'none' }}
            sx={{
              '&.Mui-selected': {
                color: 'blue',
                fontWeight: 600,
              },
            }}
          />
          <Tab
            icon={<CastForEducationIcon />}
            label='Edit Program/Cohort'
            value='program-cohort'
            style={{ textTransform: 'none' }}
            sx={{
              '&.Mui-selected': {
                color: 'blue',
                fontWeight: 600,
              },
            }}
          />
          <Tab
            icon={<QrCodeIcon />}
            label='Re Generate QR Code'
            value='generate-qr'
            style={{ textTransform: 'none' }}
            sx={{
              '&.Mui-selected': {
                color: 'blue',
                fontWeight: 600,
              },
            }}
          />
        </TabList>
        <TabPanel value='basic-info'>
          <Box>
            {student && cohorts.length > 0 && programs.length > 0 ? (
              <StudentUpdateForm student={student} hubs={hubs} />
            ) : (
              <StudentUpdateFormSkeleton />
            )}
          </Box>
        </TabPanel>
        <TabPanel value='program-cohort'>
          <Box>
            {student && cohorts.length > 0 && programs.length > 0 ? (
              <ChangeProgramCohort
                programs={programs}
                cohorts={cohorts}
                student={student}
              />
            ) : (
              <StudentUpdateFormSkeleton />
            )}
          </Box>
        </TabPanel>
        <TabPanel value='generate-qr'>
          <Box>
            {student && cohorts.length > 0 && programs.length > 0 ? (
              <ReGenerateQRCode />
            ) : (
              <StudentUpdateFormSkeleton />
            )}
          </Box>
        </TabPanel>
      </Box>
    </TabContext>
  );
}

export default StudentUpdateTabs;
