import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { CreateProgramDialogProps } from 'interfaces/common';
import { FormControl, FormHelperText, TextField, Box } from '@mui/material';
import { useState } from 'react';
import CustomButton from 'components/common/CustomButton';
import { FormEvent } from 'react';
import axios from 'axios';
import { useNotification } from '@refinedev/core';
import { useNavigate } from 'react-router-dom';
import { useNavigation } from '@refinedev/core';
import ProgramDetails from './ProgramDetails';

const style = {
  fontWeight: 800,
  margin: '10px 0',
  fontSize: 16,
  color: '#11142d',
};

const baseApi = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

function CreateProgramDialog({
  isOpened,
  handleClose,
}: CreateProgramDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [name, setName] = useState('');
  const { open } = useNotification();
  const { push } = useNavigation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await baseApi.post('/programs', { name });
      handleClose();
      // Redirect it to the newely created program detail page.
      push(`/programs/show?id=${response.data.id}`);
      open?.({
        type: 'success',
        message: 'Success',
        description: 'Program Created Successfully',
      });
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
            <FormHelperText sx={style}>Program Name</FormHelperText>
            <TextField
              fullWidth
              id='outlined-basic'
              color='info'
              required
              type='text'
              variant='outlined'
              name='name'
              onChange={(e: any) => setName(e.target.value)}
              InputProps={{
                style: { color: '#11142d', background: '#c7e7ff' },
              }}
            />
          </FormControl>
          <Box style={{ textAlign: 'center' }} marginTop={6}>
            <CustomButton
              type='submit'
              title={'Create'}
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

export default CreateProgramDialog;
