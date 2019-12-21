import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;
export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#7C4A33",
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightHeader:{
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    marginRight: "1%",
    justifyContent: "space-around",
    padding: "1%",
    width: "240px",
},
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    color: "#DBCDC6",
    flexGrow: 1,
    fontFamily: "Airbnb Cereal App",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: "40px"
  },
  subMenu: {
    flexGrow: 1,
    fontFamily: "Airbnb Cereal App",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: "30px",
    color: "#7C4A33"
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    border: "1px solid #CECECE"
  },
  fixedHeight: {
    height: "89vh",
    width: "90wh",
  },
  bigavatar: {
    margin: theme.spacing(1),
    width: 70,
    height: 70,
  },
  button: {
    height: 50,
    width: 170,
    margin: theme.spacing(2)
  },
}));