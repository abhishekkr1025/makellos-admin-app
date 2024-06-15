import { Avatar, Grid, Paper, TextField, Typography } from '@material-ui/core';
import React from 'react'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Button } from '@material-ui/core';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


const Signup=()=>{
    const paperStyle={padding:20, width:300, margin:"0 auto"}
    const headerStyle={margin:0}
    const avatarStyle={backgroundColor:'green'}
    const marginTop={marginTop:5}
    const gapTop={marginTop:5}
    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align= 'center'>
                    <Avatar style={avatarStyle}>
                   < AddCircleOutlineOutlinedIcon/>
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant ='caption'>Please fill this form to create an account !</Typography>
                </Grid>
                 <form>
                     <TextField fullWidth label='Name' placeholder='Enter your name'/>
                     <TextField fullWidth label='Email' placeholder='Enter your email'/>
                     <FormControl style={marginTop}>
                      <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                      
                     <RadioGroup 
                 aria-labelledby="demo-radio-buttons-group-label"
                     defaultValue="female"
                      name="radio-buttons-group"
                      style={{display :'initial'}}
                     >
                 <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
              
              </RadioGroup>

              
              </FormControl>


                     <TextField fullWidth label='Phone Number' placeholder='Phone Number'/>
                     <TextField fullWidth label='Password' type={'password'} placeholder='Password'/>
                     <TextField fullWidth label='Confirm Password' placeholder='Confirm Password'/>
                     
                     <Button type='submit' variant='contained' color='primary' style={gapTop}>Sign up</Button>
                 </form>
            </Paper>
          
            
        </Grid>
    )
}

export default Signup;