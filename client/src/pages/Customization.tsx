import { Box, Grid, Typography } from '@mui/material';
import CustomCard from '../components/common/CustomCard';
import ProgramCard from '../components/common/ProgramCard';

const Customization = () => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} sx={{mb: '15px'}} color='#11142D'>
        Customization
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ProgramCard/>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ProgramCard/>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ProgramCard/>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ProgramCard/>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Customization;
