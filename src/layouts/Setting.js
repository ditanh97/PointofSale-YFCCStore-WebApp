import React from 'react'
import { makeStyles,  } from '@material-ui/core/styles';
import {useSelector, useDispatch} from 'react-redux';
import {successAlert} from '../services/redux/actions'

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

    const handleClick = () => {
        dispatch(successAlert("Ya kamu berhasil"))
    }

    return (
        <div className={classes.content}>
            <div className={classes.toolbar} />
            <button onClick={handleClick}>Click toast</button>
        </div>
    )
}


export default Setting;