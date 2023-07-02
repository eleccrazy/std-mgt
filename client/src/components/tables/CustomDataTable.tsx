import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { Box, Stack, Tooltip, Typography } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import { useNavigation } from '@refinedev/core';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const rowsPerPageOptions = [10, 20, 30];

export default function CustomDataTable({ rows }: any) {
  const navigation = useNavigation();
  const [filter, setFilter] = React.useState('');
  const [filterBy, setFilterBy] = React.useState('email');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const filteredRows =
    rows.length > 0 &&
    rows.filter((row: any) =>
      row[filterBy].toLowerCase().includes(filter.toLowerCase()),
    );

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClick = (id: string, isAlumni: boolean) => {
    if (isAlumni) {
      navigation.push(`/guests/show?id=${id}`);
    } else {
      navigation.push(`/students/show?id=${id}`);
    }
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
          value={filterBy}
          onChange={(event) => setFilterBy(event.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value='email'>Email Address</MenuItem>
          <MenuItem value='firstName'>First Name</MenuItem>
          <MenuItem value='phone'>Phone Number</MenuItem>
        </TextField>
        <TextField
          label={`Filter by ${filterBy}`}
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
      </Stack>

      <TableContainer component={Paper} sx={{ background: '#e6f5f7' }}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead sx={{ background: '#abebc9' }}>
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
                Program
              </TableCell>
              <TableCell align='left' sx={{ fontWeight: 700 }}>
                Preferred Hub
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 700 }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows &&
              filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any) => (
                  <TableRow
                    key={row.email}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component='th' scope='row'>
                      {row.firstName}
                    </TableCell>
                    <TableCell align='left'>{row.lastName}</TableCell>
                    <TableCell align='left'>{row.email}</TableCell>
                    <TableCell align='left'>{row.phone}</TableCell>
                    <TableCell align='left'>{row.gender}</TableCell>
                    <TableCell align='left'>{row.program}</TableCell>
                    <TableCell align='left'>{row.hub}</TableCell>
                    <TableCell align='center'>
                      <Tooltip
                        title={
                          <Typography
                            sx={{ color: '#03fca1', bgcolor: 'none' }}
                          >
                            Check-in Action
                          </Typography>
                        }
                        placement='top'
                        sx={{ color: 'green' }}
                      >
                        <IconButton
                          onClick={() => handleClick(row.id, row.isAlumni)}
                        >
                          <CheckCircleOutlineIcon />
                        </IconButton>
                      </Tooltip>
                      <IconButton
                        onClick={() => handleClick(row.id, row.isAlumni)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        {filteredRows.length > 0 && (
          <TablePagination
            sx={{ background: '#abebc9' }}
            rowsPerPageOptions={rowsPerPageOptions}
            component='div'
            count={filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </TableContainer>
    </Box>
  );
}
