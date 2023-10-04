import { useState } from 'react';
import { useLogin } from '@refinedev/core';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { TextField, Button, Grid } from '@mui/material';
import loginArt from '../assets/login.jpg';
import CustomSpinner from 'components/common/CustomSpinner';

import { alx } from 'assets';

const LoginPage: React.FC = () => {
  const { mutate: login, isLoading } = useLogin<{
    email: string;
    password: string;
  }>({
    v3LegacyAuthProviderCompatible: true,
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Perform login logic with email and password
    login({ email, password });
  };

  return (
    <Box component='div' sx={{ height: '100vh', backgroundColor: '#FCFCFC' }}>
      <div>
        <img
          style={{ position: 'absolute', height: '100vh', width: '100vw' }}
          src={loginArt}
          alt='Yariga Logo'
        />
      </div>
      <Container
        component='main'
        maxWidth='xs'
        sx={{
          display: 'flex',
          height: '100vh',
          opacity: 0.85,
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '20px',
          backgroundColor: 'white',
          zIndex: 1,
          position: 'relative',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div>
            <img src={alx} alt='ALX Logo' />
          </div>
          <Box mt={4}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label='Email'
                    type='email'
                    fullWidth
                    value={email}
                    onChange={handleEmailChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label='Password'
                    type='password'
                    fullWidth
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </Grid>
              </Grid>
              <Button
                type='submit'
                variant='contained'
                fullWidth
                sx={{
                  marginTop: 5,
                  backgroundColor: '#174281',
                  '&:hover': {
                    background: '#6CADDC',
                  },
                }}
              >
                Login
              </Button>
            </form>
          </Box>
        </Box>
      </Container>
      <CustomSpinner
        isLoading={isLoading}
        color='#174281'
        size={40}
        background='no'
      />
    </Box>
  );
};

export default LoginPage;
