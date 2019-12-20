import React, { useState, } from 'react'
import {makeStyles} from '@material-ui/core/styles'
import  {Button, Input,} from '@material-ui/core'
import {useDispatch, useSelector} from 'react-redux';
import {cartChange, removeCart, setPrice} from '../services/redux/actions'


const useStyles = makeStyles(theme => ({
    card: {
        display : 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    imageThumbnail: {
        width: "100%",
        height: "100%",
        alignItems: 'center'
    },
    productTitle: {
        color: 'grey',
        fontSize: 24,
        textAlign: 'center'
    },
    productPrice: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    counter:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'lightblue'
    },
    minus: {
        backgroundColor: 'yellowgreen',
    },
    plus: {
        backgroundColor: 'yellowgreen',
    },
}))

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
        if (order === "reduce"){
            if (detailCart.productQty === 1) {
                return dispatch(removeCart(id))
            }
            //global state
            setCart({
                ...productinCart,
                subTotal: productinCart.subTotal - price,
                productQty: productinCart.productQty - 1,
            })
            setInterPrice(interPrice - price)
        }else {
            setCart({
                ...productinCart,
                subTotal: productinCart.subTotal + price,
                productQty: productinCart.productQty + 1,
            })
            setInterPrice(interPrice + price)
        } 
        dispatch(cartChange(productinCart))
        dispatch(setPrice(interPrice))
    }    
    return (
        <div className={classes.card}>
            <img src={image} alt ={image} className={classes.imageThumbnail}/>
            <p className={classes.productTitle}>{name}</p>
            <p className={classes.productPrice}>Rp {detailCart.subTotal}</p>
            <div className={classes.counter}>
                <Button className={classes.minus} onClick={e => order(e, "reduce", id)}>-</Button>
                <Input type="text" value={detailCart.productQty} disabled/>
                <Button className={classes.plus} onClick={e=> order(e, "add", id)}>+</Button>
            </div>
        </div>
    )
}

export default (Cart)
