import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  CardHeader,
  Grid,
} from '@mui/material';
import CustomButton from 'components/common/CustomButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoCard from 'components/common/InfoCard';
import StudentAttendanceGraph from 'components/charts/StudentAttendanceGraph';

const CustomAttendanceInfo = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => {
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      xl={3}
      display='flex'
      flexWrap='wrap'
    >
      <InfoCard title={title} value={value} />
    </Grid>
  );
};

const AttendanceSection = () => {
  return (
    <Card sx={{ minWidth: 275, boxShadow: 'none' }}>
      <CardHeader
        title='Attendance Information'
        sx={{ display: 'flex', justifyContent: 'space-between' }}
        action={
          <CustomButton
            title='Check In/Out'
            handleClick={() => {
              alert('Check In Check Out Students');
            }}
            backgroundColor='#f5f5f5'
            color='#3fa164'
            icon={<CheckCircleOutlineIcon />}
          />
        }
      />
      <CardContent>
        <Box mt='20px'>
          <Grid container spacing={4}>
            <CustomAttendanceInfo title='Total Attendances' value='56' />
            <CustomAttendanceInfo title='Total hours Spent' value='233 hours' />
            <CustomAttendanceInfo title='Current Week Attendances' value='4' />
            <CustomAttendanceInfo
              title='Current Week total hours'
              value='6 hours'
            />
            <CustomAttendanceInfo
              title='Average hours per Week'
              value='6.8 hours'
            />
            <CustomAttendanceInfo
              title='Average hours per month'
              value='35.78 hours'
            />
            <CustomAttendanceInfo
              title='Status'
              value='Checked In @ CapStone'
            />
          </Grid>
        </Box>
        <Box mt='20px'>
          <StudentAttendanceGraph />
        </Box>
      </CardContent>
      <CardActions>
        <Button size='medium' style={{ textTransform: 'none' }}>
          Get More Information
        </Button>
      </CardActions>
    </Card>
  );
};

export default AttendanceSection;
