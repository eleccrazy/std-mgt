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
  Skeleton,
} from '@mui/material';
import CustomButton from 'components/common/CustomButton';
import { SelectChangeEvent } from '@mui/material';
import { FormEvent } from 'react';
import StudentData from 'interfaces/student';
import axios from 'axios';
import { useNotification, useNavigation } from '@refinedev/core';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import ConfirmationDialog from 'components/common/ConfirmationDialog';
import BASE_API_URL from 'config';
import CustomSpinner from 'components/common/CustomSpinner';

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
  const [programId, setProgramId] = useState(student.program.id);
  const [cohortId, setCohortId] = useState(student.cohort.id);
  const [programName, setProgramName] = useState('');
  const [cohortName, setCohortName] = useState('');
  const [isProgramCompleted, setIsProgramCompleted] = useState(false);
  const [isCohortCompleted, setIsCohortCompleted] = useState(false);
  const [isChangingLoading, setIsChanginLoading] = useState(false);
  const [isPromotingLoading, setIsPromotingLoading] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);

  const { open } = useNotification();
  const { goBack, push } = useNavigation();

  // Create the base axios api endpoint for fetching our data
  const api = axios.create({
    baseURL: BASE_API_URL,
  });

  const handleProgramChange = (event: SelectChangeEvent<string>) => {
    setProgramId(event.target.value);
  };

  const handleCohortChange = (event: SelectChangeEvent<string>) => {
    setCohortId(event.target.value);
  };

  const handlePromoteClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handlePromote = async () => {
    setOpenDialog(false);

    try {
      setIsPromotingLoading(true);
      const response = await api.patch(`/students/${student?.id}/promote`, {
        isAlumni: !student.isAlumni,
      });
      setIsPromotingLoading(false);
      if (response.status === 200) {
        push(student.isAlumni ? '/learners' : '/guests');
      }
      open?.({
        type: 'success',
        message: 'Success',
        description: response.data.message,
      });
    } catch (error: any) {
      setIsPromotingLoading(false);
      open?.({
        type: 'error',
        message: 'Error',
        description: error.response.data.error,
      });
    }
  };

  useEffect(() => {
    async function getCohortName() {
      try {
        const cohort = await api.get(`/cohorts/${student.cohort.id}`);
        setCohortName(cohort.data.name);
        setIsCohortCompleted(true);
      } catch (error) {}
    }
    async function getProgramName() {
      try {
        const program = await api.get(`/programs/${student.program.id}`);
        setProgramName(program.data.name);
        setIsProgramCompleted(true);
      } catch (error) {}
    }

    getCohortName();
    getProgramName();
  }, []);

  // Use the useEffect hook to change the value of the cohorts depending on the associated program
  useEffect(() => {
    const filtered = cohorts.filter(
      (cohort: any) => cohort.program.id === programId,
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
      setIsChanginLoading(true);
      const cohort = await api.get(`/cohorts/${cohortId}`);
      if (cohort.data.program.id !== programId) {
        setIsChanginLoading(false);
        open?.({
          type: 'error',
          message: 'Error',
          description: 'Please select the matched cohort',
        });
      } else {
        const response = await api.patch(
          `/students/${student?.id}/change-program-cohort`,
          {
            ...filteredFormData,
          },
        );
        setIsChanginLoading(false);
        if (response.status === 200) {
          goBack();
        }
        open?.({
          type: 'success',
          message: 'Success',
          description: 'Successfully Updated',
        });
      }
    } catch (error: any) {
      setIsChanginLoading(false);
      open?.({
        type: 'error',
        message: 'Error',
        description: error.response.data.message,
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
          {isCohortCompleted && isProgramCompleted ? (
            <>
              <Typography>
                <span style={{ fontWeight: 700 }}>Programme: </span>{' '}
                {programName}
              </Typography>
              <Typography>
                <span style={{ fontWeight: 700 }}>Cohort: </span>
                {cohortName}
              </Typography>
            </>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Skeleton style={{ width: 320 }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Skeleton style={{ width: 150 }} />
              </div>
            </>
          )}
        </CardContent>
        <CardContent sx={{ textAlign: 'right' }}>
          <CustomButton
            type='button'
            title={student.isAlumni ? 'Promote to Student' : 'Promote to Guest'}
            backgroundColor='#edf5ee'
            color='#070808'
            icon={<ChangeCircleIcon />}
            handleClick={handlePromoteClick}
          />
          <ConfirmationDialog
            dialogTitle='Are you sure you want to promote?'
            dialogDescription='Warning: Proceeding with this action will change the attendees status
          from a student to a guest or vice versa. This action can be undone
          later if needed. However, please note that it moves attendees from
          students list to guests and viceversa.'
            open={openDialog}
            handleClose={handleCloseDialog}
            handleConfirm={handlePromote}
          />
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
                    defaultValue={student ? student.program.id : ''}
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
                    defaultValue={student ? student.cohort.id : ''}
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
      <CustomSpinner
        isLoading={isChangingLoading || isPromotingLoading}
        color='#174281'
        size={40}
        background='no'
      />
    </Box>
  );
}

export default ChangeProgramCohort;
