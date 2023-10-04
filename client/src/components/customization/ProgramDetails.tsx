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
import BASE_API_URL from 'config';
import { CohortType, ProgramType } from 'interfaces/common';
import CohortCardSkeleton from 'components/skeletons/CohortCardSkeleton';
import CustomSpinner from 'components/common/CustomSpinner';

const baseApi = axios.create({
  baseURL: BASE_API_URL,
});

function ProgramDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const { open } = useNotification();
  const { goBack } = useNavigation();
  const [program, setProgram] = useState<any>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [cohorts, setCohorts] = useState<any>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  // Function to update cohorts
  const updateCohorts = (cohort: CohortType) => {
    const updatedCohorts = [...cohorts, cohort];
    setCohorts(updatedCohorts);
  };

  // Function to reduce cohorts on delete
  const reduceCohorts = (id: string) => {
    const updatedCohorts = cohorts.filter(
      (cohort: CohortType) => cohort.id !== id,
    );
    setCohorts(updatedCohorts);
  };

  // Function to update cohorts when a cohort is updated
  const updateCohortsOnUpdate = (id: string, updatedCohort: CohortType) => {
    const updatedCohorts = cohorts.map((cohort: CohortType) => {
      if (cohort.id === id) {
        console.log(updatedCohort);
        return updatedCohort;
      }
      return cohort;
    });
    setCohorts(updatedCohorts);
  };

  // Function to update the program when the program name is edited.
  const updateProgram = (program: ProgramType) => {
    setProgram(program);
  };

  const handleDeleteClick = async () => {
    try {
      setOpenConfirmDialog(false);
      setIsLoading(true);
      await baseApi.delete(`/programs/${id}`);
      setIsLoading(false);
      goBack();
      open?.({
        type: 'success',
        message: 'Success',
        description: 'Program Deleted Successfully',
      });
    } catch (error: any) {
      setIsLoading(false);
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
        setIsCompleted(true);
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
        {isCompleted
          ? cohorts.map((cohort: any) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={cohort.name}>
                  <CohortCard
                    id={cohort.id}
                    name={cohort.name}
                    updateCohortsOnDelete={reduceCohorts}
                    updateCohortsOnUpdate={updateCohortsOnUpdate}
                  />
                </Grid>
              );
            })
          : [1, 2].map((index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <CohortCardSkeleton />
              </Grid>
            ))}
        <Grid item xs={12} sm={6} md={4} lg={3} mt={2}>
          {isCompleted && (
            <AddButton
              onClick={handleClick}
              backgroundColor='#2B6EB2'
              hoverColor='#21365e'
            />
          )}
        </Grid>
      </Grid>
      <CreateProgramDialog
        isOpened={openDialog}
        handleClose={handleCloseDialog}
        isProgram={false}
        programId={id as unknown as string}
        updateCohorts={updateCohorts}
      />
      <EditDialog
        isOpened={openEditDialog}
        handleClose={handleCoseEditDialog}
        isProgram={true}
        id={id as unknown as string}
        name={program ? program.name : ''}
        updateProgramsOnUpdate={updateProgram}
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
      <CustomSpinner
        isLoading={isLoading}
        color='#34cceb'
        size={40}
        background='no'
      />
    </Box>
  );
}

export default ProgramDetails;
