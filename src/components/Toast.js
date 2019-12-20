import React, { useEffect } from 'react';
import {Button, Snackbar, Slide, IconButton} from '@material-ui/core'
import clsx from 'clsx'
import {makeStyles,} from '@material-ui/core/styles'
import { amber, green } from '@material-ui/core/colors';
import {CheckCircle, Error, Info, Close, Warning} from '@material-ui/icons'

import {useSelector, useDispatch} from 'react-redux'
import {close} from '../services/redux/actions'

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


const variantIcon = {
  success: CheckCircle,
  warning: Warning,
  error: Error,
  info: Info,
};

function TransitionUp(props) {
  return <Slide {...props} direction="left" />;
}


export default function DirectionSnackbar() {
    const classes = useStyles1();
    const [transition, setTransition] = React.useState(undefined);
    const [open, setOpen] = React.useState(false);
    //without redux
    /*
    
    const [message, setMessage] = React.useState("Ini pesan")
    const [variant, setVariant] = React.useState("warning")
    
    
    // const handleClick = Transition => () => {
        //     setTransition(() => TransitionUp);
        //     setOpen(true);
        // };
        
        const handleClick = () =>{
            setMessage("wahawha")
        }
        */
    
    const dispatch = useDispatch()
    const message = useSelector(state => state.alert.notification)
    const variant = useSelector(state => state.alert.variant)
    const Icon = variantIcon[variant];
       
    useEffect(() => () => {
        setTransition(()=> TransitionUp);
        setOpen(true)
    }, [message])

    const handleClose = () => {
        setOpen(false);
        dispatch(close())
    };

    return (
        <div>
        {/* <Button onClick={handleClick}>Up</Button> */}
        <Snackbar
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
            autoHideDuration={1000}
            TransitionComponent={transition}
            ContentProps={{
            'aria-describedby': 'message',
            'className': `${classes[variant]}`
            }}
            action={[
            <IconButton key="close" aria-label="close" color="inherit" onClick={handleClose}>
                <Close className={classes.icon} />
            </IconButton>,
            ]}
            message={
            <span id="message" className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {message}
            </span>
            }
        />
        </div>
    );
}