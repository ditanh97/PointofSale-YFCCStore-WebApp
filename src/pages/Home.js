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
import {Search,
  Home,Assessment, Settings, Nature, ExitToApp,
  ExpandLess, ExpandMore} from '@material-ui/icons';

import InputBase from '@material-ui/core/InputBase';
import {Avatar, Collapse} from '@material-ui/core';
import {Redirect, Route, Link as RouterLink, Switch} from 'react-router-dom'
import PropTypes from 'prop-types';


import Catalog from '../layouts/Catalog'; 
import ProductData from '../layouts/ProductData';
import CategoryData from '../layouts/CategoryData';
import Setting from '../layouts/Setting';
import Chart from '../layouts/Chart';


const drawerWidth = '15%';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    // width: window.innerWidth,
    // height: window.innerHeight,
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
    width: '100%',
    height: '100%',
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
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const breadcrumbNameMap = {
  'Home': ['/home', <Home/>],
  'Database':['/home/database', <Nature/>],
  'Product': ['/home/database/product', <Nature/>], 
  'Category':['/home/database/category', <Nature/>],
  'Review':[ '/home/chart', <Assessment/>],
  'Setting': ['/home/setting', <Settings/>], 
};

const ListItemLink = (props) => {
  const {name, open, ...other } = props;
  const to = breadcrumbNameMap[name][0];
  const icon = breadcrumbNameMap[name][1];

  return (
    <li>
      <ListItem button key={name} component={RouterLink} to={to} {...other}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={name} />
        {open != null ? open ? <ExpandLess /> : <ExpandMore /> : null}
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  open: PropTypes.bool,
  to: PropTypes.string.isRequired,
};


const ClippedDrawer = (props) => {
  const classes = useStyles();
  const [isVerified, setVerified] = useState(true)
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(prevOpen => !prevOpen);
  };



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
          {['Home', 'Database','Review', 'Setting'].map((name, i) => {
            if (name === 'Database') { 
              return(
              <div>
                <ListItemLink name={name} open={open} onClick={handleClick} />
                <Collapse component="li" in={open} timeout="auto" unmountOnExit>
                  <List disablePadding>
                    <ListItemLink name='Product' className={classes.nested} />
                    <ListItemLink name='Category' className={classes.nested} />
                  </List>
                </Collapse>

              </div>) }
            else { return( <ListItemLink name={name}  />)}
          })}
        </List>
        <Divider />
        <List>
            <ListItem button key={"Logout"} component={ RouterLink } to ="/">
            <ListItemIcon>
              <ExitToApp/>
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
        </List>
      </Drawer>
      {/* CONTENT */}
      {/* <Route path="/home/:layoutName" component={Layout}/> */}
      <Switch>
        <Route exact path="/home">
            {isVerified ? <Catalog/> : <Redirect to="/"/>}
        </Route>
        <Route exact path="/home/database/product">
          {isVerified ? <ProductData/> : <Redirect to="/"/>}
        </Route>
        <Route exact path="/home/database/category">
          {isVerified ? <CategoryData/> : <Redirect to="/"/>}
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