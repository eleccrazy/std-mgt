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
import { useNavigation } from '@refinedev/core';
import BASE_API_URL from 'config';

const style = {
  fontWeight: 800,
  margin: '10px 0',
  fontSize: 16,
  color: '#11142d',
};

const baseApi = axios.create({
  baseURL: BASE_API_URL,
});

function CreateProgramDialog({
  isOpened,
  handleClose,
  isProgram,
  programId,
  updateCohorts,
}: CreateProgramDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [name, setName] = useState('');
  const { open } = useNotification();
  const { push, goBack } = useNavigation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await baseApi.post(
        isProgram ? '/programs' : '/cohorts',
        { name, programId: programId },
      );
      handleClose();
      // Redirect it to the newely created program detail page if it is program.
      isProgram
        ? push(`/customization/show?type=program&id=${response.data.id}`)
        : updateCohorts && updateCohorts(response.data);
      open?.({
        type: 'success',
        message: 'Success',
        description: isProgram
          ? 'Program Created Successfully'
          : 'Cohort Created Successfully',
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
            <FormHelperText sx={style}>
              {isProgram ? 'Program Name' : 'Cohort Name'}
            </FormHelperText>
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
              backgroundColor='#2B6EB2'
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
