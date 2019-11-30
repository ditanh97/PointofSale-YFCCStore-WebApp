import React, {useState} from 'react'
import {makeStyles, withStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { 
    Card, CardActionArea, 
    CardMedia, CardContent,
    Badge, Box, IconButton, Typography, Button } from '@material-ui/core';
import Cart from './Cart';

const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
    content: {
        width: '100vw',
        height: '100vh',
        backgroundColor: 'yellow',
      },
    rightContent: {
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
    },
    cardContent: {
        backgroundColor: 'red',
        alignItems: 'flex-start',
        width: "70%",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    card: {
        width:"40%",
        margin: "2%",
    },
    checkoutContent: {
        backgroundColor: 'blue',
        alignItems: 'center',
        width: "30%",
        height: '100%',
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
    cartText : {
        textAlign: 'center',
    },
    listCheckout: {
          backgroundColor: 'orange',
          display: 'flex',
          flexDirection: 'column'
    }
}))

const cardObject = [
    {
        id: 1,
        name: "Totebag",
        image: "https://www.trzcacak.rs/myfile/detail/408-4082182_white-cream-tote-bag-png.png",
        price: 45000,
        unit: 50,
    },
        {
        id: 2,
        name: "Totebag",
        image: "https://www.trzcacak.rs/myfile/detail/408-4082182_white-cream-tote-bag-png.png",
        price: 45000,
        unit: 40
    },
    {
        id: 3,
        name: "Totebag",
        image: "https://www.trzcacak.rs/myfile/detail/408-4082182_white-cream-tote-bag-png.png",
        price: 45000,
        unit: 60,
    },
        {
        id: 4,
        name: "Totebag",
        image: "https://www.trzcacak.rs/myfile/detail/408-4082182_white-cream-tote-bag-png.png",
        price: 45000,
        unit: 30,
    },
        {
        id:5,
        name: "Totebag",
        image: "https://www.trzcacak.rs/myfile/detail/408-4082182_white-cream-tote-bag-png.png",
        price: 45000,
        unit: 50,
  },
    {
        id: 6,
        name: "Totebag",
        image: "https://www.trzcacak.rs/myfile/detail/408-4082182_white-cream-tote-bag-png.png",
        price: 45000,
        unit: 45,
    },
]

const StyledBadge1 = withStyles(theme => ({
    badge: {
      right: -3,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }))(Badge);


const Catalog = () => {
    const classes = useStyles();
    const [cart, setCart] = useState([{
            id: 0,
            name: '',
            price: 0,
            image:'',
            unit: 0,
    }])

    const addToCart = (e, item) => {
        const existingList = cart.filter (p => p.id === item.id)
        if (existingList.length > 0){
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

    const renderRow = (product) => {
        return (
          <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt={product.name}
              height="30%"
              image={product.image}
              style={{height: '100%', width: '100%'}}
              title={product.name}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                  {product.name}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                Rp. {product.price}
              </Typography>
              <Button onClick={e => {addToCart(e, product)}}>Pick</Button>
            </CardContent>
          </CardActionArea>
        </Card>
        )
    }

    return (
        <div className={classes.content}>
            <div className={classes.toolbar} />
            <div className={classes.rightContent}>
                <div className={classes.cardContent}>
                    {
                        cardObject.map((product, index) => renderRow(product))
                    }
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
                            {
                            cart.map(c => (c.name !== "") ? <Cart name={c.name} price={c.price} image={c.image} unit={c.unit}/> : null)   
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Catalog;