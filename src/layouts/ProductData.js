import React, {useState, useEffect} from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';

import Table from '../components/DataTable'
import {outerTheme, productColumns} from '../styles'
// import {prodData} from '../mocks/data';
import {useSelector, useDispatch} from 'react-redux';
import {deleteProduct, updateProduct, postProduct,
warningAlert, successAlert, errorAlert} from '../services/redux/actions'


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%'
  },
  toolbar: theme.mixins.toolbar,
  content: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1%',
    alignItems:'center'
  },
}));

const ProductData = () => {
  const classes = useStyles();
  const [idToDelete, setID] = useState('');
  const dispatch = useDispatch();
  const prodData = useSelector(state => state.product.productList);
  const isConfirm = useSelector(state => state.alert.isConfirm);

  const delProd = id => {
    setID(id)

    const name = prodData.filter(c=> c.id === id)[0]["name"] 
    dispatch(warningAlert(`Are you sure want to delete ${name} data?`))
    }

  const Delete = async () => {
    if(isConfirm){
        await dispatch(deleteProduct(idToDelete))
        .then(result => {
          const message = result.value.data.message
          if (result.value.data.status !== 400) {
            dispatch(successAlert(`${message} with ID ${idToDelete}`))
          }else {
            dispatch(errorAlert(message))
          }
        })
        .catch( error =>{
          console.log("erorr", error)
          dispatch(errorAlert("Can not delete the product"))
        }
        )
      }
  }

  useEffect(() => {
    Delete()
  }, [isConfirm])

  return (
    <ThemeProvider theme={outerTheme}>
    <div className={classes.content}>
      <div className={classes.toolbar} />
      {/* TABLE */}
      <Table data={prodData} colStyle={productColumns} del={delProd} update={updateProduct} add={postProduct} type={"Product"}/>
    </div>
    </ThemeProvider>
  );
}

export default ProductData;