import React, {useState, useEffect} from 'react';

//material-ui
import { Card, CardContent, CardMedia, IconButton, Typography,
    IndeterminateCheckBoxIcon, AddBoxIcon, Input, } from '@material-ui/core';
import { IndeterminateCheckBox, AddBox } from '@material-ui/icons';
import {makeStyles} from '@material-ui/core/styles'


//redux
import {useDispatch, useSelector} from 'react-redux'

//local file
import {cartChange, removeCart, setPrice} from '../services/redux/actions'


export const useStyles = makeStyles(theme => ({
    card: {
        display: 'flex',
        margin: "3px",
      },
      details: {
        display: 'flex',
        flexDirection: 'column',
      },
      content: {
        flex: '1 0 auto',
      },
      image: {
        width: 170,
        height: 110,
        margin: "5px",
      },
      controls: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: "center"
      },
}));

const Cart = (props) => {
    const classes = useStyles();
    const {id, name, price, qty, image} = props
    const dispatch = useDispatch()
    const detailCart = useSelector(state => state.transaction.productInCart.filter(p => p.id === id)[0])
    const total = useSelector(state => state.transaction.totalPrice)
    const [productinCart, setCart] = useState({
        id,
        name, 
        image,
        price,
        subTotal: price,
        productQty: qty,
    })
    let [interPrice, setInterPrice] = useState(total)

    const order = (e, order, id) => {
        // e.preventDefault()
        if (order === "reduce"){
            if (detailCart.productQty === 1) {
                return dispatch(removeCart(id))
            }
            //global state
            setCart({
                ...productinCart,
                subTotal: productinCart.subTotal - price,
                productQty: productinCart.productQty - 1,
            }, ()=> {})
            setInterPrice(interPrice - price)
        }else {
            setCart({
                ...productinCart,
                subTotal: productinCart.subTotal + price,
                productQty: productinCart.productQty + 1,
            })
            setInterPrice(interPrice + price)
        } 
    } 

    useEffect(()=>{
        dispatch(cartChange(productinCart))
    }, [productinCart])

    useEffect(()=>{
        dispatch(setPrice(interPrice))
    }, [productinCart])

    return (
        <Card className={classes.card}>
          <div className={classes.details}>
            <CardMedia
                className={classes.image}
                image={image}
                alt ={image}
            />
          </div>
          <div className={classes.details}>
              <CardContent className={classes.content}>
                  <Typography variant="subtitle1" color="textSecondary">
                      {name}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                  Rp {detailCart.subTotal}
                  </Typography>
              </CardContent>
              <div className={classes.controls}>
                  
                    <IconButton onClick={e => order(e, "reduce", id)}>
                        <IndeterminateCheckBox color="secondary"></IndeterminateCheckBox>
                    </IconButton>
                    <Input style={
                        {
                            width: "40px",
                            height: "30px",
                            textAlign: "center",
                            borderColor: "#95a5a6",
                            borderStyle: "solid",
                            borderWidth: "3px",
                        }} 
                        value={detailCart.productQty}
                        disabled/>
                    <IconButton onClick={e => order(e, "add", id)}>
                        <AddBox color="primary"></AddBox>
                    </IconButton>
                  
              </div>
          </div>
      </Card>
    )
}

export default Cart;
