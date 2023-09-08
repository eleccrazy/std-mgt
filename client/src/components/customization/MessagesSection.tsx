// Filename: MessagesSection.tsx
import {
  Box,
  TextField,
  Typography,
  FormHelperText,
  FormControl,
} from '@mui/material';
import CustomButton from 'components/common/CustomButton';
import { FormEvent, useState, useEffect } from 'react';
import axios from 'axios';
import { useNotification } from '@refinedev/core';

const style = {
  fontWeight: 800,
  margin: '10px 0',
  fontSize: 16,
  color: '#11142d',
};

const baseApi = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

function MessagesSection({
  mb,
  mt,
  setting,
}: {
  mb?: number;
  mt?: number;
  setting: {
    id?: string;
    password?: string;
    subject: string;
    content: string;
    sourceEmail: string;
    timeLimit?: number;
  } | null;
}) {
  const [subject, setSubject] = useState(setting ? setting.subject : '');
  const [content, setContent] = useState(setting ? setting.content : '');
  const [sourceEmail, setSourceEmail] = useState(
    setting ? setting.sourceEmail : '',
  );
  const [sourceEmailPassword, setSourceEmailPassword] = useState(
    setting ? setting.password : '',
  );
  const [timeLimit, setTimeLimit] = useState(setting ? setting.timeLimit : '');
  const [createIsSucced, setCreateIsSucced] = useState(false);
  const [id, setId] = useState(setting ? setting.id : null);

  const { open } = useNotification();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      sourceEmail,
      password: sourceEmailPassword,
      subject,
      content,
      timeLimit: parseInt(timeLimit as string),
    };
    // Check if we have a setting object, if we do, we are updating, otherwise we are creating
    if (setting || id) {
      try {
        await baseApi.patch(`/settings/${setting ? setting.id : id}`, data);
        open?.({
          type: 'success',
          message: 'Success',
          description: 'Setting updated successfully',
        });
      } catch (error: any) {
        open?.({
          type: 'error',
          message: 'Error',
          description: error.response.data.message,
        });
      }
    } else {
      try {
        const response = await baseApi.post('/settings', data);
        setId(response.data.id);
        open?.({
          type: 'success',
          message: 'Success',
          description: 'Setting created successfully',
        });
        setCreateIsSucced(true);
      } catch (error: any) {
        open?.({
          type: 'error',
          message: 'Error',
          description: error.response.data.message,
        });
      }
    }
  };

  useEffect(() => {
    if (setting) {
      setSourceEmail(setting.sourceEmail);
      setSourceEmailPassword(setting.password);
      setSubject(setting.subject);
      setContent(setting.content);
      setTimeLimit(setting.timeLimit);
      setCreateIsSucced(true);
    }
  }, [setting]);

  useEffect(() => {
    setSourceEmail(sourceEmail);
    setSourceEmailPassword(sourceEmailPassword);
    setSubject(subject);
    setContent(content);
    setTimeLimit(timeLimit);
  }, [createIsSucced]);

  return (
    <Box boxShadow={2} p={2} sx={{ background: '#7cabcf' }} borderRadius={2}>
      <Typography variant='h5' sx={{ color: '#fff' }} p={2}>
        Customize Email Credentials, Subject, Content, and Time Limit
      </Typography>
      <form
        style={{
          marginTop: '20px',
          width: '95%',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
        onSubmit={handleSubmit}
      >
        <FormControl>
          <FormHelperText sx={style}>Source Email</FormHelperText>
          <TextField
            fullWidth
            id='sourceEmail'
            color='info'
            required
            type='email'
            variant='outlined'
            name='sourceEmail'
            autoComplete='email'
            value={sourceEmail}
            onChange={(e: any) => setSourceEmail(e.target.value)}
            InputProps={{
              style: { color: '#11142d', background: '#c7e7ff' },
            }}
          />
        </FormControl>
        <FormControl>
          <FormHelperText sx={style}>Source Email Password</FormHelperText>
          <TextField
            fullWidth
            id='sourceEmailPassword'
            color='info'
            required
            type='password'
            variant='outlined'
            name='sourceEmailPassword'
            autoComplete='current-password'
            value={sourceEmailPassword}
            onChange={(e: any) => setSourceEmailPassword(e.target.value)}
            InputProps={{
              style: { color: '#11142d', background: '#c7e7ff' },
            }}
          />
        </FormControl>
        <FormControl>
          <FormHelperText sx={style}>Subject</FormHelperText>
          <TextField
            fullWidth
            id='subject'
            color='info'
            required
            type='text'
            variant='outlined'
            name='emailSubject'
            value={subject}
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
            id='content'
            color='info'
            required
            variant='outlined'
            type='text'
            name='emailContent'
            value={content}
            multiline
            rows={7}
            onChange={(e: any) => setContent(e.target.value)}
            InputProps={{
              style: { color: '#11142d', background: '#c7e7ff' }, // Change 'blue' to the desired color
            }}
          />
        </FormControl>
        <FormControl>
          <FormHelperText sx={style}>Time Limit in Hours</FormHelperText>
          <TextField
            fullWidth
            id='timeLimit'
            color='info'
            required
            type='number'
            variant='outlined'
            name='timeLimit'
            value={timeLimit}
            onChange={(e: any) => setTimeLimit(e.target.value)}
            InputProps={{
              style: { color: '#11142d', background: '#c7e7ff' },
            }}
          />
        </FormControl>
        <Box style={{ textAlign: 'center' }} marginTop={6}>
          <CustomButton
            type='submit'
            title={createIsSucced ? 'Save Changes' : 'Create'}
            backgroundColor='#230563'
            color='#fcfcfc'
          ></CustomButton>
        </Box>
      </form>
    </Box>
  );
}

export default MessagesSection;
