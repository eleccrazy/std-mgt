import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { TransitionProps } from '@mui/material/transitions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Button, Grid } from '@mui/material';
import { CloudUploadOutlined } from '@mui/icons-material';
import axios from 'axios';
import {
  Box,
  FormHelperText,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';

import { useNotification } from '@refinedev/core';
import { ProgramType, CohortType } from 'interfaces/common';

const style = {
  fontWeight: 500,
  fontSize: 16,
  margin: '10px 0',
  color: '#11142d',
};

const api = axios.create({
  baseURL: `http://localhost:3000/api/v1/students`,
});

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='down' ref={ref} {...props} />;
});

function ExcelDataUploadDialog({
  excelOpen,
  onClose,
  programs,
  cohorts,
  isGuest,
}: {
  excelOpen: boolean;
  onClose: () => void;
  programs: ProgramType[];
  cohorts: CohortType[];
  isGuest: boolean;
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [programId, setProgramId] = useState('');
  const [cohortId, setCohortId] = useState('');
  const [filteredCohorts, setFilteredCohorts] = useState<CohortType[]>([]);
  const { open } = useNotification();
  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files ? event?.target.files[0] : null;
    if (file && !file.name.endsWith('.xls') && !file.name.endsWith('.xlsx')) {
      setSelectedFile(null);
      alert('Please Select an Excel file.');
    } else {
      setSelectedFile(file);
    }
  };

  const handleUploadClick = async () => {
    if (!selectedFile) {
      return;
    }
    onClose();
    // Send the excel file to the backend server.
    try {
      const formData = new FormData();
      const isAlumni = isGuest ? 'yes' : 'no';
      formData.append('file', selectedFile);
      formData.append('programId', programId);
      formData.append('cohortId', cohortId);
      formData.append('isAlumni', isAlumni);

      console.log(formData.get('isAlumni'));

      const response = await api.post('/excel', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      open?.({
        type: 'success',
        message: 'Success',
        description: 'All students registered successfully!',
      });
    } catch (error: any) {
      open?.({
        type: 'error',
        message: 'Error',
        description: error.response.data.message,
      });
    }
  };

  // Use the useEffect hook to change the value of the cohorts depending on the associated program
  useEffect(() => {
    const filtered = cohorts.filter(
      (cohort: any) => cohort.program.id === programId,
    );
    setFilteredCohorts(filtered);
  }, [programId]);

  return (
    <>
      <Dialog
        open={excelOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>Upload the Excel file below (.xls or .xlsx)</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <input
                type='file'
                accept='.xls,.xlsx'
                onChange={handleFileInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '20px',
                }}
              >
                <FormControl sx={{ flex: 1 }}>
                  <FormHelperText style={style}>
                    Select Program <span style={{ color: 'red' }}>*</span>
                  </FormHelperText>
                  <Select
                    variant='outlined'
                    color='info'
                    displayEmpty
                    required
                    name='programId'
                    defaultValue=''
                    inputProps={{ 'aria-label': 'Without label' }}
                    onChange={(e) => setProgramId(e.target.value)}
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
                  <FormHelperText style={style}>
                    Select Cohort <span style={{ color: 'red' }}>*</span>
                  </FormHelperText>
                  <Select
                    variant='outlined'
                    color='info'
                    displayEmpty
                    required
                    name='cohortId'
                    defaultValue=''
                    inputProps={{ 'aria-label': 'Without label' }}
                    onChange={(e) => setCohortId(e.target.value)}
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
              </div>
            </Grid>
            <Grid item xs={12}>
              <Box style={{ textAlign: 'center' }} marginTop={3}>
                <Button
                  variant='contained'
                  color='primary'
                  startIcon={<CloudUploadOutlined />}
                  onClick={handleUploadClick}
                  disabled={!selectedFile || !programId || !cohortId}
                >
                  Uplaod File
                </Button>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={onClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ExcelDataUploadDialog;
