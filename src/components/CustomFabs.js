//reference code: https://github.com/Derida23/Easy-PointOfSale-ReactHook-Redux/blob/master/src/Component/Page/OrderPage.js
import React from 'react';
import {Avatar, Fab, Grid, GridList} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import withWidth, {isWidthUp} from '@material-ui/core/withWidth'
import {useDispatch} from 'react-redux'
import {getProductsByFilter} from '../services/redux/actions'

const useStyles = makeStyles(theme => ({
  list: {
  display: 'flex',
  alignItems: 'center'  
  },
  fabStyle: {
    background:  '#828E42',
  },
}));

const CustomFabs = (props) => {
  //syntax: <Tab item={catData}/>
  const classes = useStyles();

  const {item:  fabObject} = props
  const dispatch = useDispatch()

  const filterCategory = async (e, catId) => {
   await dispatch(getProductsByFilter({catId}))
   .then(result => {
     console.log(result, 'result')
   })
   .catch(err =>{
     console.log(err, 'error')
   })
  };

  const getGridListCols = () => {
    if (isWidthUp('xl', props.width)) {
        return 6;
    }
    if (isWidthUp('md', props.width)) {
        return 3;
    }
    if (isWidthUp('sm', props.width)) {
        return 3;
    }
    return 2;
}

  return (
    <div>
      <GridList cellHeight={50} cols={getGridListCols()} className={classes.list}>
            {
            fabObject.map((tab, index)=>{
              return(
                <Grid container justify="center" key={index}>
                  <Fab className={classes.fabStyle} onClick={(e) => filterCategory(e, tab.id)} key={index} variant="extended" color="primary" aria-label="add">
                    <Avatar alt={tab.category} src={tab.image} /> &nbsp;
                    {tab.category}
                  </Fab> &emsp;&emsp;
                </Grid>
            )})
            }
      </GridList>
    </div>
  );
}

export default withWidth() (CustomFabs)