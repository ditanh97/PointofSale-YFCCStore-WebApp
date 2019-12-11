import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';

import Table from '../components/DataTable'
import AddUpdate from '../components/AddUpdateDialog'
import {outerTheme, productColumns} from '../styles'
import {prodData} from '../mocks/data'


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%'
  },
  tableWrapper: {
    maxHeight: 440,
    overflow: 'auto',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    width: '100vw',
    height: '100vh',
    backgroundColor: 'yellow'
  },
  actionCell: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  }
}));

const ProductData = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={outerTheme}>
    <div className={classes.content}>
      <div className={classes.toolbar} />
      {/* ADD BUTTON */}
      <AddUpdate label="Add" type="Product"/>
      {/* TABLE */}
      <Table data={prodData} colStyle={productColumns} type={"Product"}/>
    </div>
    </ThemeProvider>
  );
}

export default ProductData;