import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
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
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { Avatar, Card, CardActionArea, 
    CardMedia, CardContent, CardActions, Button } from '@material-ui/core';

const drawerWidth = '20%';


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
  rightContent: {
      display: 'flex',
      flexDirection: 'row',
      height: '100%',
  },
  cardContent: {
      backgroundColor: 'red',
      alignItems: 'center',
      width: "65%",
      display: 'flex',
      justifyContent: 'row',
  },
  card: {
      width:"30%",
      margin: "1%",
  },
  checkoutContent: {
      backgroundColor: 'blue',
      alignItems: 'center',
      width: "35%",
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
  },
  headerCheckout: {
      height: '4%',
      backgroundColor: 'purple',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex'
  },
  cartText : {
    textAlign: 'center',
  },
  listCheckout: {
      backgroundColor: 'orange',
  }
}));

const cardObject = [
    {
        name: "Totebag",
        image: "https://www.trzcacak.rs/myfile/detail/408-4082182_white-cream-tote-bag-png.png",
        price: 45000
    },
        {
        name: "Totebag",
        image: "https://www.trzcacak.rs/myfile/detail/408-4082182_white-cream-tote-bag-png.png",
        price: 45000
    },
    {
        name: "Totebag",
        image: "https://www.trzcacak.rs/myfile/detail/408-4082182_white-cream-tote-bag-png.png",
        price: 45000
    },
        {
        name: "Totebag",
        image: "https://www.trzcacak.rs/myfile/detail/408-4082182_white-cream-tote-bag-png.png",
        price: 45000
    },
]

export default function ClippedDrawer() {
  const classes = useStyles();

  const renderRow = (product) => {
      return (
        <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={product.name}
            height="30%"
            image={{uri: product.image}}
            title={product.name}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
                {product.name}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              {product.price}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      )
  }

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
                <SearchIcon />
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
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.rightContent}>
            <div className={classes.cardContent}>
                {
                    cardObject.map((product, index) => renderRow(product))
                }
            </div>
            <div className={classes.checkoutContent}>
                <div className={classes.headerCheckout}>
                    <Typography className={classes.cartText}>
                        Cart
                    </Typography>
                </div>
                <div className={classes.listCheckout}>
                    List Checkout
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}