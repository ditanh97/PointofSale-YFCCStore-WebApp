import React, {useState, useEffect} from 'react';
import { makeStyles, fade, ThemeProvider } from '@material-ui/core/styles';
import {Avatar, Button, CssBaseline, TextField,
FormControlLabel, Checkbox, Link, Grid, Box, Typography,
Container} from '@material-ui/core'
import { withRouter, Link as RouterLink, Redirect} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import {login, successAlert, errorAlert} from '../services/redux/actions';
import logo from '../assets/images/logo.png';
import {formTheme} from '../styles';

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
    marginTop: "30%",
    marginBottom: "10%",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.common.white,
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  input: {
    borderRadius: "10px",
    '&:hover': {
      borderRadius: "#7C4A33",
  },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#828E42",
    '&:hover': {
        backgroundColor: "#7C4A33",
    },
  },
  text :{
    color: '#7C4A33',
  },

}));

export const Login = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = useState({username: '', password:'', isRemember: false})
  const [hasKey, setKey] = useState(false)
 
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
        localStorage.setItem('user-id', result.value.data.id);
        setKey(true)
        dispatch(successAlert("Kamu berhasil Login"))
        
      } else {
        setKey(false)
        dispatch(errorAlert(result.value.data.message))
      }
    })
    .catch((error) => dispatch(errorAlert("Error Login")))    
  }

  const toggleRemember = (e) => {
    setState({...state, isRemember: !state.isRemember})
  }

  useEffect (()=> console.log(state, 'remember'), [state.isRemember])

  return (
    <ThemeProvider theme={formTheme}>
    <div>
      {hasKey && <Redirect to='/home'/> }
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <img src={logo}/>
          <form className={classes.form} noValidate
            onSubmit = {e => submit(e)}>
            <TextField
              className={classes.input}
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
              control={<Checkbox value="remember" color="primary" onChange={(e)=> toggleRemember(e)} />}
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
                <Link to="/register" variant="body2" component={RouterLink} className={classes.text}>
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
  </ThemeProvider>
  );
}

export default (withRouter(Login)); 

