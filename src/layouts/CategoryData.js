import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';

import Table from '../components/DataTable'
import AddUpdate from '../components/AddUpdateDialog'
import {outerTheme, categoryColumns} from '../styles'
import {catData} from '../mocks/data'


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

const CategoryData = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={outerTheme}>
    <div className={classes.content}>
      <div className={classes.toolbar} />
      {/* ADD BUTTON */}
      <AddUpdate label="Add" type="Category"/>
      {/* TABLE */}
      <Table data={catData} colStyle={categoryColumns} type={"Category"}/>
    </div>
    </ThemeProvider>
  );
}

export default CategoryData;