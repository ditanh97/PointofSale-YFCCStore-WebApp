import React, { useState, useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {
    Card, CardActionArea,
    CardMedia, CardContent,
    Badge, Box, Typography, Button,
    IconButton,
    GridList, GridListTile, GridListTileBar

} from '@material-ui/core';
import {Info} from '@material-ui/icons';
import Cart from './Cart';
import Tab from '../components/Tab';
import {catData, prodData} from '../mocks/data';

const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
    content: {
        backgroundColor: 'yellow',
        overflow: 'auto',
    },
    rightContent: {
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
    },
    catalog:{
        display: 'flex',
        flexDirection: 'column',
        width: "70%",
    },
    cardContent: {
        backgroundColor: 'red',
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
        // height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    headerCheckout: {
        height: '4%',
        backgroundColor: 'purple',
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        display: 'flex'
    },
    cartText: {
        textAlign: 'center',
    },
    listCheckout: {
        backgroundColor: 'orange',
        display: 'flex',
        flexDirection: 'column'
    },
    gridList: {
        width: '100%',
        height: '100%',
      },
      icon: {
        color: 'rgba(255, 255, 255, 0.54)',
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
    const [cart, setCart] = useState([])

    useEffect(()=> {
        console.log("cart is updated",cart)
    }, [cart])

    const removeCart = (id) => {
        let copyCart = cart.filter(i => id !== i.id)
        setCart(copyCart)
        console.log(cart, 'cart')
    }

    const addToCart = (e, item) => {
        const existingList = cart.filter(p => p.id === item.id)
        console.log(existingList, 'existing')
        if (existingList.length > 0) {
            const withoutExistingList = cart.filter(p => p.id !== item.id)
            const updatedUnitofList = {
                ...existingList[0],
                unit: existingList[0].unit + item.unit
            }
            setCart(
                [...withoutExistingList, updatedUnitofList]
            )
        } else {
            item.unit = (item.unit === undefined) ? 1 : item.unit
            setCart(
                [...cart, item]
            )
        }
    }

    const renderCardGrid = (product) => {
        return (
            <GridListTile 
                key={product.id}
                cols={1}
                // rows={1}
            >
            <img src={product.uri} alt={product.name} style={{ height: '100%' }} />
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

          );
    }

    const renderRow = (product) => {
        return (
            <Card
                className={classes.card}
                key={product.id}
            >
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt={product.name}
                        height="30%"
                        image={product.uri}
                        style={{ height: '100%', width: '100%' }}
                        title={product.name}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {product.name}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2">
                            Rp. {product.price}
                        </Typography>
                        <Button onClick={e => { addToCart(e, product) }}>Pick</Button>
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    }

    return (
        <div className={classes.content}>
            <div className={classes.toolbar} />
            <div className={classes.rightContent}>
                <div className={classes.catalog}>
                    <Tab item={catData}/>
                    <div className={classes.cardContent}>
                        {/* {
                            prodData.map((product, index) => renderRow(product))
                        } */}
                        <GridList cellHeight={360} className={classes.gridList} cols={4} spacing={4}>
                            {
                                prodData.map((product, index) => renderCardGrid(product))
                            }
                        </GridList>
                    </div>
                </div>
                <div className={classes.checkoutContent}>
                    <div className={classes.headerCheckout}>
                        <Typography className={classes.cartText}>
                            Cart
                        </Typography>
                        <Box m={1}>
                            <IconButton aria-label="cart">
                                <StyledBadge1 badgeContent={4} color="primary">
                                    <ShoppingCartIcon />
                                </StyledBadge1>
                            </IconButton>
                        </Box>
                    </div>
                    <div className={classes.listCheckout}>
                        List Checkout
                        <ul>
                            {console.log(cart,'cartdirender')}
                            {(cart.length > 0) &&
                                cart.map((c, index) => (c.name !== "") ?
                                    <Cart name={c.name} price={c.price} image={c.uri} id={c.id} key={index}
                                        unit={c.unit} remove={removeCart} /> : null)
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Catalog;