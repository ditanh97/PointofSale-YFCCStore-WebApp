import React, {useState, useEffect} from 'react';
import { makeStyles, fade, ThemeProvider } from '@material-ui/core/styles';
import {Avatar, Button, CssBaseline, TextField,
FormControlLabel, Checkbox, Link, Grid, Box, Typography,
Container} from '@material-ui/core'
import { withRouter, Link as RouterLink, Redirect} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import {register, successAlert, errorAlert} from '../services/redux/actions';
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

export const Register = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = useState({username: '', password:'', email: ''})
  const [hasRegist, setRegist] = useState(false)
 
  const change = (e) => { 
    setState({...state, [e.target.name] : e.target.value}) 
  }
  const submit = async (e) => {
    e.preventDefault();
    await dispatch (register(state))
    .then ((result) => {
      console.log('result', result);
      if (result.value.data.status !== 400){
        setRegist(true)
        dispatch(successAlert("Kamu berhasil Register"))
        props.history.push('/')
        
      } else {
        setRegist(false)
        dispatch(errorAlert(result.value.data.message))
      }
    })
    .catch((error) => dispatch(errorAlert("Error Register")))    
  }

  const toggleRemember = (e) => {
    setState({...state, isRemember: !state.isRemember})
  }

  useEffect (()=> console.log(state, 'remember'), [state.isRemember])

  return (
    <ThemeProvider theme={formTheme}>
    <div>
      {/* {hasRegist && <Redirect to='/'/> } */}
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
              className={classes.input}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              onChange = {
                e => change(e)
              }
              value = {state.email}
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              >
              Register
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link to="/" variant="body2" component={RouterLink} className={classes.text}>
                  {"Have an account? Login"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
  </div>
  </ThemeProvider>
  );
}

export default (withRouter(Register)); 

