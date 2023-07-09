import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { TransitionProps } from '@mui/material/transitions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Button, Grid } from '@mui/material';
import { CloudUploadOutlined } from '@mui/icons-material';

import excelProcessor from 'utils/processExcelData';
import { StudentDataRegister } from 'interfaces/student';
import axios from 'axios';

import { read, utils } from 'xlsx';

// Function to validate if the data from the excel file is valid
function isStudentDataArray(array: any[]): array is StudentDataRegister[] {
  if (!Array.isArray(array)) {
    return false;
  }

  return array.every((element) => {
    return (
      typeof element === 'object' &&
      'firstName' in element &&
      'lastName' in element &&
      'email' in element &&
      'phone' in element &&
      'program' in element &&
      'cohort' in element &&
      typeof element.firstName === 'string' &&
      typeof element.lastName === 'string' &&
      typeof element.program === 'string' &&
      typeof element.email === 'string' &&
      typeof element.cohort === 'string' &&
      typeof element.phone === 'string'
    );
  });
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='down' ref={ref} {...props} />;
});

function ExcelDataUploadDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

  const handleUploadClick = () => {
    if (!selectedFile) {
      return;
    }
    const reader = new FileReader();

    reader.onload = async (e) => {
      const data = e.target?.result;
      const workbook = read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = utils.sheet_to_json(worksheet);
      console.log(jsonData);
      if (!jsonData || !Array.isArray(jsonData)) {
        return;
      }
      if (!isStudentDataArray(jsonData)) {
        alert('Invalid Excel File');
      } else {
        const result = excelProcessor(jsonData);

        if (result) {
          alert(result);
          return;
        }
        // Iterate over each student's data and send it to the API endpoint
        for (const studentData of jsonData) {
          try {
            const response = await axios.post(
              'http://localhost:3000/api/v1/students',
              studentData,
            );
            console.log('API Response:', response);
          } catch (error: any) {
            console.error('API Error:', error.response.data.error);
          }
        }
      }
    };
    reader.readAsBinaryString(selectedFile);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby='alert-dialog-slide-description'
    >
      <DialogTitle> Upload the Excel file below</DialogTitle>
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
            <Button
              variant='contained'
              color='primary'
              startIcon={<CloudUploadOutlined />}
              onClick={handleUploadClick}
              disabled={!selectedFile}
            >
              Uplaod File
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ExcelDataUploadDialog;
