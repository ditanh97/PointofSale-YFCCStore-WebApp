import React, {useState, useEffect} from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';

import Table from '../components/DataTable';
import {outerTheme, categoryColumns} from '../styles';
// import {catData} from '../mocks/data';
import {useSelector, useDispatch} from 'react-redux';
import {deleteCategory, updateCategory, postCategory,
        warningAlert,
        successAlert,
        errorAlert} from '../services/redux/actions'


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
  const [idToDelete, setID] = useState('');
  const dispatch = useDispatch();
  const catData = useSelector(state => state.category.categoryList);
  const isConfirm = useSelector(state => state.alert.isConfirm);

  const delCat = id => {
    setID(id)
    const name = catData.filter(c=> c.id === id)[0]["category"] 
    dispatch(warningAlert(`Are you sure want to delete ${name} data?`))
  }

  const Delete = async () => {
    if(isConfirm){
        await dispatch(deleteCategory(idToDelete))
        .then(result => {
          const message = result.value.data.message
          if (result.value.data.status !== 400) {
            dispatch(successAlert(`${message} with ID ${idToDelete}`))
          }else {
            dispatch(errorAlert(message))
          }
        })
        .catch(
          dispatch(errorAlert("Can not delete the category"))
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
      <Table data={catData} colStyle={categoryColumns} del={delCat} update={updateCategory} add={postCategory} type={"Category"}/>
    </div>
    </ThemeProvider>
  );
}

export default CategoryData;