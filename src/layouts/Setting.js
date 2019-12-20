import React, {useEffect} from 'react'
import { makeStyles,  } from '@material-ui/core/styles';
import {useSelector, useDispatch} from 'react-redux';
import {successAlert, infoAlert, warningAlert} from '../services/redux/actions'

const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
    content: {
        width: '100vw',
        height: '100vh',
        backgroundColor: 'yellow',
    },
}))

const Setting = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const prodData = useSelector(state => state.product.productList)
    const isConfirm = useSelector(state => state.alert.isConfirm)

    const handleClick = () => {
        dispatch(successAlert("Ya kamu berhasil"))
    }

    const handleClick2 = () => {
        dispatch(warningAlert("Ya kamu berhasil"))
    }

    useEffect(() => {
        if (isConfirm) console.log("confirm")
    }, [isConfirm])

    return (
        <div className={classes.content}>
            <div className={classes.toolbar} />
            <button onClick={handleClick}>Click toast</button>
            <button onClick={handleClick2}>Click toast info</button>
        </div>
    )
}


export default Setting;