import React, { useState, useRef } from 'react';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';
import { useNotification, useNavigation } from '@refinedev/core';
import { Box, Stack, Typography } from '@mui/material';
import receptionArt from '../assets/ALX Reception Art.png';
import BASE_API_URL from 'config';

// Define base api endpoint
const api = axios.create({
  baseURL: BASE_API_URL,
});

const ScannerPage = () => {
  const { open } = useNotification();
  const { push } = useNavigation();
  const scanCompleteRef = useRef(false); // Flag to track scan completion

  const admin = localStorage.getItem('admin');
  const user = admin ? JSON.parse(admin) : null;

  const handleScan = async (data: any) => {
    if (data && !scanCompleteRef.current) {
      // Set the flag to true to prevent multiple scans
      scanCompleteRef.current = true;
      try {
        // Get the student first
        const student = await api.get(`/students/${data}`);
        const { data: studentData } = student;
        const hubId = user ? user?.hub.id : null;
        try {
          const message = studentData.attendanceId ? 'Out' : 'In';
          // If the student is checked in, check them out, otherwise check them in.
          const attendance = !studentData.attendanceId
            ? await api.post('attendances/check-in', {
                studentId: studentData.id,
                hubId: hubId,
              })
            : await api.patch(
                `attendances/${studentData.attendanceId}/check-out`,
                {
                  studentId: studentData.id,
                },
              );
          if (attendance.status === 201 || attendance.status === 200) {
            open?.({
              type: 'success',
              message: 'Success',
              description: `Student Checked ${message} Successfully`,
            });
            push(
              studentData.isAlumni
                ? `/guests/show?id=${studentData.id}`
                : `/learners/show?id=${studentData.id}`,
            );
          }
        } catch (error: any) {
          open?.({
            type: 'error',
            message: 'Error',
            description: error.response.data.error,
          });
          scanCompleteRef.current = false;
        }
      } catch (error: any) {
        open?.({
          type: 'error',
          message: 'Error',
          description: 'Invalid QR Code',
        });
        // Reset the flag to false to allow scanning again
        scanCompleteRef.current = false;
      }
    }
  };
  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        marginTop: '30px',
      }}
    >
      <Stack
        mt='25px'
        width='100%'
        direction={{ xs: 'column', lg: 'row' }}
        gap={4}
      >
        <Box
          p={4}
          flex={4}
          bgcolor={'#fcfcfc'}
          id='chart'
          display='flex'
          flexDirection='column'
          borderRadius='15px'
        >
          <img
            alt='ALX Reception Art'
            src={receptionArt}
            width='100%'
            height='100%'
          />
        </Box>
        <Box
          p={4}
          flex={4}
          bgcolor={'#fcfcfc'}
          display='flex'
          flexDirection='column'
          borderRadius='15px'
        >
          <Box
            bgcolor={'#174281'}
            color='white'
            display='flex'
            justifyContent='center'
          >
            <Typography m={3} variant='h6'>
              Please place the QR Code in front of the camera
            </Typography>
          </Box>
          <QrReader
            onResult={(result: any, error: any) => {
              if (result && !scanCompleteRef.current) {
                handleScan(result?.getText());
              }
            }}
            constraints={{
              facingMode: 'environment',
              width: 300,
              height: 300,
              frameRate: 30,
              aspectRatio: 1.777777778,
            }}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default ScannerPage;
