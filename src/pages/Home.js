import React, {useState, useEffect } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
  Home,Assessment, Settings, Nature, ExitToApp,
  ExpandLess, ExpandMore} from '@material-ui/icons';

import {Collapse, Drawer, AppBar,
  CssBaseline, Toolbar, List, Typography,
  Divider, ListItem, ListItemIcon, ListItemText,
  Avatar, 
} from '@material-ui/core';
import {Redirect, Route, Link as RouterLink, Switch} from 'react-router-dom'
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux'


import Catalog from '../layouts/Catalog'; 
import ProductData from '../layouts/ProductData';
import CategoryData from '../layouts/CategoryData';
import Setting from '../layouts/Setting';
import Chart from '../layouts/Chart';
import { getCategories,getProducts, logout } from '../services/redux/actions';



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
  
  const [Verified, setVerified] = useState(localStorage.getItem('jwt'))
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch();

  useEffect(() => {
      const jwt = localStorage.getItem('jwt');
      console.log('jwt', jwt)
      if (!jwt) {
        console.log('USER IS NOT ALLOWED')

      } else {
          const getData = async () => {
              await dispatch(getProducts())
              await dispatch(getCategories())
          }
          getData();
      }
  }, [])

  const handleClick = () => {
    setOpen(prevOpen => !prevOpen);
  };
  
  const onLogout = (e) => {
    dispatch(logout())
  }



  return (
    <div className={classes.root}>
      {/* {!Verified && <Redirect to="/login"/>} */}
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            YFCC GREEN STORE
          </Typography>
        </Toolbar>
        <div className={classes.rightHeader}>
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
            <ListItem button>
            <ListItemIcon>
              <RouterLink  to='/' onClick={e => onLogout(e)}>
                <ExitToApp/> 
              </RouterLink>
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
        </List>
      </Drawer>
      {/* CONTENT */}
      <Switch>
        {/* <Route exact path="/home" component={Catalog} /> */}
        <Route exact path="/home">
          {Verified ? <Catalog/> : <Redirect to="/"/>}
        </Route>
        <Route exact path="/home/database/product">
          {Verified ? <ProductData/> : <Redirect to="/"/>}
        </Route>
        <Route exact path="/home/database/category">
          {Verified ? <CategoryData/> : <Redirect to="/"/>}
        </Route>
        <Route exact path="/home/chart">
          {Verified ? (<Chart/>) : <Redirect to="/"/>}
        </Route>
        <Route exact path="/home/setting">
          {Verified ? (<Setting/>) : <Redirect to="/"/>}
        </Route>
      </Switch>

    </div>
  );
}

export default ClippedDrawer;