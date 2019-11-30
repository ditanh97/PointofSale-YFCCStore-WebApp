import React, { useState } from 'react'
import {makeStyles} from '@material-ui/core/styles'
// import {getProductsById} from '../../../services/redux/actions'

// import {useDispatch, useSelector} from 'react-redux';
/*
panggil Cart ini setelah di pick berdasarkan id,
lalu id ini digunakan untuk getProduct 1 bijik (getProduct), dan update 
jumlah transaksi di admin (updateTransaction), dan update jumlah stock yang tersedia (updateStock).
*/

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
    // const admin = useSelector(state => state.admin);
    // const product = useSelector(state => state.product);
    // const dispatch = useDispatch();

    // const [state, setState] = useState({
    //     image: '',
    //     name: '',
    //     price: '',
    //     total: '',
    // })
    // useEffect( () => {
    //     const getOneProduct = async () => {
    //         await dispatch (getProductsById (props.id))
    //         const data = product.productById
    //         setState({image: data.image,
    //         name: data.name,
    //         price: data.price,
    //     })
    //     };
    //     getOneProduct();
    // }, [props.id]) 
    const classes = useStyles();
    return (
        <div className={classes.card}>
            <img src={props.image} alt ={props.image} className={classes.imageThumbnail}/>
            <p className={classes.productTitle}>{props.name}</p>
            <p className={classes.productPrice}>Rp {props.price}</p>
            <div className={classes.counter}>
                <button className={classes.minus}>-</button>
                <input type="text" value={props.unit}/>
                <button className={classes.plus}>+</button>
            </div>
        </div>
    )
}

export default (Cart)
