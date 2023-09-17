import { Grid, Box, Typography } from '@mui/material';
import AddButton from './AddButton';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { HubType } from 'interfaces/common';
import CreateHubDialog from './CreateHubDialog';
import HubCard from './HubCard';
import { useNotification } from '@refinedev/core';
import BASE_API_URL from 'config';

const baseApi = axios.create({
  baseURL: BASE_API_URL,
});

const HubsSection = ({ mb, mt }: { mb?: number; mt?: number }) => {
  const [hubs, setHubs] = useState<HubType[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const { open } = useNotification();
  const handleClick = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Update the hubs when the hub is created
  const updateHubs = (hub: HubType) => {
    const updatedHubs = [...hubs, hub];
    setHubs(updatedHubs);
  };

  // Update the hubs when a hub is deleted
  const reduceHubs = (id: string) => {
    const updatedHubs = hubs.filter((hub) => hub.id !== id);
    setHubs(updatedHubs);
  };

  // Update the hubs when a hub is updated
  const updateHubsOnUpdate = (id: string, updatedHub: HubType) => {
    const updatedHubs = hubs.map((hub) => {
      if (hub.id === id) {
        return updatedHub;
      }
      return hub;
    });
    setHubs(updatedHubs);
  };

  useEffect(() => {
    async function getHubs() {
      try {
        const response = await baseApi.get('/hubs');
        setHubs(response.data);
      } catch (error: any) {
        open?.({
          type: 'error',
          message: 'Error',
          description: error.response.data.message,
        });
      }
    }
    getHubs();
  }, []);
  return (
    <Box
      boxShadow={2}
      p={2}
      sx={{ background: '#6CADDC' }}
      borderRadius={2}
      mb={mb}
    >
      <Typography variant='h5' sx={{ color: '#fff' }} p={2}>
        Manage Hubs
      </Typography>
      <Grid container spacing={2}>
        {hubs.map((hub) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={hub.name}>
              <HubCard
                id={hub.id}
                name={hub.name}
                reduceHubs={reduceHubs}
                updateHubsOnUpdate={updateHubsOnUpdate}
              />
            </Grid>
          );
        })}
        <Grid item xs={12} sm={6} md={4} lg={3} mt={2}>
          <AddButton
            onClick={handleClick}
            backgroundColor='#2B6EB2'
            hoverColor='#21365e'
          />
        </Grid>
      </Grid>
      <CreateHubDialog
        isOpened={openDialog}
        handleClose={handleCloseDialog}
        updateHubs={updateHubs}
      />
    </Box>
  );
};

export default HubsSection;
