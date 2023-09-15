import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { TransitionProps } from '@mui/material/transitions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Button, Grid } from '@mui/material';
import { CloudUploadOutlined } from '@mui/icons-material';
import axios from 'axios';

import { useNotification } from '@refinedev/core';

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
}: {
  excelOpen: boolean;
  onClose: () => void;
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
      formData.append('file', selectedFile);
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
    </>
  );
}

export default ExcelDataUploadDialog;
