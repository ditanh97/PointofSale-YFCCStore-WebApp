import React from 'react';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import {Close, Add} from '@material-ui/icons';
import {Button, Dialog,IconButton, Typography, Fab} from '@material-ui/core'

import {custTheme} from '../styles'
import Form from '../components/AddUpdateForm'

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <Close />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const AddUpdateDialog = (props) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
    setOpen(true);
    };
    const handleClose = () => {
    setOpen(false);
    };

    const {label, type} = props

    let button = ''
    let title = ''

    if(label === 'Edit'){
    button =  <Button variant="contained" color="primary" onClick={handleClickOpen}>
                {label}
            </Button>
    title = `Update ${type}`
    } else {
    button = <Fab color="secondary" aria-label="add" onClick={handleClickOpen} style={{position: 'fixed'}}><Add/></Fab>
    title = `Add New ${type}`
    }
  

    return (
        <div>
            <ThemeProvider theme={custTheme}>
                {button}
            </ThemeProvider>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                {title}
            </DialogTitle>
            <DialogContent dividers>
              <Form type={type}/>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose} color="primary">
                  {label === 'Add' ? `Add ${type}` : "Save Change" }
                </Button>
            </DialogActions>
            </Dialog>
        </div>
    );
    }

export default AddUpdateDialog;