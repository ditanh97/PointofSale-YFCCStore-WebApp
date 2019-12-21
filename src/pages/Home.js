import React, {useState, useEffect} from 'react';

//material-ui
import clsx from 'clsx';
import {Collapse, CssBaseline, Drawer, AppBar, Toolbar, List, Typography, 
    Divider, IconButton, ListItem, ListItemIcon, ListItemText, Avatar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {
    Home,Assessment, Settings, DataUsage, ExitToApp,
    ExpandLess, ExpandMore, Person, LocalMall, Category,} from '@material-ui/icons';
    
//redux
import {Redirect, Route, Link as RouterLink, Switch} from 'react-router-dom'
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux'
    
//local file
import { useStyles } from '../styles/Home';
import Catalog from '../layouts/Catalog'; 
// import Catalog from '../layouts/TestLayout';
import DataMessage from '../layouts/DataMessage'
import ProductData from '../layouts/ProductData';
import CategoryData from '../layouts/CategoryData';
import Setting from '../layouts/Setting';
import Chart from '../layouts/Review';
import { getCategories,getProducts, logout } from '../services/redux/actions';
    

const breadcrumbNameMap = {
    'Home': ['/home', <Home/>],
    'Database':['/home/database', <DataUsage/>],
    'Product': ['/home/database/product', <LocalMall/>], 
    'Category':['/home/database/category', <Category/>],
    'History':[ '/home/chart', <Assessment/>],
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
    // to: PropTypes.string,
};

const HomePage = (props) => {

    const classes = useStyles();
    const Verified = localStorage.getItem('jwt')
    const userName = localStorage.getItem('user')
    const [openDrawer, setOpenDrawer] = useState (false);
    const [open, setOpen] = useState(false)

    const dispatch = useDispatch();

    const handleDrawerOpen = () => {
        setOpenDrawer(true);
    };

    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
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
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, openDrawer && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, openDrawer && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
             GREEN STORE
            </Typography>
          </Toolbar>
          <div className={classes.rightHeader}>
            <Avatar>
              <Person/>
            </Avatar>
            <Typography component="h1" variant="h3" color="inherit" noWrap className={classes.title}>
              {userName}
            </Typography>
          </div>
        </AppBar>

        <Drawer
          classes={{
            paper: clsx(classes.drawerPaper, !openDrawer && classes.drawerPaperClose),
          }}
          variant="permanent"
          open={openDrawer}
        >
          <div className={classes.toolbarIcon}>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.subMenu}>
              Menu
            </Typography>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
            <List>
            {['Home', 'Database','History', 'Setting'].map((name, i) => {
                if (name === 'Database') { 
                return(
                <div key={'Database'}>
                    <ListItemLink name={name} open={open} onClick={handleClick} key={i}/>
                    <Collapse component="li" in={open} timeout="auto" unmountOnExit>
                    <List disablePadding>
                        <ListItemLink name='Product' className={classes.nested} key={'Product'} />
                        <ListItemLink name='Category' className={classes.nested} key={'Category'}  />
                    </List>
                    </Collapse>
                </div>) }
                else { return( <ListItemLink key={i} name={name} />)}
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
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
            {/* CONTENT */}
            <Switch>
                {/* <Route exact path="/home" component={Catalog} /> */}
                <Route exact path="/home">
                    {Verified ? <Catalog/> : <Redirect to="/"/>}
                </Route>
                <Route exact path="/home/database">
                    {Verified ? <DataMessage/> : <Redirect to="/"/>}
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
        </main>
      </div>
    )
}

export default HomePage;