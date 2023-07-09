import React, { useState, FormEvent, ChangeEvent } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import {
  Box,
  FormControl,
  FormHelperText,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  Select,
  MenuItem,
  Stack,
} from '@mui/material';
import StudentData from 'interfaces/student';
import CustomButton from 'components/common/CustomButton';
import axios from 'axios';
import { useNotification, useNavigation } from '@refinedev/core';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  area: string;
  gender: string;
  hubId: string;
};

const style = {
  fontWeight: 500,
  margin: '10px 0',
  fontSize: 16,
  color: '#11142d',
};

interface StudentUpdateFormProps {
  hubs: string[];
  student: StudentData;
}

const StudentUpdateForm = ({ hubs, student }: StudentUpdateFormProps) => {
  const [formData, setFormData] = useState({
    firstName: student ? student.firstName : '',
    lastName: student ? student.lastName : '',
    email: student ? student.email : '',
    phone: student ? student.phone : '',
    city: student ? student.city : '',
    area: student ? student.area : '',
    gender: student ? student.gender : '',
    hubId: student ? student.hubId : '',
  });
  const [hubId, setHubId] = useState(student.hubId);
  const api = axios.create({
    baseURL: `http://localhost:3000/api/v1/students`,
  });

  const { open } = useNotification();
  const { goBack } = useNavigation();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleHubChange = (event: SelectChangeEvent<string>) => {
    setHubId(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Filter only changed data so that we don't send unecessary data to the server to update.
    const filteredFormData = Object.entries({
      ...formData,
      hubId: hubId,
    }).reduce((acc: Record<string, string>, [key, value]) => {
      if (student && student[key as keyof StudentData] !== value) {
        acc[key] = value;
      }
      return acc;
    }, {} as Partial<FormData>);
    // Make an api call to the server to update the student data.
    try {
      const response = await api.put(`/${student?.id}`, {
        ...filteredFormData,
      });
      if (response.data.message && response.data.type) {
        const type = response.data.type;
        if (type === 'success') {
          goBack();
        }
        open?.({
          type: type,
          message: type === 'success' ? 'Success' : 'Warning',
          description: response.data.message,
        });
      }
    } catch (error: any) {
      open?.({
        type: 'error',
        message: 'Error',
        description: error.response.data.error,
      });
    }
  };

  return (
    <Box mt={5} borderRadius='25px' bgcolor='#fff' mx={6} px={2}>
      {student && (
        <form onSubmit={handleSubmit}>
          <Stack direction='row' gap={2} margin={2}>
            <FormControl fullWidth>
              <FormHelperText sx={style}>First Name</FormHelperText>
              <TextField
                fullWidth
                id='outlined-basic'
                color='info'
                required
                type='text'
                variant='outlined'
                name='firstName'
                onChange={handleChange}
                defaultValue={student ? student.firstName : ''}
              />
            </FormControl>
            <FormControl fullWidth>
              <FormHelperText sx={style}>Last Name</FormHelperText>
              <TextField
                fullWidth
                id='outlined-basic'
                color='info'
                required
                type='text'
                variant='outlined'
                name='lastName'
                onChange={handleChange}
                defaultValue={student ? student.lastName : ''}
              />
            </FormControl>
          </Stack>
          <Stack direction='row' gap={2} margin={2}>
            <FormControl fullWidth>
              <FormHelperText sx={style}>Email Address</FormHelperText>
              <TextField
                fullWidth
                id='outlined-basic'
                color='info'
                required
                type='email'
                variant='outlined'
                name='email'
                onChange={handleChange}
                defaultValue={student ? student.email : ''}
              />
            </FormControl>
            <FormControl fullWidth>
              <FormHelperText sx={style}>Phone Name</FormHelperText>
              <TextField
                fullWidth
                id='outlined-basic'
                color='info'
                required
                type='text'
                variant='outlined'
                name='phone'
                onChange={handleChange}
                defaultValue={student ? student.phone : ''}
              />
            </FormControl>
          </Stack>
          <Stack direction='row' gap={2} margin={2}>
            <FormControl fullWidth>
              <FormHelperText sx={style}>City</FormHelperText>
              <TextField
                fullWidth
                id='outlined-basic'
                color='info'
                required
                type='text'
                variant='outlined'
                name='city'
                onChange={handleChange}
                defaultValue={student ? student.city : ''}
              />
            </FormControl>
            <FormControl fullWidth>
              <FormHelperText sx={style}>Area</FormHelperText>
              <TextField
                fullWidth
                id='outlined-basic'
                color='info'
                required
                type='text'
                variant='outlined'
                name='area'
                onChange={handleChange}
                defaultValue={student ? student.area : ''}
              />
            </FormControl>
          </Stack>
          <Stack direction='row' gap={2} margin={2}>
            <FormControl fullWidth>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: '10px 0',
                  fontSize: 16,
                  color: '#11142d',
                }}
              >
                Update Base Hub
              </FormHelperText>
              <Select
                variant='outlined'
                color='info'
                name='hubId'
                displayEmpty
                required
                defaultValue={student ? student.hubId : ''}
                inputProps={{ 'aria-label': 'Without label' }}
                onChange={handleHubChange}
              >
                {hubs.length > 0 &&
                  hubs.map((hub: any, index: any) => (
                    <MenuItem key={index} value={hub.id}>
                      {hub.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl component='fieldset' fullWidth>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: '10px 0',
                  fontSize: 16,
                  color: '#11142d !important',
                }}
              >
                Gender
              </FormHelperText>
              <RadioGroup
                row
                aria-label='gender'
                name='gender'
                aria-required
                sx={{ mx: 0.5 }}
                defaultValue={student ? student.gender : ''}
                onChange={handleChange}
              >
                <FormControlLabel
                  value='Male'
                  control={<Radio color='info' />}
                  label='Male'
                />
                <FormControlLabel
                  value='Female'
                  control={<Radio color='info' />}
                  label='Female'
                />
                <FormControlLabel
                  value='Other'
                  control={<Radio color='info' />}
                  label='Other'
                />
              </RadioGroup>
            </FormControl>
          </Stack>
          <Box style={{ textAlign: 'center' }} marginTop={6}>
            <CustomButton
              type='submit'
              title={'Save Changes'}
              backgroundColor='#475be8'
              color='#fcfcfc'
            ></CustomButton>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default StudentUpdateForm;
