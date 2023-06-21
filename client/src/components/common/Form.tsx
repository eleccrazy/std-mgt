import { FormProps } from 'interfaces/common';
import {
  Box,
  Typography,
  Stack,
  FormControl,
  FormHelperText,
  TextField,
  TextareaAutosize,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import CustomButton from './CustomButton';

const Form = ({
  type,
  register,
  onFinish,
  formLoading,
  handleSubmit,
  onFinishHandler,
}: FormProps) => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color='#11142d'>
        {type} a student
      </Typography>
      <Box
        mt={2.5}
        borderRadius='25px'
        padding='20px'
        bgcolor='#fcfcfc'
        width='50%'
      >
        <form
          style={{
            marginTop: '20px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '1px',
          }}
          onSubmit={handleSubmit(onFinishHandler)}
        >
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: '10px 0',
                fontSize: 16,
                color: '#11142d',
              }}
            >
              First Name
            </FormHelperText>
            <TextField
              fullWidth
              id='outlined-basic'
              color='info'
              type='text'
              variant='outlined'
              {...(register('firstName'), { required: true })}
            />
          </FormControl>
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: '10px 0',
                fontSize: 16,
                color: '#11142d',
              }}
            >
              Last Name
            </FormHelperText>
            <TextField
              fullWidth
              id='outlined-basic'
              color='info'
              type='text'
              variant='outlined'
              {...(register('lastName'), { required: true })}
            />
          </FormControl>
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: '10px 0',
                fontSize: 16,
                color: '#11142d',
              }}
            >
              Email
            </FormHelperText>
            <TextField
              fullWidth
              id='outlined-basic'
              color='info'
              variant='outlined'
              type='email'
              {...(register('email'), { required: true })}
            />
          </FormControl>
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: '10px 0',
                fontSize: 16,
                color: '#11142d',
              }}
            >
              Phone Number
            </FormHelperText>
            <TextField
              fullWidth
              id='outlined-basic'
              color='info'
              type='text'
              variant='outlined'
              {...(register('phone'), { required: true })}
            />
          </FormControl>
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: '10px 0',
                fontSize: 16,
                color: '#11142d',
              }}
            >
              City
            </FormHelperText>
            <TextField
              fullWidth
              id='outlined-basic'
              color='info'
              type='text'
              variant='outlined'
              {...(register('city'), { required: true })}
            />
          </FormControl>
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: '10px 0',
                fontSize: 16,
                color: '#11142d',
              }}
            >
              Area
            </FormHelperText>
            <TextField
              fullWidth
              id='outlined-basic'
              color='info'
              variant='outlined'
              {...(register('area'), { required: true })}
            />
          </FormControl>
        </form>
      </Box>
    </Box>
  );
};

export default Form;
