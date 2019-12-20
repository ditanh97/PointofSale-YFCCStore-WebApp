import React, { } from 'react'
import { makeStyles, withStyles, fade, ThemeProvider } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {
    InputBase,
    Badge, Box, Typography, Button,
    IconButton, 
    GridList, GridListTile, GridListTileBar,

} from '@material-ui/core';
import {Info, Search} from '@material-ui/icons';
import {useSelector, useDispatch} from 'react-redux';

import Cart from '../components/Cart';
import Tab from '../components/Tab';
import Content, {ProductCard} from '../components/FrontCardPagination';
import {checkoutSell} from '../services/redux/actions'
import {outerTheme} from '../styles'

// import {catData, prodData} from '../mocks/data';

const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
    content: {
        backgroundColor: 'yellow',
    },
    rightContent: {
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
    },
    catalog:{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'red',
        width: "70%",
    },
    cardContent: {
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    card: {
        width: "40%",
        margin: "1%",
    },
    checkoutContent: {
        backgroundColor: 'blue',
        alignItems: 'center',
        width: "30%",
        display: 'flex',
        flexDirection: 'column',
    },
    headerCheckout: {
        height: '4%',
        backgroundColor: 'purple',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '10%',
        paddingRight: '10%',
        flexDirection: 'row',
        display: 'flex'
    },
    cartText: {
        textAlign: 'center',
        fontWeight: "bold",
    },
    listCheckout: {
        backgroundColor: 'orange',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    gridList: {
        width: '100%',
        height: '100%',
      },
      icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: 200,
        },
      },
    search: {
        position: 'relative',
        borderRadius: 10,
        backgroundColor: "#689f38",
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.5),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
        display: 'flex',
      },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

}))

const StyledBadge1 = withStyles(theme => ({
    badge: {
        right: -3,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}))(Badge);


const Catalog = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const catData = useSelector(state => state.category.categoryList);
    const prodData = useSelector(state => state.product.productList);
    const cart = useSelector(state => state.transaction.productInCart);
    const cashierId = localStorage.getItem('user-id');
    const totalPrice = useSelector(state => state.transaction.totalPrice)

    const onCheckout = async () => {
        const transactionDetail = cart.map(c => {
            return {
                productId: c.id,
                productQty: c.productQty,
                subTotal: c.subTotal,
            }
        })
        const data  = {
            cashierId,
            totalPrice,
            transactionDetail
        }
        console.log(data, 'databefore')
        await dispatch(checkoutSell(data))
        console.log(data, 'data')
    }
  
    return (
        <ThemeProvider theme={outerTheme}> 
        <div className={classes.content}>
            <div className={classes.toolbar} />
            <div className={classes.rightContent}>
                {/* == CARD == */}
                <div className={classes.catalog}>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <Search />
                        </div>
                        <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <Content data={prodData} />
                </div>
                {/* CART*/}
                <div className={classes.checkoutContent}>
                    <div className={classes.headerCheckout}>
                        <Typography className={classes.cartText}>
                            Cart
                        </Typography>
                        <Box m={1}>
                            <IconButton aria-label="cart">
                                <StyledBadge1 badgeContent={cart.length} color="primary">
                                    <ShoppingCartIcon />
                                </StyledBadge1>
                            </IconButton>
                        </Box>
                    </div>
                    <div className={classes.listCheckout}>
                        <Typography className={classes.cartText}>
                            CHECKOUT LISTS
                        </Typography>
                        <ul>
                            {(cart.length > 0) &&
                                cart.map((c, index) => (c.name !== "")  ?
                                    <Cart name={c.name} price={c.price} image={c.image} id={c.id} key={index}
                                        qty={c.productQty} /> : null)
                            }
                        </ul>
                        {cart.length > 0 && 
                        <div className={classes.listCheckout}>
                            Total : {totalPrice}
                        </div>}
                        <div>
                            <Button onClick={onCheckout} color="primary">Checkout</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </ThemeProvider>
    )
}

export default Catalog;