import React, {useState, useEffect} from 'react';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import {Close, Add} from '@material-ui/icons';
import {Button, Dialog,IconButton, Typography, Fab,
FormGroup, TextField} from '@material-ui/core'
import {useSelector, useDispatch} from 'react-redux'
import {Autocomplete} from '@material-ui/lab'

import {custTheme} from '../styles'

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

  useEffect (()=>console.log("catdata render", catData),[catData])


    const onChange = e => {
      setState({...state, [e.target.name]: e.target.value})
      }
    
      
    const onChangeCat = (e,value) => {
      const id_category = catData.filter(c => c.category === value)[0].id
      if (label === 'Edit') {
        setState({...state, category: id_category, category_name: value})
        console.log(state,'state')
      }else {
        setState({...state, category: id_category})
      }
    }
    
    const submit = async (e) => {
        e.preventDefault()
        if (label === 'Edit') {
          await dispatch (action(state.id, state));
        }else {
          await dispatch (action(state));
        }
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
              value={state.description}
              onChange={e => onChange(e)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="price"
              name="price"
              label="Price"
              type="text"
              fullWidth
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
              fullWidth
              value={state.stock}
              onChange={e => onChange(e)}
            />
            <Autocomplete
              id="combo-box-category"
              options={catData}
              getOptionLabel={option => option.category}
              renderInput={params => (
                <TextField {...params} placeholder="Category" variant="outlined" fullWidth />
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