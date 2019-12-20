import React, { useEffect, useState } from 'react';
import {Snackbar, Slide, IconButton} from '@material-ui/core'
import clsx from 'clsx'
import {makeStyles} from '@material-ui/core/styles'
import { amber, green } from '@material-ui/core/colors';
// import {CheckCircle, Info, Close, Warning} from '@material-ui/icons'
import ErrorIcon from '@material-ui/icons/Error'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import CloseIcon from '@material-ui/icons/Close';
import {useSelector, useDispatch} from 'react-redux'
import {closeAlert, confirmWarning} from '../services/redux/actions'

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
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



function TransitionUp(props) {
  return <Slide {...props} direction="left" />;
}

const Toast= () => {
    const classes = useStyles1();
    const [transition, setTransition] = useState(undefined);
    const [open, setOpen] = useState(false);
   
    const dispatch = useDispatch()
    const message = useSelector(state => state.alert.notification)
    const variant = useSelector(state => state.alert.variant)
    const isConfirm = useSelector(state => state.alert.isConfirm)
    const Icon = variantIcon[variant];
       
    useEffect(() => () => {
        setTransition(()=> TransitionUp);
        setOpen(true)
    }, [message])

    const handleClose = () => {
        setOpen(false);
        dispatch(closeAlert()) //if this code is commmented, then Icon can be used
    };

    const handleConfirm = () => {
        dispatch(confirmWarning())
    }

    useEffect(() => {
      if (isConfirm) {
        setOpen(false);
        dispatch(closeAlert())
      }
  }, [isConfirm])

    return (
        <div>
        <Snackbar
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
            autoHideDuration={variant ==="warning"? null: 2000}
            TransitionComponent={transition}
            ContentProps={{
            'aria-describedby': 'message',
            'className': `${classes[variant]}`
            }}
            action={[variant ==="warning" &&
            <IconButton key="confirm" aria-label="confirm" color="inherit" onClick={handleConfirm}>
                <CheckCircleIcon className={classes.icon} />
            </IconButton>,
            <IconButton key="close" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon className={classes.icon} />
            </IconButton>, ,
            ]}
            message={
            <span id="message" className={classes.message}>
             {variant ==="success" &&  <CheckCircleIcon className={clsx(classes.icon, classes.iconVariant)}/>}
             {variant ==="warning" &&  <WarningIcon className={clsx(classes.icon, classes.iconVariant)}/>}
             {variant ==="error" &&  <ErrorIcon className={clsx(classes.icon, classes.iconVariant)}/>}
             {variant ==="info" &&  <InfoIcon className={clsx(classes.icon, classes.iconVariant)}/>}
            {/* <Icon className={clsx(classes.icon, classes.iconVariant)} /> */}
            {message}
            </span>
            }
        />
        </div>
    );
}

export default Toast;