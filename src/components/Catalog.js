import React from 'react'
import {makeStyles, withStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { 
    Card, CardActionArea, 
    CardMedia, CardContent,
    Badge, Box, IconButton, Typography } from '@material-ui/core';


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
    }
}))

const cardObject = [
    {
        name: "Totebag",
        image: "https://www.trzcacak.rs/myfile/detail/408-4082182_white-cream-tote-bag-png.png",
        price: 45000
    },
        {
        name: "Totebag",
        image: "https://www.trzcacak.rs/myfile/detail/408-4082182_white-cream-tote-bag-png.png",
        price: 45000
    },
    {
        name: "Totebag",
        image: "https://www.trzcacak.rs/myfile/detail/408-4082182_white-cream-tote-bag-png.png",
        price: 45000
    },
        {
        name: "Totebag",
        image: "https://www.trzcacak.rs/myfile/detail/408-4082182_white-cream-tote-bag-png.png",
        price: 45000
    },
    {
      name: "Totebag",
      image: "https://www.trzcacak.rs/myfile/detail/408-4082182_white-cream-tote-bag-png.png",
      price: 45000
  },
  {
    name: "Totebag",
    image: "https://www.trzcacak.rs/myfile/detail/408-4082182_white-cream-tote-bag-png.png",
    price: 45000
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

    const renderRow = (product) => {
        return (
          <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt={product.name}
              height="30%"
              image={{uri: product.image}}
              title={product.name}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                  {product.name}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                {product.price}
              </Typography>
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Catalog;