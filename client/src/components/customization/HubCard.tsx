import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditHubDialog from './EditHubDialog';
import { useState } from 'react';
import ConfirmationDialog from 'components/common/ConfirmationDialog';
import { useNotification } from '@refinedev/core';
import axios from 'axios';
import { useNavigation } from '@refinedev/core';
import { HubType } from 'interfaces/common';
import BASE_API_URL from 'config';

interface HubCardProps {
  id: string;
  name: string;
  reduceHubs: (id: string) => void;
  updateHubsOnUpdate: (id: string, updatedHub: HubType) => void;
}

const baseApi = axios.create({
  baseURL: BASE_API_URL,
});

const HubCard = ({
  id,
  name,
  reduceHubs,
  updateHubsOnUpdate,
}: HubCardProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const { open } = useNotification();
  const { goBack } = useNavigation();

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
      await baseApi.delete(`/hubs/${id}`);
      setOpenConfirmDialog(false);
      open?.({
        type: 'success',
        message: 'Success',
        description: 'Hub Deleted Successfully',
      });
      reduceHubs(id);
    } catch (error: any) {
      open?.({
        type: 'error',
        message: 'Error',
        description:
          error.response.data.message ===
          'Hub has child entities, cannot be deleted!'
            ? 'The selected Hub cannot be deleted as it is associated with either admin accounts, students, or any attendances.'
            : error.response.data.message,
      });
    }
  };

  return (
    <div>
      <Card
        sx={{
          maxWidth: 345,
          background: '#2B6EB2',
          maxHeight: 100,
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
            {name}
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
      <EditHubDialog
        isOpened={openDialog}
        handleClose={handleCloseDialog}
        id={id}
        name={name}
        updateHubsOnUpdate={updateHubsOnUpdate}
      />
      <ConfirmationDialog
        dialogTitle='Are you sure you want to delete this Hub?'
        dialogDescription='Warning: Deleting the hub is only possible if it is not associated with any learner, guest, admin account, and attendace records. 
        Please proceed with caution'
        open={openConfirmDialog}
        handleClose={handleCloseConfirmDialog}
        handleConfirm={handleDeleteClick}
      />
    </div>
  );
};

export default HubCard;
