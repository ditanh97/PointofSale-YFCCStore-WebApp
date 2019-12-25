import React, {useState, useEffect} from 'react'
import clsx from 'clsx'
import {DialogContent, DialogTitle, Dialog, Button, Paper, Typography, GridList} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {useSelector, useDispatch} from 'react-redux'
import {getCurrentDate} from '../services/helpers'
import {clearBill} from '../services/redux/actions'

const useStyles = makeStyles(theme => ({
    title: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },
    content: {
        flexDirection: 'column',
        marginBottom: 20
    },
    billStatus:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text : {
        textAlign: 'center'
    },
    field : {
        display: 'flex',
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    lineStyle: {
        borderBottomWidth: 10,
        borderBottomColor: '#E8CF78'
    },
    totalStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
}))

export const ReciptModal = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()
    const billDetail = useSelector(state => state.transaction.recentRecipt);
    const billTotal = useSelector(state => state.transaction.billTotal);
    const orderID =  useSelector(state => state.transaction.orderId);
    const cashier = localStorage.getItem('user');

    const handleCLickOpen =  () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        dispatch(clearBill())
    }

    useEffect(()=>{
         if (props.open) handleCLickOpen()
    }, [props.open])

    return (
        <div>
            {/* <Button onClick={handleCLickOpen}>show recipt</Button> */}
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>
                    <Typography variant="h4" className={classes.text}>
                        YFCC GREEN STORE    
                    </Typography>
                    <Typography variant="h5"  className={classes.text}>
                        RECIPT BILL     
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Paper className={classes.content} style={{backgroundColor:"#DBCDC6"}}>
                        <div>
                            <div>
                                <div className={classes.billStatus}>
                                    <Typography className={classes.text}>ID Order: {orderID}</Typography>
                                    <Typography className={classes.text}>Date: {getCurrentDate()}</Typography>
                                </div>
                                <Typography>Cashier: {cashier}</Typography>
                            </div>
                            <br/>
                            <div >
                            <GridList cellHeight={20} cols={1} spacing={4}>
                                    <div className={clsx(classes.field, classes.lineStyle)}>
                                        {["Product", "Price", "Qty", "Subtotal"].map((title, i) => (
                                            <Typography key={i} className={classes.text}>{title}</Typography>
                                        ))}
                                    </div>
                                    {billDetail.map(p => (
                                        <div className={classes.field}>
                                            <Typography className={classes.text}>
                                                {p.product_name}
                                            </Typography>
                                            <Typography className={classes.text}>
                                                {p.price}
                                            </Typography>
                                            <Typography className={classes.text}>
                                                {p.qty}
                                            </Typography>
                                            <Typography className={classes.text}>
                                                {p.subTotal}
                                            </Typography>
                                        </div>
                                    ))}
                                    <div className={classes.totalStyle}>
                                        <Typography variant="subtitle1" className={classes.text}>TOTAL </Typography>
                                        <Typography>{billTotal}</Typography>
                                    </div>
                            </GridList>
                            <br/>
                            </div>
                            <Typography variant="h6" className={classes.text}>Thanks for shopping with us</Typography>
                        </div>
                    </Paper>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ReciptModal
