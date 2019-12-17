import React, { useState, useEffect } from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {useDispatch, useSelector} from 'react-redux';
import {cartChange, removeCart} from '../services/redux/actions'


const useStyles = makeStyles(theme => ({
    card: {
        display : 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    imageThumbnail: {
        width: "40%",
        height: "40%",
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
        
    },
}))

const Cart = (props) => {
    const classes = useStyles();
    const {id, name, price, qty, image} = props
    const dispatch = useDispatch()
    const cart = useSelector(state => state.transaction.productInCart.filter)
    const [productinCart, setCart] = useState({
        id,
        name, 
        image,
        price,
        subTotal: price,
        productQty: qty,
    })


    useEffect(()=> {
        console.log("cart is updated")
    }, [cart])

    const order = (e, order, id) => {
        e.preventDefault()
        cart.map(product => {
            if (product.id === id) {
                 if (order === "reduce"){
                    if (product.productQty === 1) {
                        console.log('jtajaj')
                        return dispatch(removeCart(id))
                    }
                    //global state
                    setCart({
                        ...productinCart,
                        subTotal: productinCart.subTotal - price,
                        productQty: productinCart.productQty - 1,
                    })
                }else {
                    setCart({
                        ...productinCart,
                        subTotal: productinCart.subTotal + price,
                        productQty: productinCart.productQty + 1,
                    })
                } 
            }
        })
        console.log('productbeforedispatch', productinCart)
        dispatch(cartChange(productinCart))
        console.log('productafterdispatch', productinCart)
    }    
    return (
        <div className={classes.card}>
            <img src={image} alt ={image} className={classes.imageThumbnail}/>
            <p className={classes.productTitle}>{name}</p>
            <p className={classes.productPrice}>Rp {productinCart.subTotal}</p>
            <div className={classes.counter}>
                <button className={classes.minus} onClick={e => order(e, "reduce", id)}>-</button>
                <input type="text" value={productinCart.productQty}/>
                <button className={classes.plus} onClick={e=> order(e, "add", id)}>+</button>
            </div>
        </div>
    )
}

export default (Cart)
