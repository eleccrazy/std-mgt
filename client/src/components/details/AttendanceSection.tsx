import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  CardHeader,
} from '@mui/material';
import CustomButton from 'components/common/CustomButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const AttendanceSection = () => {
  return (
    <Card sx={{ minWidth: 275, boxShadow: 'none' }}>
      <CardHeader
        title='Attendance Informtion'
        sx={{ display: 'flex', justifyContent: 'space-between' }}
        action={
          <CustomButton
            title='Check In/Out'
            handleClick={() => {
              alert('Check In Check Out Students');
            }}
            backgroundColor='transparent'
            color='#3fa164'
            icon={<CheckCircleOutlineIcon />}
          />
        }
      />
      <CardContent></CardContent>
      <CardActions>
        <Button size='small'>Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default AttendanceSection;
