import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';

import Table from '../components/DataTable';
import {outerTheme, categoryColumns} from '../styles';
// import {catData} from '../mocks/data';
import {useSelector, useDispatch} from 'react-redux';
import {deleteCategory, updateCategory, postCategory} from '../services/redux/actions'


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
  const dispatch = useDispatch();
  const catData = useSelector(state => state.category.categoryList)

  const delCat = id => {
    let confirmDelete = window.confirm(`Delete category with ${id} forever?`)
    const del = async () => {
        if(confirmDelete){
            await dispatch(deleteCategory(id))
         }
    }
    del();
  }
  
  return (
    <ThemeProvider theme={outerTheme}>
    <div className={classes.content}>
      <div className={classes.toolbar} />
        {/* TABLE */}
      <Table data={catData} colStyle={categoryColumns} del={delCat} update={updateCategory} add={postCategory} type={"Category"}/>
    </div>
    </ThemeProvider>
  );
}

export default CategoryData;