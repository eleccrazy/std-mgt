import * as React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import CustomCard from 'components/common/CustomCard';
import seimage from '../assets/se-image.jpg';
import aws from '../assets/aws.jpg';
import salesforce from '../assets/salesforce.jpg';
import analytics from '../assets/data-analytics.jpg';
import science from '../assets/data-science.jpg';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const Customization = () => {
  
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

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
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Adjust Programs
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Add or edit programs and cohorts</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2} sx={{display: 'flex'}}>
            <Grid item xs={12} sm={6} md={4} lg={3} sx={{display: 'flex'}}>
              <CustomCard
                title='Software Engineering'
                summary='summary one'
                image={seimage}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3} sx={{display: 'flex'}}>
              <CustomCard
                title='AWS Cloud Practitioner'
                summary='summary two'
                image={aws}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3} sx={{display: 'flex'}}>
              <CustomCard
                title='Data Science'
                summary='summary three'
                image={science}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3} sx={{display: 'flex'}}>
              <CustomCard
                title='Data Analytics'
                summary='summary four'
                image={analytics}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3} sx={{display: 'flex'}}>
              <CustomCard
                title='Salesforce Administrator'
                summary='summary four'
                image={salesforce}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3} sx={{display: 'flex', flexDirection: 'row'}}>
              <Button variant="outlined" sx={{color: 'white', backgroundColor: '#475be8', padding: '20px', ":hover": {backgroundColor: '#1e36e8', color: 'white', boarder: '0px'}}} startIcon={<AddIcon />}>
                Add Program
              </Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Duration Requirement</Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Change the minimum duration requirement
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>2 hours</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Advanced settings
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Adjust filtering settings for reports
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
            amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Data Settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
            amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};


export default Customization;
