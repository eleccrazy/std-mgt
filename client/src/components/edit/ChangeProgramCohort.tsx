import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Stack,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
} from '@mui/material';
import CustomButton from 'components/common/CustomButton';
import { SelectChangeEvent } from '@mui/material';
import { FormEvent } from 'react';
import StudentData from 'interfaces/student';
import axios from 'axios';
import { useNotification, useNavigation } from '@refinedev/core';

interface ChangeProgramCohortProps {
  programs: string[];
  cohorts: string[];
  student: StudentData;
}

interface FormData {
  porgramId: string;
  cohortId: string;
}

function ChangeProgramCohort({
  programs,
  cohorts,
  student,
}: ChangeProgramCohortProps) {
  // Handle student cohort change on the form according to the corresponding program change
  const [filteredCohorts, setFilteredCohorts] = useState(['']);
  const [programId, setProgramId] = useState(student.programId);
  const [cohortId, setCohortId] = useState(student.cohortId);
  const [programName, setProgramName] = useState('');
  const [cohortName, setCohortName] = useState('');

  const { open } = useNotification();
  const { goBack } = useNavigation();

  // Create the base axios api endpoint for fetching our data
  const api = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
  });

  const handleProgramChange = (event: SelectChangeEvent<string>) => {
    setProgramId(event.target.value);
  };

  const handleCohortChange = (event: SelectChangeEvent<string>) => {
    setCohortId(event.target.value);
  };

  useEffect(() => {
    async function getCohortName() {
      try {
        const cohort = await api.get(`/cohorts/${student.cohortId}`);
        setCohortName(cohort.data.name);
      } catch (error) {
        console.log(error);
      }
    }
    async function getProgramName() {
      try {
        const program = await api.get(`/programs/${student.programId}`);
        setProgramName(program.data.name);
      } catch (error) {
        console.log(error);
      }
    }

    getCohortName();
    getProgramName();
  }, []);

  // Use the useEffect hook to change the value of the cohorts depending on the associated program
  useEffect(() => {
    const filtered = cohorts.filter(
      (cohort: any) => cohort.programId === programId,
    );
    setFilteredCohorts(filtered);
  }, [programId]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Filter only changed data so that we don't send unecessary data to the server to update.
    const filteredFormData = Object.entries({
      cohortId: cohortId,
      programId: programId,
    }).reduce((acc: Record<string, string>, [key, value]) => {
      if (student && student[key as keyof StudentData] !== value) {
        acc[key] = value;
      }
      return acc;
    }, {} as Partial<FormData>);
    try {
      const cohort = await api.get(`/cohorts/${cohortId}`);
      if (cohort.data.programId !== programId) {
        open?.({
          type: 'error',
          message: 'Error',
          description: 'Please select the matched cohort',
        });
      } else {
        const response = await api.put(`/students/${student?.id}`, {
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
    <Box sx={{ textAlign: 'center' }}>
      <Card sx={{ boxShadow: 'none' }}>
        <CardHeader
          title='Current Programme and Cohort Details'
          sx={{ textAlign: 'center' }}
        />
        <CardContent>
          <Typography>
            <span style={{ fontWeight: 700 }}>Programme: </span> {programName}
          </Typography>
          <Typography>
            <span style={{ fontWeight: 700 }}>Cohort: </span>
            {cohortName}
          </Typography>
        </CardContent>
        <CardContent>
          <Box mt={5} borderRadius='25px' bgcolor='#fff' mx={6} px={2}>
            <form onSubmit={handleSubmit}>
              <Stack direction='row' gap={2} margin={2}>
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
                    inputProps={{ 'aria-label': 'Without label' }}
                    name='programId'
                    defaultValue={student ? student.programId : ''}
                    onChange={handleProgramChange}
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
                <FormControl sx={{ flex: 1 }}>
                  <FormHelperText
                    sx={{
                      fontWeight: 500,
                      margin: '10px 0',
                      fontSize: 16,
                      color: '#11142d',
                      textAlign: 'center',
                    }}
                  >
                    Select Cohort
                  </FormHelperText>
                  <Select
                    variant='outlined'
                    color='info'
                    displayEmpty
                    required
                    defaultValue={student ? student.cohortId : ''}
                    inputProps={{ 'aria-label': 'Without label' }}
                    onChange={handleCohortChange}
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
              </Stack>
              <Box style={{ textAlign: 'center' }} marginTop={6}>
                <CustomButton
                  type='submit'
                  title={'Save Changes'}
                  backgroundColor='#475be8'
                  color='#fcfcfc'
                />
              </Box>
            </form>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ChangeProgramCohort;
