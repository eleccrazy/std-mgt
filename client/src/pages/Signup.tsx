import React, { useState, useEffect, useContext } from 'react';
import { Checkbox, Grid, Paper, Avatar, Typography, TextField, Button, FormLabel, FormControl, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../contexts/authContext';


const Signup = () => {
    const paperStyle = { padding: 20, width: 350, margin: "0 auto"}
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: 'purple' }
    const marginTop = { marginTop: 5 }
    const btnstyle = {margin:'8px 0'}
    const [ inputs, setInputs ] = useState([])
    const [ firstUser, setFirstUser ] = useState(false)
    const navigate = useNavigate();
    // const { dispatch } = useContext(AuthContext);

    // useEffect(()=>{
    //     // Axios Method
    //     axios.get('https://www.gizachew-bayness.tech/api/users')
    //     .then(({data}) => {
    //   //  console.log(data)
    //       if (data.length == 0) {
    //         setInputs({ ...inputs, is_admin: 'True' })
    //       } else {
    //         setInputs({ ...inputs, is_admin: 'False' })
    //       }
    //     })
    //     .catch(err => console.log(err))
    //   },[])

    const submit = () => {
      // if (inputs.first_name && inputs.username && inputs.password && inputs.confirm_password && (inputs.password===inputs.confirm_password))
      //   axios({
      //       method: "post",
      //       url: "https://www.gizachew-bayness.tech/api/users/sign-up",
      //       data: inputs,
      //       headers: { "Content-Type": "multipart/form-data" },
      //     })
      //   .then(({data}) => {
      //     if (data) {
      //       console.log(data)
      //       dispatch({type: "SIGN_IN", user: data})
      //       navigate('/')
      //     }
      //   })
    }

    

    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid sx={{align:'center'}}>
                    <Avatar style={avatarStyle}>
                        <LockIcon/>
                    </Avatar>
                    <h2>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                {/* <form onSubmit={(e) => submit(e.preventDefault())}> */}
                <form onSubmit={(e) => submit()}>
                    <TextField variant="standard" required fullWidth label='First Name' placeholder="Enter your first name"/> {/*onChange={(e) => setInputs({ ...inputs, first_name: e.target.value })}*/}
                    <TextField variant="standard" fullWidth label='Last Name' placeholder="Enter your last name" /> {/*onChange={(e) => setInputs({ ...inputs, last_name: e.target.value })}*/}
                    <TextField variant="standard" required fullWidth label='Username' placeholder="Enter your username" /> {/*onChange={(e) => setInputs({ ...inputs, username: e.target.value })}*/}
                    <TextField variant="standard" required fullWidth label='Password' placeholder="Enter your password" type="password" /> {/*onChange={(e) => setInputs({ ...inputs, password: e.target.value })}*/}
                    <TextField variant="standard" type="password" fullWidth label='Confirm Password' placeholder="Confirm your password"  />{/*onChange={(e) => setInputs({ ...inputs, confirm_password: e.target.value })}*/}
                    <Button type='submit' variant='contained'  sx={{backgroundColor:'#475be8'}} style={btnstyle} fullWidth>Sign up</Button>
                </form>
            </Paper>
        </Grid>
    )
}

export default Signup;