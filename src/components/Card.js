import React, { useEffect } from 'react';
import {GridList, GridListTile, GridListTileBar,
IconButton, Paper} from '@material-ui/core';
import withWidth, {isWidthUp} from '@material-ui/core/withWidth'
import { Info } from '@material-ui/icons';
import { makeStyles  } from '@material-ui/core/styles';
import {useDispatch} from 'react-redux'
import {addCart} from '../services/redux/actions'


const useStyles = makeStyles(theme => ({
    cardContent: {
      alignItems: 'flex-start',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
  },
    gridList: {
      width: '100%',
      height: '100%',
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
  },
}))

export const ProductCard = (props) => {
    //syntax: <ProductCard products={prodData} page={0} loading={false}/>
    const {products, page, loading} = props
    const classes = useStyles();
    const dispatch = useDispatch();
    const pageState = page? page : null

    useEffect(()=>{

    },[pageState])

    const addToCart = (e, product) => {
        dispatch(addCart(product))
    }

    if (loading) {
        return <h1>
        Isloading....
        </h1>
    }

    const getGridListCols = () => {
        if (isWidthUp('xl', props.width)) {
            return 8;
        }
        if (isWidthUp('md', props.width)) {
            return 4;
        }
        if (isWidthUp('sm', props.width)) {
            return 3;
        }
        return 1;
    }

        return <Paper className={classes.cardContent}>
        <GridList cellHeight={360} className={classes.gridList} cols={getGridListCols()} spacing={4}>
            {products.map(product => (
                <GridListTile 
                    key={product.id}
                    cols={1}
                >
                <img src={product.image} alt={product.name} style={{ height: '300px' }} />
                <GridListTileBar
                    title={product.name}
                    subtitle={<span>Rp. {product.price}</span>}
                    actionIcon={
                    <IconButton 
                        aria-label={`info about ${product.name}`} 
                        className={classes.icon}
                        onClick={e => { addToCart(e, product) }}
                    >
                        <Info/>
                        Pick
                    </IconButton>
                    }
                />
                </GridListTile>
            ))}
        </GridList>
        </Paper>
}

export default withWidth() (ProductCard)