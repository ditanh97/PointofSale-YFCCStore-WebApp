import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import { Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import Table from '../components/DataTable'
import AddUpdate from '../components/AddUpdateDialog'
import {outerTheme, categoryColumns} from '../styles'
import {catData} from '../mocks/data'


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

const CategoryData = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={outerTheme}>
    <div className={classes.content}>
      <div className={classes.toolbar} />
        {/* TABLE */}
      <Table data={catData} colStyle={categoryColumns} type={"Category"}/>
    </div>
    </ThemeProvider>
  );
}

export default CategoryData;