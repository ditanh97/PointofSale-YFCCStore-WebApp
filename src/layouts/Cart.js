import React, { useState } from 'react'
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
    const {id, name, price, qty, uri} = props
    const dispatch = useDispatch()
    const cart = useSelector(state => state.transaction.productInCart)
    const [productinCart, setCart] = useState({
        id,
        name, 
        uri,
        price,
        subTotal: price,
        productQty: qty,
    })
    // const [state, setState] = useState({
    //     productId: props.id,
    //     productQty: props.productQty,
    //     subTotal: props.subTotal
    // })

    const order = (e, order, id) => {
        cart.map(product => {
            if (product.id === id) {
                if (order === "reduce"){
                    if (product.productQty === 1) {
                        return dispatch(removeCart(id))
                    }
                    setCart({
                        ...productinCart,
                        subTotal: productinCart.subTotal - props.price,
                        productQty: productinCart.productQty - 1,
                    })
                }else {
                    setCart({
                        ...productinCart,
                        subTotal: productinCart.subTotal + props.price,
                        productQty: productinCart.productQty + 1,
                    })
                } 
            }
        })
        dispatch(cartChange(productinCart))
    }    
    // const order = (e, action) => {
    //     if (action === "reduce"){
    //         if (state.productQty === 1) {
    //             return props.remove(props.id)
    //         }
    //         setState({
    //             ...state,
    //             subTotal: state.subTotal - props.subTotal,
    //             productQty: state.productQty -1,
                
    //         })
    //     }else {
    //         setState({
    //             ...state,
    //             subTotal: state.subTotal + props.subTotal,
    //             productQty: state.productQty + 1,

    //         })
    //     } 
    // }

    return (
        <div className={classes.card}>
            <img src={uri} alt ={uri} className={classes.imageThumbnail}/>
            <p className={classes.productTitle}>{name}</p>
            <p className={classes.productPrice}>Rp {productinCart.subTotal}</p>
            <div className={classes.counter}>
                <button className={classes.minus} onClick={e => order(e, "reduce")}>-</button>
                <input type="text" value={productinCart.productQty}/>
                <button className={classes.plus} onClick={e=> order(e, "add")}>+</button>
            </div>
        </div>
    )
}

export default (Cart)
