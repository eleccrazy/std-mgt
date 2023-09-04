import { Grid, Box, Typography } from '@mui/material';
import ProgramCard from 'components/common/ProgramCard';
import AddButton from './AddButton';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ProgramType } from 'interfaces/common';
import CreateProgramDialog from './CreateProgramDialog';
import { useNavigate } from 'react-router-dom';

const baseApi = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

const ProgramsSection = ({ mb, mt }: { mb?: number; mt?: number }) => {
  const [programs, setPrograms] = useState<ProgramType[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  useEffect(() => {
    async function getPrograms() {
      try {
        const response = await baseApi.get('/programs');
        setPrograms(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getPrograms();
  }, []);
  return (
    <Box
      boxShadow={2}
      p={2}
      sx={{ background: '#7cabcf' }}
      borderRadius={2}
      mb={mb}
    >
      <Typography variant='h5' sx={{ color: '#fff' }} p={2}>
        Manage Programs
      </Typography>
      <Grid container spacing={2}>
        {programs.map((program) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={program.name}>
              <ProgramCard id={program.id} name={program.name} />
            </Grid>
          );
        })}
        <Grid item xs={12} sm={6} md={4} lg={3} mt={2}>
          <AddButton onClick={handleClick} />
        </Grid>
      </Grid>
      <CreateProgramDialog
        isOpened={openDialog}
        handleClose={handleCloseDialog}
        isProgram={true}
      />
    </Box>
  );
};

export default ProgramsSection;
