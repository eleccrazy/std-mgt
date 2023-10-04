import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { EditDialogProps } from 'interfaces/common';
import { FormControl, FormHelperText, TextField, Box } from '@mui/material';
import { useState } from 'react';
import CustomButton from 'components/common/CustomButton';
import { FormEvent } from 'react';
import axios from 'axios';
import { useNotification } from '@refinedev/core';
import BASE_API_URL from 'config';
import CustomSpinner from 'components/common/CustomSpinner';

const style = {
  fontWeight: 800,
  margin: '10px 0',
  fontSize: 16,
  color: '#11142d',
};

const baseApi = axios.create({
  baseURL: BASE_API_URL,
});

function EditDialog({
  isOpened,
  handleClose,
  isProgram,
  id,
  name,
  updateCohortsOnUpdate,
  updateProgramsOnUpdate,
}: EditDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [newName, setNewName] = useState('');
  const { open } = useNotification();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      handleClose();
      setIsLoading(true);
      const finalName = newName === '' ? name : newName;
      const response = await baseApi.patch(
        isProgram ? `/programs/${id}` : `/cohorts/${id}`,
        {
          name: finalName,
        },
      );
      isProgram
        ? updateProgramsOnUpdate && updateProgramsOnUpdate(response.data)
        : updateCohortsOnUpdate && updateCohortsOnUpdate(id, response.data);
      setIsLoading(false);
      open?.({
        type: 'success',
        message: 'Success',
        description: isProgram
          ? 'Program Updated Successfully'
          : 'Cohort Updated Successfully',
      });
    } catch (error: any) {
      setIsLoading(false);
      open?.({
        type: 'error',
        message: 'Error',
        description: error.response.data.message,
      });
    }
  };

  return (
    <>
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
      <CustomSpinner
        isLoading={isLoading}
        color='#34cceb'
        size={40}
        background='no'
      />
    </>
  );
}

export default EditDialog;
