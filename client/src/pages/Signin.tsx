import React, {useState, useEffect, useContext} from 'react';
import Button from '@mui/material/Button';
import LockIcon from '@mui/icons-material/Lock';
import { Grid , Paper, Avatar, TextField,FormGroup, FormControlLabel,Checkbox, Typography, Link, CssBaseline} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';

const Signin=()=>{
  const paperstyle = {padding :20, height :'80vh' , width :350, margin:'50px auto'}
  const avatarcolor = {backgroundColor : 'purple'}
  const btnstyle = {margin:'8px 0'}
  const txtstyle = {margin:'8px 0'}
  const navigate = useNavigate();
  const [ inputs, setInputs ] = useState([])
  const [ userData, setUserData ] = useState([])
  const [ firstUser, setFirstUser ] = useState(false)
//   const { auth, dispatch } = useContext(AuthContext);

  const submit = () => {
    // if (inputs.username && inputs.password) 
    // {
    //     axios({
    //       method: "post",
    //       url: "https://www.gizachew-bayness.tech/api/users/sign-in",
    //       data: inputs,
    //       headers: { "Content-Type": "multipart/form-data" },
    //     })
    //     .then(({data}) => {
    //       if (data) {
    //         dispatch({type: "SIGN_IN", user: data})
    //         navigate('/')
    //       }
    //     })
    //     .catch(err => console.log(err))
    // }
  }


  return (
    <>
      <CssBaseline/>
      <Grid item container>
        <Paper  style={paperstyle}>
          <Grid sx={{align:'center'}}>
            <Avatar style={avatarcolor}> <LockIcon /></Avatar>
            <h2>Sign In</h2> 
            <Typography variant='caption' gutterBottom>Welcome To Article 35!</Typography>
          </Grid>
          
          {/* <form onSubmit={(e) => submit(e.preventDefault())}> */}
          <form onSubmit={(e) => submit()}>
          <TextField variant="standard" fullWidth label='Username' placeholder="Enter your username"  />  {/*onChange={(e) => setInputs({ ...inputs, username: e.target.value })}*/}
          <TextField type='password' variant="standard" fullWidth label='Password' placeholder="Enter your password"  />  {/*onChange={(e) => setInputs({ ...inputs, password: e.target.value })}*/}
          <Button variant="contained" style={btnstyle} fullWidth type='submit' sx={{backgroundColor:'#475be8'}}>Sign In</Button>
          <Typography>
              <Link href="#">
                Forgot Password?
              </Link>
          </Typography>
          <Typography> Do you have an account?
              <Link href = "#" onClick={()=>navigate('/Signup')}>
                Sign Up
              </Link>
          </Typography>
          </form>
        </Paper>
      </Grid>
    </>
  )
}

export default Signin;