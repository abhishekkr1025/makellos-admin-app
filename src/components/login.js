import React, { useState } from 'react';
import { Avatar, Grid, Paper, TextField, Typography, Link, Button } from '@material-ui/core';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';

const Login = ({ handleChange }) => {
  const paperStyle = { padding: 20, height: '73vh', width: 300, margin: '0 auto' };
  const avatarStyle = { backgroundColor: 'green' };
  const btnstyle = { margin: '8px 0' };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Example validation - replace with your actual validation logic
    if (username === 'admin' && password === 'password') {
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h1>Makellos Hub</h1>
          <h2>Login</h2>
        </Grid>
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            placeholder="Enter username"
            fullWidth
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
         
          <Button type="submit" color="primary" variant="contained" style={btnstyle} fullWidth>
            Sign in
          </Button>
        </form>
       
        <Typography>
          Do you have an account ?{' '}
          <Link href="#" onClick={() => handleChange('event', 1)}>
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
