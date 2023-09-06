import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNotification, useNavigation } from '@refinedev/core';
import { Box, Typography, Grid } from '@mui/material';
import CohortCard from './CohortCard';
import AddButton from './AddButton';
import CreateProgramDialog from './CreateProgramDialog';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditDialog from './EditDialog';
import ConfirmationDialog from 'components/common/ConfirmationDialog';

const baseApi = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

function ProgramDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const { open } = useNotification();
  const { goBack } = useNavigation();
  const [program, setProgram] = useState<any>(null);
  const [cohorts, setCohorts] = useState<any>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const handleClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleEditClick = () => {
    setOpenEditDialog(true);
  };

  const handleCoseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleDeleteClick = async () => {
    try {
      await baseApi.delete(`/programs/${id}`);
      setOpenConfirmDialog(false);
      goBack();
      open?.({
        type: 'success',
        message: 'Success',
        description: 'Program Deleted Successfully',
      });
    } catch (error: any) {
      open?.({
        type: 'error',
        message: 'Error',
        description:
          error.response.data.message ===
          'Program has child entities, cannot be deleted!'
            ? 'The selected program cannot be deleted as it is currently associated with cohorts. Please note that removing the program is not possible while there are cohorts associated with it.'
            : error.reponse.data.message,
      });
    }
  };

  useEffect(() => {
    async function getProgram() {
      try {
        const { data } = await baseApi.get(`programs/${id}`);
        setProgram(data);
      } catch (error: any) {
        open?.({
          type: 'error',
          message: 'Error',
          description: error.response.data.message,
        });
      }
    }
    async function getProgramCohorts() {
      try {
        const { data } = await baseApi.get(`programs/${id}/cohorts`);
        setCohorts(data);
      } catch (error: any) {
        open?.({
          type: 'error',
          message: 'Error',
          description: error.response.data.message,
        });
      }
    }
    getProgram();
    getProgramCohorts();
  }, []);
  return (
    <Box boxShadow={2} p={2} sx={{ background: '#7cabcf' }} borderRadius={2}>
      <Typography
        variant='h5'
        p={2}
        gutterBottom
        component='div'
        sx={{ color: '#ecebf0', display: 'flex', alignItems: 'center' }}
      >
        Cohorts Under {program && program.name}
        <div style={{ marginLeft: 'auto' }}>
          <IconButton
            aria-label='edit'
            color='inherit'
            onClick={handleEditClick}
          >
            <EditIcon style={{ color: '#12421f' }} />
          </IconButton>
          <IconButton
            aria-label='delete'
            color='inherit'
            onClick={handleOpenConfirmDialog}
          >
            <DeleteIcon style={{ color: '#5c0a0a' }} />
          </IconButton>
        </div>
      </Typography>
      <Grid container spacing={2}>
        {cohorts.map((cohort: any) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={cohort.name}>
              <CohortCard id={cohort.id} name={cohort.name} />
            </Grid>
          );
        })}
        <Grid item xs={12} sm={6} md={4} lg={3} mt={2}>
          <AddButton
            onClick={handleClick}
            backgroundColor='#230563'
            hoverColor='#21365e'
          />
        </Grid>
      </Grid>
      <CreateProgramDialog
        isOpened={openDialog}
        handleClose={handleCloseDialog}
        isProgram={false}
        programId={id as unknown as string}
      />
      <EditDialog
        isOpened={openEditDialog}
        handleClose={handleCoseEditDialog}
        isProgram={true}
        id={id as unknown as string}
        name={program ? program.name : ''}
      />
      <ConfirmationDialog
        dialogTitle='Are you sure you want to delete this Program?'
        dialogDescription='Warning: The deletion of the program is only feasible when it is not associated with 
        any cohorts. If the program is linked to any cohorts, or if there are cohorts within the program, 
        it is not possible to delete it.'
        open={openConfirmDialog}
        handleClose={handleCloseConfirmDialog}
        handleConfirm={handleDeleteClick}
      />
    </Box>
  );
}

export default ProgramDetails;
