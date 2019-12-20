import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {Button, IconButton, Snackbar,
    SnackbarContent,Slide} from '@material-ui/core';
import {CheckCircle, Error, Info, Close, Warning} from '@material-ui/icons'
import { amber, green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

const variantIcon = {
  success: CheckCircle,
  warning: Warning,
  error: Error,
  info: Info,
};

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));



function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];


  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
          <Close className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
};

const useStyles2 = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const TransitionLeft = (props) => {
    return <Slide {...props} direction="left" />;
}

export default function CustomizedSnackbars() {
  const classes = useStyles2();
  const [open, setOpen] = React.useState(false);
  const [transition, setTransition] = React.useState(undefined);

  const handleClick = (Transition) => {
    setTransition(() => Transition);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div>

      <Button variant="outlined" className={classes.margin} onClick={()=> handleClick(TransitionLeft)}>
        Open success snackbar
      </Button>
      <Snackbar
        // anchorOrigin={{
        //   vertical: 'bottom',
        //   horizontal: 'right',
        // }}
        open={open}
        // autoHideDuration={6000}
        onClose={handleClose}
        TransitionComponent={transition}
      >
        <MySnackbarContentWrapper
          onClose={handleClose}
          variant="success"
          message="This is a success message!"
        />
      </Snackbar>
      <MySnackbarContentWrapper
        variant="error"
        className={classes.margin}
        message="This is an error message!"
      />
      <MySnackbarContentWrapper
        variant="warning"
        className={classes.margin}
        message="This is a warning message!"
      />
      <MySnackbarContentWrapper
        variant="info"
        className={classes.margin}
        message="This is an information message!"
      />
      <MySnackbarContentWrapper
        variant="success"
        className={classes.margin}
        message="This is a success message!"
      />
    </div>
  );
}


// import React from 'react';
// import Button from '@material-ui/core/Button';
// import Snackbar from '@material-ui/core/Snackbar';
// import Slide from '@material-ui/core/Slide';



// function TransitionUp(props) {
//   return <Slide {...props} direction="up" />;
// }


// export default function DirectionSnackbar() {
//   const [open, setOpen] = React.useState(false);
//   const [transition, setTransition] = React.useState(undefined);

//   const handleClick = Transition => () => {
//     setTransition(() => Transition);
//     setOpen(true);
//   };

//   const handleClose = () => {

//     setOpen(false);
//   };

//   return (
//     <div>

//       <Button onClick={handleClick(TransitionUp)}>Up</Button>

//       <Snackbar
//         open={open}
//         onClose={handleClose}
//         TransitionComponent={transition}
//         ContentProps={{
//           'aria-describedby': 'message-id',
//         }}
//         message={<span id="message-id">I love snacks</span>}
//       />
//     </div>
//   );
// }