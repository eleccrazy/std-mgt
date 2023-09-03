import {
  Box,
  TextField,
  Typography,
  FormHelperText,
  FormControl,
} from '@mui/material';
import CustomButton from 'components/common/CustomButton';
import { FormEvent, useState } from 'react';

const style = {
  fontWeight: 800,
  margin: '10px 0',
  fontSize: 16,
  color: '#11142d',
};

function MessagesSection({ mb, mt }: { mb?: number; mt?: number }) {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(`Submitting Subject: ${subject} and Content: ${content}`);
  };

  return (
    <Box boxShadow={2} p={2} sx={{ background: '#7cabcf' }} borderRadius={2}>
      <Typography variant='h5' sx={{ color: '#fff' }} p={2}>
        Customize Messages for Sending Emails
      </Typography>
      <form
        style={{
          marginTop: '20px',
          width: '90%',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
        onSubmit={handleSubmit}
      >
        <FormControl>
          <FormHelperText sx={style}>Subject</FormHelperText>
          <TextField
            fullWidth
            id='outlined-basic'
            color='info'
            required
            type='text'
            variant='outlined'
            name='emailSubject'
            onChange={(e: any) => setSubject(e.target.value)}
            InputProps={{
              style: { color: '#11142d', background: '#c7e7ff' },
            }}
          />
        </FormControl>
        <FormControl>
          <FormHelperText sx={style}>Content</FormHelperText>
          <TextField
            fullWidth
            id='outlined-basic'
            color='info'
            required
            variant='outlined'
            type='text'
            name='emailContent'
            multiline
            rows={7}
            onChange={(e: any) => setContent(e.target.value)}
            InputProps={{
              style: { color: '#11142d', background: '#c7e7ff' }, // Change 'blue' to the desired color
            }}
          />
        </FormControl>
        <Box style={{ textAlign: 'center' }} marginTop={6}>
          <CustomButton
            type='submit'
            title={'Save Changes'}
            backgroundColor='#230563'
            color='#fcfcfc'
          ></CustomButton>
        </Box>
      </form>
    </Box>
  );
}

export default MessagesSection;
