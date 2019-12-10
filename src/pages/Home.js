import React, {useState} from 'react';
import { fade, makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Home,Assessment, Settings, Nature, Search} from '@material-ui/icons';

import InputBase from '@material-ui/core/InputBase';
import { Avatar} from '@material-ui/core';
import {Redirect, Route, Link, BrowserRouter as Router, Switch} from 'react-router-dom'

import Catalog from '../layouts/Catalog'; 
import Table from '../layouts/Table';
import Setting from '../layouts/Setting';
import Chart from '../layouts/Chart';
import Layout from '../layouts';

const drawerWidth = '15%';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  drawer: {
    width: drawerWidth,
    // backgroundColor: 'yellow',
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    width: '100vw',
    height: '100vh',
    backgroundColor: 'yellow',
  },
  rightHeader:{
      flexDirection: 'row',
      display: 'flex',
      alignItems: 'center',
      marginRight: "1%",
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
    display: 'flex',
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  toolbar: theme.mixins.toolbar,
}));


const ClippedDrawer = (props) => {
  const classes = useStyles();
  const [isVerified, setVerified] = useState(true)


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            YFCC GREEN STORE
          </Typography>
        </Toolbar>
        <div className={classes.rightHeader}>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                <Search />
                </div>
                <InputBase
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                />
            </div>
            <div>
                <Avatar>H</Avatar>
            </div>
        </div>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>
          {['home', 'product','chart', 'setting'].map((name, i) => (
            <ListItem button key={name} component={ Link } to = { name === 'home'? `/home` : `/home/${name}`}>
            <ListItemIcon>
              {i === 3 ? <Settings/> : i === 2 ? <Assessment /> :  i === 1 ? <Nature/> : <Home/>}
            </ListItemIcon>
            <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['home', 'product','chart', 'setting'].map((name, i) => (
            <ListItem button key={name} component={ Link } to = { name === 'home'? `/home` : `/home/${name}`}>
            <ListItemIcon>
              {i === 3 ? <Settings/> : i === 2 ? <Assessment /> :  i === 1 ? <Nature/> : <Home/>}
            </ListItemIcon>
            <ListItemText primary={name} />
          </ListItem>
          ))}
        </List>
      </Drawer>
      {/* CONTENT */}
      {/* <Route path="/home/:layoutName" component={Layout}/> */}
      <Switch>
        <Route exact path="/home">
            {isVerified ? (<Catalog/>) : <Redirect to="/"/>}
        </Route>
        <Route exact path="/home/product">
          {isVerified ? <Table/> : <Redirect to="/"/>}
        </Route>
        <Route exact path="/home/chart">
          {isVerified ? (<Chart/>) : <Redirect to="/"/>}
        </Route>
        <Route exact path="/home/setting">
          {isVerified ? (<Setting/>) : <Redirect to="/"/>}
        </Route>
      </Switch>

    </div>
  );
}

export default ClippedDrawer;