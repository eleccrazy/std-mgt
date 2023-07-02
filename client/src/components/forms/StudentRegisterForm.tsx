import { StudentRegisterFormProps } from 'interfaces/common';
import {
  Box,
  Typography,
  FormControl,
  FormHelperText,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  Select,
  MenuItem,
} from '@mui/material';
import CustomButton from 'components/common/CustomButton';
import { useEffect, useState } from 'react';

const StudentRegisterForm = ({
  type,
  register,
  formLoading,
  handleSubmit,
  onFinishHandler,
  programs,
  hubs,
  cohorts,
  watch,
}: StudentRegisterFormProps) => {
  const programId = watch('programId');

  // Handle student cohort change on the form according to the corresponding program change
  const [filteredCohorts, setFilteredCohorts] = useState(['']);
  // Use the useEffect hook to change the value of the cohorts depending on the associated program
  useEffect(() => {
    const filtered = cohorts.filter(
      (cohort: any) => cohort.programId === programId,
    );
    setFilteredCohorts(filtered);
  }, [programId]);

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color='#11142d'>
        {type} a student
      </Typography>
      <Box mt={2.5} borderRadius='25px' padding='20px' bgcolor='#fcfcfc' mx={6}>
        <form
          style={{
            marginTop: '20px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
          onSubmit={handleSubmit(onFinishHandler)}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '20px',
            }}
          >
            <FormControl>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: '10px 0',
                  fontSize: 16,
                  color: '#11142d',
                }}
              >
                First Name
              </FormHelperText>
              <TextField
                fullWidth
                id='outlined-basic'
                color='info'
                required
                type='text'
                variant='outlined'
                name='firstName'
                {...register('firstName', { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: '10px 0',
                  fontSize: 16,
                  color: '#11142d',
                }}
              >
                Last Name
              </FormHelperText>
              <TextField
                fullWidth
                id='outlined-basic'
                color='info'
                required
                variant='outlined'
                type='text'
                name='lastName'
                {...register('lastName', { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: '10px 0',
                  fontSize: 16,
                  color: '#11142d',
                }}
              >
                Email
              </FormHelperText>
              <TextField
                fullWidth
                id='outlined-basic'
                color='info'
                variant='outlined'
                type='email'
                required
                name='email'
                {...register('email', { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: '10px 0',
                  fontSize: 16,
                  color: '#11142d',
                }}
              >
                Phone Number
              </FormHelperText>
              <TextField
                fullWidth
                placeholder='e.g. +251....'
                id='outlined-basic'
                color='info'
                required
                type='text'
                variant='outlined'
                name='phone'
                {...register('phone', { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: '10px 0',
                  fontSize: 16,
                  color: '#11142d',
                }}
              >
                City
              </FormHelperText>
              <TextField
                fullWidth
                id='outlined-basic'
                color='info'
                required
                type='text'
                variant='outlined'
                name='city'
                {...register('city', { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: '10px 0',
                  fontSize: 16,
                  color: '#11142d',
                }}
              >
                Area
              </FormHelperText>
              <TextField
                fullWidth
                id='outlined-basic'
                color='info'
                variant='outlined'
                type='text'
                required
                name='area'
                {...register('area', { required: true })}
              />
            </FormControl>
            <FormControl sx={{ flex: 1 }}>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: '10px 0',
                  fontSize: 16,
                  color: '#11142d',
                }}
              >
                Select Program
              </FormHelperText>
              <Select
                variant='outlined'
                color='info'
                displayEmpty
                required
                defaultValue=''
                inputProps={{ 'aria-label': 'Without label' }}
                name='programId'
                {...register('programId', { required: true })}
              >
                <MenuItem value='' disabled>
                  Select Here
                </MenuItem>
                {programs.length > 0 &&
                  programs.map((program: any, index) => (
                    <MenuItem key={index} value={program.id}>
                      {program.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl component='fieldset'>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: '10px 0',
                  fontSize: 16,
                  color: '#11142d',
                }}
              >
                Gender
              </FormHelperText>
              <RadioGroup
                row
                aria-label='gender'
                name='gender'
                required
                {...register('gender', { required: true })}
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
              </RadioGroup>
            </FormControl>
            <FormControl sx={{ flex: 1 }}>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: '10px 0',
                  fontSize: 16,
                  color: '#11142d',
                }}
              >
                Select Cohort
              </FormHelperText>
              <Select
                variant='outlined'
                color='info'
                displayEmpty
                required
                defaultValue=''
                inputProps={{ 'aria-label': 'Without label' }}
                {...register('cohortId', { required: true })}
              >
                <MenuItem value='' disabled>
                  Select Here
                </MenuItem>
                {filteredCohorts.length > 0 &&
                  filteredCohorts.map((cohort: any, index) => (
                    <MenuItem key={index} value={cohort.id}>
                      {cohort.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl sx={{ flex: 1 }}>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: '10px 0',
                  fontSize: 16,
                  color: '#11142d',
                }}
              >
                Select Base Hub
              </FormHelperText>
              <Select
                variant='outlined'
                color='info'
                displayEmpty
                required
                defaultValue=''
                inputProps={{ 'aria-label': 'Without label' }}
                {...register('hubId', { required: true })}
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
          </div>
          <Box style={{ textAlign: 'center' }} marginTop={6}>
            <CustomButton
              type='submit'
              title={formLoading ? 'Submitting....' : 'Submit'}
              backgroundColor='#475be8'
              color='#fcfcfc'
            ></CustomButton>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default StudentRegisterForm;
