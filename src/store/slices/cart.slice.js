import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './isLoading.slice';
import { getPurchase } from './purchase.slice';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (state, action) => {
            return action.payload;
        }
    }
})

export const { setCart } = cartSlice.actions;

export const getCart = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/cart', getConfig())
        .then(res => dispatch(setCart(res.data.data.cart.products)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const addToCart = (productAdded) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/cart", productAdded, getConfig())
        .then(() => {
            dispatch(getCart())
            alert("Product added to cart");
        })
        .catch(error => {
            console.log(error.response)
            alert("Theres an error");
        })
        .finally(() => dispatch(setIsLoading(false)));
}

export const buy = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/purchases", {}, getConfig())
        .then(() => {
            dispatch(getPurchase());
            dispatch(setCart([]));
        })
        .finally(() => dispatch(setIsLoading(false)));
}

export const removeFromCart = productId => {
    return dispatch => {
        dispatch(setIsLoading(true));
        return axios.delete(`https://ecommerce-api-react.herokuapp.com/api/v1/cart/${productId}`, getConfig())
            .then(() => dispatch(getCart()))
            .finally(() => setIsLoading(false));
    }
}

export default cartSlice.reducer;
