import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function SignIn() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(event.currentTarget);
    console.log(data);
    console.log({
      email: data.get('username'),
      password: data.get('password'),
    });

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("username", data.get('username'));
    urlencoded.append("password", data.get('password'));

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    let dataAfterLogin = '';

    fetch(`${process.env.REACT_APP_BACKEND_URI}/login`, requestOptions)
      .then(response => response.text())
      .then(result => {
        let jsonResult = JSON.parse(result);
        dataAfterLogin = jsonResult.access_token; // Lưu giá trị vào biến ngoài hàm
        Cookies.set('accessToken', dataAfterLogin, { expires: 7 }); //Cookie sẽ hết hạn sau 7 ngày
      })
      .then(() => console.log(dataAfterLogin))
      .then(() => console.log(typeof dataAfterLogin))
      .then(() =>  {
        if(typeof dataAfterLogin != 'undefined'){
          navigate('/home');
        }
      })
      .catch(error => console.log('error', error));
    // navigate('/home');
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    navigate('/signup');
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          {/* Đây là một coemailmment trong JSX <LockOutlinedIcon /> */}
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="#" variant="body2" onClick={handleSignUp}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>

  );
}