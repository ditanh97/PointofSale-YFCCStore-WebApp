import React, {useState} from 'react';
import axios from 'axios';
import clsx from 'clsx';
import {Typography, Grid, Paper, Button, Badge, Box, IconButton, InputBase, Fab} from '@material-ui/core';
import {ShoppingCart, Search, Update,
        ArrowUpward, ArrowDownward} from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux';
import {ThemeProvider, withStyles} from '@material-ui/core/styles';
import cartAvatar  from '../assets/images/shopping-cart.png'

//local file
import Content from '../components/FrontCardPagination';
import Cart from '../components/Cart';
import CustomFabs from '../components/CustomFabs';
import {checkoutSell} from '../services/redux/actions'
import {outerTheme} from '../styles'
import { useStyles } from '../styles/Catalog';
// import {catData, prodData} from '../mocks/data';

const StyledBadge1 = withStyles(theme => ({
    badge: {
        right: -3,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}))(Badge);

const Catalog = (props) => {

    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const dispatch = useDispatch();
    const catData = useSelector(state => state.category.categoryList);
    const prodData = useSelector(state => state.product.productList);
    const cart = useSelector(state => state.transaction.productInCart);
    const totalPrice = useSelector(state => state.transaction.totalPrice)
    const cashierId = localStorage.getItem('user-id');
    const token = localStorage.getItem('jwt')
    //search, sorting, order
    const [search, setSearch] = useState('')

    const changeOrder = (orderString) => {
        console.log(orderString)
    }

    const changeSort = (sortString) => {
        console.log(sortString)
    }

    const onSearch = (e) => {
        console.log(e.target, "target")
    }

    const submitSearch = (e) => {
        e.preventDefault()
        console.log(".....")
    }

    const onCheckout = async (event) => {
      event.preventDefault()
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
      await dispatch(checkoutSell(data))
      .then(result => {
          console.log(data, 'dataafter checkout')
      })
    }
    
    return (
        <ThemeProvider theme={outerTheme}> 
        <Grid container>
            <Grid item xs={12} md={12} lg={8}>
                <Paper className={fixedHeightPaper} style={{backgroundColor:"rgba(190, 195, 202, 0.3)"}}>
                    <Grid>
                        <Grid container justify="center">
                            <CustomFabs item={catData}/>
                        </Grid><br/>
                        {/* == SEARCH == */}
                        <Grid container justify="center">
                            <IconButton onClick={e => submitSearch(e)} fontSize="medium">
                                <Search />
                            </IconButton> &nbsp;
                            <InputBase
                            placeholder = " Search Name..."
                            inputProps={{ 'aria-label': 'search' }}
                            name= "search"
                            onChange={e => onSearch(e)}
                            /> &emsp;

                            <IconButton onClick={() => changeSort("DESC")} size="medium">
                                <ArrowUpward />
                            </IconButton>
                            <IconButton onClick={() => changeSort("ASC")} size="medium">
                                <ArrowDownward />
                            </IconButton>
                            <IconButton onClick={() => changeOrder("date_update")} size="medium">
                                <Update />
                            </IconButton>
                        </Grid><br />
                            {/* == PRODUCT CARD == */}
                        <Content data={prodData} />
                    </Grid>
                </Paper>
            </Grid>
            {/* == CART == */}
            <Grid item xs={12} md={12} lg={4}>
                <Grid>
                    <Paper className={clsx(classes.container, classes.cartHeader)} style={{height: "6vh"}}> 
                            <Typography align="right" variant="h5" className={classes.cartTitle}>
                                Cart
                            </Typography>
                            <Box m={1}>
                                <IconButton aria-label="cart">
                                    <StyledBadge1 badgeContent={cart.length} color="primary">
                                        <ShoppingCart  style={{ fontSize: 25 }}/>
                                    </StyledBadge1>
                                </IconButton>
                            </Box>
                    </Paper>
                    <Paper className={fixedHeightPaper} style={{height: "70vh"}}>
                        {/* List Order */}
                        <Grid
                        container
                        direction="row"
                        justify="space-around"
                        alignItems="flex-start"
                        >
                        {cart.length == 0 ? <img src={cartAvatar} style={{maxWidth: "200px"}}/> : cart.map((c, index) => (c.name !== "") ?
                        <Cart name={c.name} price={c.price} image={c.image} id={c.id} key={index}
                            qty={c.productQty} /> : null
                        )}
                        </Grid>
                    </Paper>
                    <Paper  style={{height: "5vh"}}>
                    {cart.length > 0 && 
                            <Typography align="center" variant="h6" className={classes.cartTitle}>
                                Total: {totalPrice}
                            </Typography>
                    }
                    </Paper>
                    <Paper style={{height: "13vh"}}>
                        <Grid container justify="center">
                            <Button onClick={e=> onCheckout(e)} variant="contained" color="primary" className={classes.button}>
                                CHECKOUT
                            </Button>
                            <Button variant="contained" color="secondary" className={classes.button}>
                                CANCEL
                            </Button>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
        </ThemeProvider>
    )
}


export default Catalog;
