import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from "./isLoading.slice";

export const purchaseSlice = createSlice({
    name: 'purchase',
    initialState: [],
    reducers: {
        setPurchase: (state, action) => {
            return action.payload;
        }
    }
})

export const { setPurchase } = purchaseSlice.actions;

export const getPurchase = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/purchases", getConfig())
        .then(res => dispatch(setPurchase(res.data.data.purchases)))
        .finally(() => dispatch(setIsLoading(false)));
}

export default purchaseSlice.reducer;
