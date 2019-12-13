import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../services/redux/actions';
import Home from './Home';



export const Authentication = (props) => {

    const product = useSelector(state => state.product);
    const dispatch = useDispatch();

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
            props.history.push('/');

        } else {
            const getData = async () => {
                await dispatch(getProducts())
            }
            getData();

        }
    }, [])

    if (product.productList.length > 0) {
        return (
            <Home />
        );
    } else if (product.isLoading) {
        return(
            <div>
                isloadding...
            </div>

        )
    }
    return (
        <div>
            <p>you are not allowed</p>
        </div>
    )
}


export default (withRouter(Authentication));