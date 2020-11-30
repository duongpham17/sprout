import {
    STATS_PRODUCTS,
    STATS_SUPPLIERS
} from './types'
import Api from '../routings/Api'
const url = process.env.REACT_APP_WEBSITE_URL

// Top Products
export const getTopProducts = (limit, region, sort) => async dispatch => {
    const res = await Api.get(`${url}stats/top-products?limit=${limit}&region=${region}&sort=${sort}`);
    dispatch({
        type: STATS_PRODUCTS,
        payload: res.data.product
    })
}

// Trending Products
export const getTrendingProducts = (limit, region, sort, day) => async dispatch => {
    const res = await Api.get(`${url}stats/trending-products?limit=${limit}&region=${region}&sort=${sort}&days=${day}`);
    dispatch({
        type: STATS_PRODUCTS,
        payload: res.data.product
    })
}

// Top Suppliers
export const getTopSuppliers = (limit, region, sort) => async dispatch => {
    const res = await Api.get(`${url}stats/top-suppliers?limit=${limit}&region=${region}&sort=${sort}`);
    dispatch({
        type: STATS_SUPPLIERS,
        payload: res.data.product
    })
}

// Trending Suppliers
export const getTrendingSuppliers = (limit, region, sort, day) => async dispatch => {
    const res = await Api.get(`${url}stats/trending-suppliers?limit=${limit}&region=${region}&sort=${sort}&days=${day}`);
    dispatch({
        type: STATS_SUPPLIERS,
        payload: res.data.product
    })
}
