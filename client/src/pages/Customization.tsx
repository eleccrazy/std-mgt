// Filename: Customization.tsx

import { Box } from '@mui/material';
import { ProgramsSection, MessagesSection } from 'components/customization';
import { useEffect, useState } from 'react';
import { useNotification } from '@refinedev/core';
import axios from 'axios';
import HubsSection from 'components/customization/HubsSection';

const baseApi = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

const Customization = () => {
  const [setting, setSetting] = useState(null);
  const { open } = useNotification();

  useEffect(() => {
    async function getSetting() {
      try {
        const response = await baseApi.get('/settings');
        setSetting(response.data.length > 0 ? response.data[0] : null);
      } catch (error: any) {
        open?.({
          type: 'error',
          message: 'Error',
          description: error.response.data.message,
        });
      }
    }
    getSetting();
  }, []);

  return (
    <Box mb={5} display='flex' flexDirection='column' bgcolor='#ffffff' p={3}>
      <HubsSection mb={3} />
      <ProgramsSection mb={3} />
      <MessagesSection setting={setting} />
    </Box>
  );
};

export default Customization;
