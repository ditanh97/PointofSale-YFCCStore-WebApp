import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Avatar, Button, CssBaseline, TextField,
FormControlLabel, Checkbox, Link, Grid, Box, Typography,
Container} from '@material-ui/core'
import { withRouter, Link as RouterLink, Redirect} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import {login} from '../services/redux/actions';

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '+ new Date().getFullYear()+ ' '}
      <Link color="inherit" href="https://github.com/ditanh97/PointofSale-YFCCStore-WebApp">
        Dita Nurhalimah
      </Link>{'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.common.white,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const Login = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = useState({username: '', password:''}) 
  const [hasKey, setKey] = useState(false)
   // const [info, setInfo] = useState({open: false, variant:"", message: ""})
 
  const change = (e) => { 
    setState({...state, [e.target.name] : e.target.value}) 
  }
  const submit = async (e) => {
    e.preventDefault();
    await dispatch (login(state))
    .then ((result) => {
      console.log('result', result);
      if (result.value.data.status !== 400){
        localStorage.setItem("jwt", result.value.data.token)
        localStorage.setItem('user', result.value.data.username);
        setKey(true)
      } else {
        setKey(false)
      }
    })
    .catch((error) => console.log(error))
    
    // props.history.push('/home');     

  }

  return (
    <div>
      {hasKey && <Redirect to='/home'/> }
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate
            onSubmit = {e => submit(e)}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange = {
                e => change(e)
              }
              value = {state.username}
              
              />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange = {
                e => change(e)
              }
              value = {state.password}
              
              />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link to="/register" variant="body2" component={RouterLink}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
          {/* <InfoSnackbar open={info.open} variant={info.variant} message={info.message} /> */}
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
  </div>
  );
}

export default (withRouter(Login)); 

