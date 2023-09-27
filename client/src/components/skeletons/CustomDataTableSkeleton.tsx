import React from 'react';
import {
  Box,
  Stack,
  TextField,
  MenuItem,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Skeleton,
  Typography,
} from '@mui/material';

const CustomDataTableSkeleton = () => {
  const rowsPerPageOptions = [5, 10, 25];
  const rowsPerPage = 10;
  const page = 0;

  const handleChangePage = () => {
    // Handle change page
  };

  const handleChangeRowsPerPage = () => {
    // Handle change rows per page
  };

  return (
    <Box mt={2.5} borderRadius='25px' padding='20px' bgcolor='#fcfcfc' mx={6}>
      <Stack
        mx={5}
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        gap={4}
      >
        <TextField
          select
          label='Filter by'
          value=''
          fullWidth
          sx={{ mb: 2 }}
          disabled
        >
          <MenuItem value='email'>Email Address</MenuItem>
          <MenuItem value='firstName'>First Name</MenuItem>
          <MenuItem value='phone'>Phone Number</MenuItem>
        </TextField>
        <TextField
          label={`Filter by `}
          value=''
          fullWidth
          sx={{ mb: 2 }}
          disabled
        />
      </Stack>

      <TableContainer component={Paper} sx={{ background: '#E3F0F9' }}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead sx={{ background: '#92C4E7' }}>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell align='left' sx={{ fontWeight: 700 }}>
                Last Name
              </TableCell>
              <TableCell align='left' sx={{ fontWeight: 700 }}>
                Email Address
              </TableCell>
              <TableCell align='left' sx={{ fontWeight: 700 }}>
                Phone Number
              </TableCell>
              <TableCell align='left' sx={{ fontWeight: 700 }}>
                Gender
              </TableCell>
              <TableCell align='left' sx={{ fontWeight: 700 }}>
                Status
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 700 }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from(Array(7).keys()).map((index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton />
                </TableCell>
                <TableCell align='left'>
                  <Skeleton />
                </TableCell>
                <TableCell align='left'>
                  <Skeleton />
                </TableCell>
                <TableCell align='left'>
                  <Skeleton />
                </TableCell>
                <TableCell align='left'>
                  <Skeleton />
                </TableCell>
                <TableCell align='left'>
                  <Skeleton />
                </TableCell>
                <TableCell align='center'>
                  <Skeleton variant='circular' width={40} height={40} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          sx={{ background: '#92C4E7' }}
          rowsPerPageOptions={rowsPerPageOptions}
          component='div'
          count={rowsPerPage * page}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default CustomDataTableSkeleton;
