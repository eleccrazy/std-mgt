import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { AttendanceData } from 'components/details/StudentAttendanceDetailsDialog';

const columns: GridColDef[] = [
  { field: 'date', headerName: 'Date', width: 130 },
  { field: 'checkInTime', headerName: 'Check In Time', width: 130 },
  { field: 'checkOutTime', headerName: 'Check Out Time', width: 130 },
  { field: 'totalHoursSpent', headerName: 'Hours Spent', width: 130 },
];

function AttendanceDataTable({ rows }: { rows: AttendanceData[] }) {
  return (
    <div style={{ height: 400, width: '100%' }}>
      {rows && (
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
          localeText={{
            noRowsLabel: 'No attendance records yet!',
          }}
        />
      )}
    </div>
  );
}

export default AttendanceDataTable;
