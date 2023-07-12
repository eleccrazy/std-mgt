import { Box, Grid, Typography } from '@mui/material';
import ProgramCard from '../components/common/CustomCard';

const Customization = () => {
  return (
    <Box>
      <Typography
        fontSize={25}
        fontWeight={700}
        sx={{ mb: '15px' }}
        color='#11142D'
      >
        Customization
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ProgramCard
            title='title one'
            summary='summary one'
            image='image one'
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ProgramCard
            title='title two'
            summary='summary two'
            image='image two'
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ProgramCard
            title='title three'
            summary='summary three'
            image='image three'
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ProgramCard
            title='title four'
            summary='summary four'
            image='image four'
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Customization;
