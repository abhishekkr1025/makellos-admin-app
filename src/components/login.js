import React, { useState } from 'react';
import { Avatar, Grid, Paper, TextField, Typography, Link, Button } from '@material-ui/core';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';

const Login = ({ handleChange }) => {
  const paperStyle = { padding: 30, height: '50vh', width: 400, margin: 'auto', border: "0.5px solid grey", borderRadius: "10px" }; // Adjusted margin for horizontal centering
  const avatarStyle = { backgroundColor: 'green' };
  const btnstyle = { margin: '8px 0', marginTop: '35px', backgroundColor: "#006240", height:"45px" };

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
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Paper elevation={0} style={paperStyle}>
        <Grid align="center">

        <p style={{ fontSize: "25px" }}>Makellos Admin</p>
          <p style={{ fontSize: "25px" }}>Login</p>
        </Grid>
        <form onSubmit={handleLogin}>
          <TextField
            
            placeholder="Enter username"
            fullWidth
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              style: {
                border: 'none',
                backgroundColor: '#e8e8e8',
                paddingLeft:"10px",
                color:"#000",
                height:"45px"
                // Set your desired fixed width here
              },
              disableUnderline: true, // This will remove the underline
            }}
          />
          <div style={{height:"20px"}}></div>
          <TextField
          
            placeholder="Enter password"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              style: {
                border: 'none',
                backgroundColor: '#e8e8e8',
                paddingLeft:"10px",
                color:"#000",
                height:"45px"
                // Set your desired fixed width here
              },
              disableUnderline: true, // This will remove the underline
            }}
          />
          <Button type="submit" color="primary" variant="contained" style={btnstyle} fullWidth>
            Sign in
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Login;