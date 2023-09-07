import { useState } from 'react';
import { useLogin } from '@refinedev/core';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { TextField, Button, Grid } from '@mui/material';

import { alx } from 'assets';

import { CredentialResponse } from '../interfaces/google';

const LoginPage: React.FC = () => {
  const { mutate: login } = useLogin<{ email: string; password: string }>({
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
    <Box component='div' sx={{ backgroundColor: '#FCFCFC' }}>
      <Container
        component='main'
        maxWidth='xs'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100vh',
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
            <img src={alx} alt='Yariga Logo' />
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
                sx={{ marginTop: 5, backgroundColor:'#174281', "&:hover": {
                  background:'#6CADDC',
                },}}
              >
                Login
              </Button>
            </form>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
