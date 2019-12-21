import React, {useState, useEffect} from 'react';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import {Close, Add} from '@material-ui/icons';
import {Button, Dialog,IconButton, Typography, Fab,
FormGroup, TextField, InputAdornment } from '@material-ui/core'
import {useSelector, useDispatch} from 'react-redux'
import {Autocomplete} from '@material-ui/lab'

import {custTheme} from '../styles'
import {errorAlert, successAlert} from '../services/redux/actions'

// import {catData} from '../mocks/data'

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
  const {label, type, data, action} = props
    const [open, setOpen] = React.useState(false);
    const [state, setState] = useState({})
    const dispatch = useDispatch()
    const catData = useSelector(state => state.category.categoryList)
    const page = props.page? props.page : null

    const handleClickOpen = () => {
    setOpen(true);
    };
    const handleClose = () => {
    setOpen(false);
    };

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

    useEffect( () => {
      if (data){
          if (type === "Category") {
            const {id, category, image } = data
            setState({ id, category, image })    
          } else {
            const {id, name, description, price, stock, category_name, image } = data
            setState({ id, name, description, price, stock, category_name, image }) 
          }
      } else{
        if (type === "Category") setState({category: '', image:'' })
        else setState({name:'', description:'', price:'', stock:'', category_name:'', image:'' })  
      }
  },[page])



    const onChange = e => {
      setState({...state, [e.target.name]: e.target.value})
      }
    
      
    const onChangeCat = (e,value) => {
      const id_category = catData.filter(c => c.category === value)[0].id
      setState({...state, category: id_category, category_name: value})
    }
    
    const submit = async (e) => {
        e.preventDefault()
        if (label === 'Edit') {
          await dispatch (action(state.id, state))
          .then( result => {
            const message = result.value.data.message
            if (result.value.data.status !== 400) {
              dispatch(successAlert(`${message}`))
              
            }else {
              dispatch(errorAlert(message))
            }
          })
          .catch( error =>{
            console.log("erorr", error)
            dispatch(errorAlert(`Can not update the ${type} with ID ${state.id}`))
          })
        }else {
          await dispatch (action(state))
          .then( result => {
            const message = result.value.data.message
            if (result.value.data.status !== 400) {
              dispatch(successAlert(`${message}`))
            }else {
              dispatch(errorAlert(message))
            }
          })
          .catch( error =>{
            console.log("erorr", error)
            dispatch(errorAlert(`Can not add data to the ${type} database`))
          })
        }
        setOpen(false)
    }    

    const Form = () => {
      return (
        <form>
        <FormGroup>
          {
            type === "Product" ?
            <div>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="name"
              label="Product Name"
              type="text"
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
              value={state.name}
              onChange={e => onChange(e)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="description"
              name="description"
              label="Description"
              type="text"
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
              value={state.description}
              onChange={e => onChange(e)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="price"
              name="price"
              label="Price"
              type="number"
              inputProps= {{
                startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
                min: 0,
              }}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
              value={state.price}
              onChange={e => onChange(e)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="stock"
              name="stock"
              label="Stock"
              type="text"
              inputProps= {{
                min:1,
                startAdornment: <InputAdornment position="end">Ons</InputAdornment>,
              }}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              value={state.stock}
              onChange={e => onChange(e)}
            />
            <Autocomplete
              id="combo-box-category"
              options={catData}
              getOptionLabel={option => option.category}
              renderInput={params => (
                <TextField {...params} placeholder="Category" variant="outlined" fullWidth required/>
              )}
              // value={state.category_name === null? catData[0] : catData.filter(c=>c.id === state.category)[0]}
              value={catData.filter(c=>c.id === state.category)[0]}
              onInputChange={(e,val)=> onChangeCat(e,val)}
              
            />
            <TextField
              autoFocus
              margin="dense"
              id="image"
              name="image"
              label="Image"
              type="text"
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              value={state.image}
              onChange={e => onChange(e)}
            />
          </div>
            :
          <div>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="category"
              label="Category Name"
              type="text"
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
              value={state.category}
              onChange={e => onChange(e)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="image"
              name="image"
              label="Category Image"
              type="text"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={state.image}
              onChange={e => onChange(e)}
            />
          </div>
          }
          </FormGroup>
          </form>
      )
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
              {Form()}
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={e => submit(e)} color="primary">
                  {label === 'Add' ? `Add ${type}` : "Save Change" }
                </Button>
            </DialogActions>
            </Dialog>
        </div>
    );
    }

export default AddUpdateDialog;