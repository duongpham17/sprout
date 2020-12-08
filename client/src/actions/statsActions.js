import {
    STATS_PRODUCTS,
    STATS_SUPPLIERS,
    TOTAL_PRODUCTS_BY_REGION
} from './types'
import Api from '../routings/Api'

// Top Products
export const getTopProducts = (limit, region, sort) => async dispatch => {
    const res = await Api.get(`/stats/top-products?limit=${limit}&region=${region}&sort=${sort}`);
    dispatch({
        type: STATS_PRODUCTS,
        payload: res.data.product
    })
}

// Trending Products
export const getTrendingProducts = (limit, region, sort, day) => async dispatch => {
    const res = await Api.get(`/stats/trending-products?limit=${limit}&region=${region}&sort=${sort}&days=${day}`);
    dispatch({
        type: STATS_PRODUCTS,
        payload: res.data.product
    })
}

// Top Suppliers
export const getTopSuppliers = (limit, region, sort) => async dispatch => {
    const res = await Api.get(`/stats/top-suppliers?limit=${limit}&region=${region}&sort=${sort}`);
    dispatch({
        type: STATS_SUPPLIERS,
        payload: res.data.product
    })
}

// Trending Suppliers
export const getTrendingSuppliers = (limit, region, sort, day) => async dispatch => {
    const res = await Api.get(`/stats/trending-suppliers?limit=${limit}&region=${region}&sort=${sort}&days=${day}`);
    dispatch({
        type: STATS_SUPPLIERS,
        payload: res.data.product
    })
}

// Total Products by region
export const totalProductsByRegion = () => async dispatch => {
    const res = await Api.get(`/stats/products/region`);
    dispatch({
        type: TOTAL_PRODUCTS_BY_REGION,
        payload: res.data.product
    })
}
