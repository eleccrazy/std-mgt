import { AccountData, HubType } from 'interfaces/common';
import { useState } from 'react';
import { FormEvent } from 'react';
import {
  Box,
  TextField,
  FormHelperText,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import CustomButton from 'components/common/CustomButton';
import axios from 'axios';
import { useNotification } from '@refinedev/core';
import BASE_API_URL from 'config';
const baseApi = axios.create({
  baseURL: BASE_API_URL,
});

const style = {
  fontWeight: 500,
  fontSize: 16,
  margin: '10px 0',
  color: '#11142d',
};

interface CreateaccountFormProps {
  hubs: HubType[];
  closeDialog: () => void;
  updateAccount: (account: AccountData) => void;
}

const CreateAccountForm = ({
  hubs,
  closeDialog,
  updateAccount,
}: CreateaccountFormProps) => {
  // Form states
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'admin',
    hubId: '',
  });
  const { open } = useNotification();

  // Handle form change events
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Add a confirmPassword Field
      const data = { ...formData, confirmPassword: formData.password };
      // Handle account registration logic
      const admin = await baseApi.post('/admins/register', data);
      // Update account list
      updateAccount(admin.data.admin);
      closeDialog();
      open?.({
        type: 'success',
        message: 'Success',
        description: 'Account Created Succesfully',
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
    <Box borderRadius='25px' padding='20px' bgcolor='#ffffff'>
      <form
        style={{
          marginTop: '20px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
        onSubmit={handleSubmit}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
          }}
        >
          <FormControl>
            <FormHelperText sx={style}>
              Email <span style={{ color: 'red' }}>*</span>
            </FormHelperText>
            <TextField
              fullWidth
              id='email'
              color='info'
              required
              type='email'
              variant='outlined'
              name='email'
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormHelperText sx={style}>
              Password <span style={{ color: 'red' }}>*</span>
            </FormHelperText>
            <TextField
              fullWidth
              id='password'
              color='info'
              required
              variant='outlined'
              type='text'
              name='password'
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormHelperText sx={style}>First Name</FormHelperText>
            <TextField
              fullWidth
              id='firstName'
              color='info'
              variant='outlined'
              type='firstName'
              name='firstName'
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormHelperText sx={style}>Last Name</FormHelperText>
            <TextField
              fullWidth
              id='lastName'
              color='info'
              type='text'
              variant='outlined'
              name='lastName'
              onChange={handleChange}
            />
          </FormControl>
          <FormControl sx={{ flex: 1 }}>
            <FormHelperText style={style}>
              Account Type <span style={{ color: 'red' }}>*</span>
            </FormHelperText>
            <Select
              variant='outlined'
              color='info'
              displayEmpty
              required
              name='role'
              defaultValue='admin'
              inputProps={{ 'aria-label': 'Without label' }}
              onChange={handleChange}
            >
              <MenuItem value='admin'>Admin</MenuItem>
              <MenuItem value='attendant'>Attendant</MenuItem>
            </Select>
          </FormControl>
          {formData.role === 'attendant' && (
            <FormControl sx={{ flex: 1 }}>
              <FormHelperText style={style}>
                Select Hub <span style={{ color: 'red' }}>*</span>
              </FormHelperText>
              <Select
                variant='outlined'
                color='info'
                displayEmpty
                required
                defaultValue=''
                name='hubId'
                inputProps={{ 'aria-label': 'Without label' }}
                onChange={handleChange}
              >
                <MenuItem value='' disabled>
                  Select Here
                </MenuItem>
                {hubs.length > 0 &&
                  hubs.map((hub: any, index) => (
                    <MenuItem key={index} value={hub.id}>
                      {hub.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}
        </div>
        <Box style={{ textAlign: 'center' }} marginTop={6}>
          <CustomButton
            type='submit'
            title={'Create Account'}
            backgroundColor='#475be8'
            color='#fcfcfc'
          ></CustomButton>
        </Box>
      </form>
    </Box>
  );
};

export default CreateAccountForm;
