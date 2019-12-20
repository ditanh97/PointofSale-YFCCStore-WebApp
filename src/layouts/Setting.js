import React from 'react'
import { makeStyles,  } from '@material-ui/core/styles';
import {useSelector, useDispatch} from 'react-redux';
import Toast from '../components/Toast'

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
    const prodData = useSelector(state => state.product.productList)

    return (
        <div className={classes.content}>
            <div className={classes.toolbar} />
            <Toast/>
        </div>
    )
}


export default Setting;