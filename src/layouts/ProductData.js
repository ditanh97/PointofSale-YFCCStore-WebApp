import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';

import Table from '../components/DataTable'
import {outerTheme, productColumns} from '../styles'
// import {prodData} from '../mocks/data';
import {useSelector, useDispatch} from 'react-redux';
import {deleteProduct, updateProduct, postProduct} from '../services/redux/actions'


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
  const dispatch = useDispatch();
  const prodData = useSelector(state => state.product.productList)

  const delProd = id => {
    let confirmDelete = window.confirm(`Delete product with ${id} forever?`)
    const del = async () => {
        if(confirmDelete){
            await dispatch(deleteProduct(id))
         }
    }
    del();
  }
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