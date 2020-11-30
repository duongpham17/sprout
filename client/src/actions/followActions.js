import {
    FOLLOW,
    GET_FOLLOWS,
    UNFOLLOW,
    GET_LATEST_FOLLOW_PRODUCT,
    SEARCH_BAR_FOR_SHOPNAME,
} from './types'
import {setAlert} from './alertActions'
import Api from '../routings/Api'

//Follow users
export const Follow = (id) => async dispatch => {
    const config = {
        headers: {
            "Content-Type" : "application/json"
        }
    }
    try {
        const res = await Api.post(`/follows/${id}`, config);
        dispatch({
            type: FOLLOW,
            payload: res.data.follow
        })
        dispatch(setAlert('Followed', 'success'))
    } catch (err) {
        dispatch(setAlert("Already Following :)", 'primary'))
    }
}

//Get Following List
export const getMyFollowings = () => async dispatch => {
    try {
        const res = await Api.get(`/follows/user`);
        dispatch({
            type: GET_FOLLOWS,
            payload: res.data.follow
        })
    } catch (err) {
        dispatch(setAlert('Error, Please reload.', 'primary'))
    }
}

//UnFollow
export const unFollow = (id) => async dispatch => {
    try {
        const res = await Api.delete(`/follows/un/${id}`);
        dispatch({
            type: UNFOLLOW,
            payload: res.data.follow
        })
        dispatch(setAlert('Unfollowed', 'primary'))
    } catch (err) {
        dispatch(setAlert('Error, Please reload.', 'primary'))
    }
}

//get latest following post
export const getLatestFollowProduct = (limit) => async dispatch => {
    try {
        const res = await Api.get(`/follows/latest?limit=${limit}`);
        dispatch({
            type: GET_LATEST_FOLLOW_PRODUCT,
            payload: res.data.follow,
            length: res.data.length
        })
    } catch (err) {
        dispatch(setAlert('Error, Please reload.', 'primary'))
    }
}

//search bar for shop name
export const searchBarForShopname = (shop) => async dispatch => {
    try {
        const res = await Api.get(`/follows/shops/${shop}`);
        dispatch({
            type: SEARCH_BAR_FOR_SHOPNAME,
            payload: res.data.follow
        })
    } catch (err) {
        dispatch(setAlert('Error, Please reload.', 'primary'))
    }
}


