import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditDialog from './EditDialog';
import { useState } from 'react';
import ConfirmationDialog from 'components/common/ConfirmationDialog';
import { useNotification } from '@refinedev/core';
import axios from 'axios';
import { useNavigation } from '@refinedev/core';
import BASE_API_URL from 'config';
import { CohortType } from 'interfaces/common';

interface CohortCardProps {
  id: string;
  name: string;
  updateCohortsOnDelete: (id: string) => void;
  updateCohortsOnUpdate: (id: string, updatedCohort: CohortType) => void;
}

const baseApi = axios.create({
  baseURL: BASE_API_URL,
});

const CohortCard = ({
  id,
  name,
  updateCohortsOnDelete,
  updateCohortsOnUpdate,
}: CohortCardProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const { open } = useNotification();

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleEditClick = () => {
    setOpenDialog(true);
  };

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleDeleteClick = async () => {
    try {
      await baseApi.delete(`/cohorts/${id}`);
      setOpenConfirmDialog(false);
      updateCohortsOnDelete(id);
      open?.({
        type: 'success',
        message: 'Success',
        description: 'Cohort Deleted Successfully',
      });
    } catch (error: any) {
      open?.({
        type: 'error',
        message: 'Error',
        description:
          error.response.data.message ===
          'Cohort has child entities, cannot be deleted!'
            ? 'The selected cohort cannot be deleted as it is currently associated with enrolled students. Please note that removing the cohort is not possible while there are active student connections.'
            : error.response.data.message,
      });
    }
  };

  return (
    <div>
      <Card
        sx={{
          maxWidth: 345,
          maxHeight: 100,
          background: '#2B6EB2',
          height: 100,
          '&:hover': {
            background: '#174281',
          },
        }}
      >
        <CardContent>
          <Typography
            gutterBottom
            component='div'
            sx={{ color: '#ecebf0', display: 'flex', alignItems: 'center' }}
          >
            Cohort: {name}
            <div style={{ marginLeft: 'auto' }}>
              <IconButton
                aria-label='edit'
                color='inherit'
                onClick={handleEditClick}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label='delete'
                color='inherit'
                onClick={handleOpenConfirmDialog}
              >
                <DeleteIcon style={{ color: '#d33f49' }} />
              </IconButton>
            </div>
          </Typography>
        </CardContent>
      </Card>
      <EditDialog
        isOpened={openDialog}
        handleClose={handleCloseDialog}
        isProgram={false}
        id={id}
        name={name}
        updateCohortsOnUpdate={updateCohortsOnUpdate}
      />
      <ConfirmationDialog
        dialogTitle='Are you sure you want to delete this cohort?'
        dialogDescription='Warning: Deleting the cohort is only possible if it is not associated with any learner or guest. 
        If the cohort is linked to any students, it cannot be deleted. Please proceed with caution.'
        open={openConfirmDialog}
        handleClose={handleCloseConfirmDialog}
        handleConfirm={handleDeleteClick}
      />
    </div>
  );
};

export default CohortCard;
