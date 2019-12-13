import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';

import Table from '../components/DataTable';
import {outerTheme, categoryColumns} from '../styles';
// import {catData} from '../mocks/data';
import {useSelector} from 'react-redux';


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
  const catData = useSelector(state => state.category.categoryList)

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