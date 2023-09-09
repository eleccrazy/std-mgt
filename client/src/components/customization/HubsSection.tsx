import { Grid, Box, Typography } from '@mui/material';
import ProgramCard from 'components/common/ProgramCard';
import AddButton from './AddButton';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { HubType } from 'interfaces/common';
import CreateHubDialog from './CreateHubDialog';
import HubCard from './HubCard';

const baseApi = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

const HubsSection = ({ mb, mt }: { mb?: number; mt?: number }) => {
  const [hubs, setHubs] = useState<HubType[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const handleClick = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const updateHubs = (hub: HubType) => {
    const updatedHubs = [...hubs, hub];
    setHubs(updatedHubs);
  };
  useEffect(() => {
    async function getHubs() {
      try {
        const response = await baseApi.get('/hubs');
        setHubs(response.data);
      } catch (error) {
        console.log(error);
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
        Manage Programs
      </Typography>
      <Grid container spacing={2}>
        {hubs.map((hub) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={hub.name}>
              <HubCard id={hub.id} name={hub.name} />
            </Grid>
          );
        })}
        <Grid item xs={12} sm={6} md={4} lg={3} mt={2}>
          <AddButton
            onClick={handleClick}
            backgroundColor='#174281'
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
