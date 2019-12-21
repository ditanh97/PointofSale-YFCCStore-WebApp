//reference code: https://github.com/Derida23/Easy-PointOfSale-ReactHook-Redux/blob/master/src/Component/Page/OrderPage.js
import React from 'react';
import {Avatar, Fab, Grid, GridList} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import withWidth, {isWidthUp} from '@material-ui/core/withWidth'

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

  const filterCategory = (catName) => {
    console.log(catName);
  };

  const getGridListCols = () => {
    if (isWidthUp('xl', props.width)) {
        return 5;
    }
    if (isWidthUp('md', props.width)) {
        return 3;
    }
    if (isWidthUp('sm', props.width)) {
        return 2;
    }
    return 1;
}

  return (
    <div>
      <GridList cellHeight={50} cols={getGridListCols()} className={classes.list}>
            {
            fabObject.map((tab, index)=>{
              return(
                <Grid>
                <Fab className={classes.fabStyle} onClick={() => filterCategory(tab.category)} key={index} variant="extended" color="primary" aria-label="add">
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