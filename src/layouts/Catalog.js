/*reference:
*https://stackoverflow.com/questions/52346685/filters-logic-should-be-on-frontend-or-backend/52346835
*https://www.algolia.com/doc/faq/searching/searching-from-the-front-end-or-the-back-end/
*
*/

import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import {Typography, Grid, Paper, Button, Badge, Box, IconButton, InputBase, Fab, Avatar} from '@material-ui/core';
import {ShoppingCart, Search, Update,
        ArrowUpward, ArrowDownward, Storefront} from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux';
import {ThemeProvider, withStyles} from '@material-ui/core/styles';
import cartAvatar  from '../assets/images/shopping-cart.png'

//local file
import Content from '../components/FrontCardPagination';
import Cart from '../components/Cart';
import CustomFabs from '../components/CustomFabs';
import Receipt from '../components/ReciptModal';
import {checkoutSell, getRecentBill, clearFilter, getProductsByFilter, clearCart, successAlert, errorAlert} from '../services/redux/actions'
import {outerTheme} from '../styles'
import { useStyles } from '../styles/Catalog';
import {isEmpty} from '../services/helpers'
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
    const productState = useSelector(state => state.product);
    const allProdData = useSelector(state => state.product.productList);
    const prodData = useSelector(state => state.product.productDisplayList);
    const filterRequest = useSelector(state => state.product.filterRequest);
    const cart = useSelector(state => state.transaction.productInCart);
    const totalPrice = useSelector(state => state.transaction.totalPrice);
    const isCheckout = useSelector(state => state.transaction.isSuccess);
    const billFullfilled = useSelector(state => state.transaction.billFullfilled);
    const cashierId = localStorage.getItem('user-id');


    //search, sorting, order
    const [search, setSearch] = useState('')
    const [openReciept, setOpenReciept] = useState(false)

    const changeOrder = async (order) => {
        let req 
        if (isEmpty(filterRequest)) {
            req = {order}  
        }  else {
         req = {...filterRequest, order}
        }
        await dispatch(getProductsByFilter(req))
    }

    const changeSort = async (sort) => {
        let req 
        if (isEmpty(filterRequest)) {
            req = {sort}  
        }  else {
         req = {...filterRequest, sort}
        }
        await dispatch(getProductsByFilter(req))
    }

    const onSearch = (e) => {
        setSearch(e.target.value)
    }

    const submitSearch = async (e) => {
        e.preventDefault()
        console.log("search", search)
        let req 
        if (isEmpty(filterRequest)) {
            req = {search}  
        }  else {
         req = {...filterRequest, search}
        }
        await dispatch(getProductsByFilter(req))
        console.log(".....")
    }
    
    const resetData = (e) => {
        
        dispatch(clearFilter())
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
      .then(async (result) => {
          const msg = result.value.data.message
          if (result.value.data.status !== 400) {
              dispatch(clearCart())
              dispatch(successAlert(msg))
          }else {
              dispatch(errorAlert(msg))
          }
      })
      .catch(err => {
        dispatch(errorAlert("Can not proceed the bills"))
      })
    }

    useEffect(()=>{

    },[productState])

    useEffect(() => {
        const recentBill = async () => {
            if (isCheckout) await dispatch(getRecentBill(cashierId))
            .then(result => {
                const msg = result.value.data.message
                if (result.value.data.status === 400) {
                    dispatch(errorAlert(msg))
                }
            })
            .catch(err => dispatch(errorAlert("Can not open the bill")))
        }
        recentBill()
    }, [isCheckout])

    useEffect(() => { if (billFullfilled) setOpenReciept(true)}, [billFullfilled])
    
    return (
        <ThemeProvider theme={outerTheme}> 
        <Grid container>
            <Receipt open= {openReciept} />
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
                            <Grid item xs={4}>
                            <IconButton onClick={() => changeSort("DESC")} size="medium">
                                <ArrowUpward />
                            </IconButton>
                            <IconButton onClick={() => changeSort("ASC")} size="medium">
                                <ArrowDownward />
                            </IconButton>
                            <IconButton onClick={() => changeOrder("updated")} size="medium">
                                <Update />
                            </IconButton>
                            </Grid>
                            <Fab  onClick={(e) => resetData(e)} variant="extended" color="inherit" aria-label="add">
                                <Storefront /> &nbsp;
                                All Products
                            </Fab> &emsp;&emsp;
                        </Grid><br />
                            {/* == PRODUCT CARD == */}
                        <Content data={prodData.length > 0? prodData: allProdData} />
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
