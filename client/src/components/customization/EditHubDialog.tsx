import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { EditHubDialogProps } from 'interfaces/common';
import { FormControl, FormHelperText, TextField, Box } from '@mui/material';
import { useState } from 'react';
import CustomButton from 'components/common/CustomButton';
import { FormEvent } from 'react';
import axios from 'axios';
import { useNotification } from '@refinedev/core';

const style = {
  fontWeight: 800,
  margin: '10px 0',
  fontSize: 16,
  color: '#11142d',
};

const baseApi = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

function EditHubDialog({
  isOpened,
  handleClose,
  id,
  name,
  updateHubsOnUpdate,
}: EditHubDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [newName, setNewName] = useState('');
  const { open } = useNotification();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const finalName = newName === '' ? name : newName;
      const result = await baseApi.patch(`/hubs/${id}`, {
        name: finalName,
      });
      open?.({
        type: 'success',
        message: 'Success',
        description: 'Hub Updated Successfully',
      });
      // Refresh the page
      updateHubsOnUpdate(id, result.data);
    } catch (error: any) {
      open?.({
        type: 'error',
        message: 'Error',
        description: error.response.data.message,
      });
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={isOpened}
      onClose={handleClose}
      aria-labelledby='responsive-dialog-title'
    >
      <DialogContent>
        <form
          style={{
            width: '90%',
            display: 'flex',
            flexDirection: 'column',
          }}
          onSubmit={handleSubmit}
        >
          <FormControl>
            <FormHelperText sx={style}>Hub Name: </FormHelperText>
            <TextField
              fullWidth
              id='outlined-basic'
              color='info'
              required
              type='text'
              variant='outlined'
              name='name'
              defaultValue={name}
              onChange={(e: any) => setNewName(e.target.value)}
              InputProps={{
                style: { color: '#11142d', background: '#c7e7ff' },
              }}
            />
          </FormControl>
          <Box style={{ textAlign: 'center' }} marginTop={6}>
            <CustomButton
              type='submit'
              title={'Save Changes'}
              backgroundColor='#230563'
              color='#fcfcfc'
            ></CustomButton>
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} sx={{ color: 'red' }}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditHubDialog;
