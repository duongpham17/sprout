import {
    MY_REVIEW,
    UPDATE_REVIEW,
    DELETE_REVIEW,
} from './types'
import {setAlert} from './alertActions';
import Api from '../routings/Api';

//My Review
export const getMyReview= (limit, page) => async dispatch => {
    try{
        const res = await Api.get(`reviews/myreview?limit=${limit}&page=${page}`);
        dispatch({
            type: MY_REVIEW,
            payload: res.data.review,
            length: res.data.length,
        })
    } catch(err) {
        dispatch(setAlert("Something went wrong. Please reload", 'danger'))
    }
}

// Update My Review
export const updateMyReview= (id, review) => async dispatch => {
    const config = { 
        headers:{
            "Content-Type" : "application/json"
        }
    }
    try{
        const body = {review}
        const res = await Api.patch(`reviews/${id}`, body, config);
        dispatch({
            type: UPDATE_REVIEW,
            payload: res.data.review,
            length: res.data.length
        })
        dispatch(setAlert("Review Update", 'success'))
    } catch(err) {
        dispatch(setAlert("Something went wrong. Please reload", 'danger'))
    }
}

// Delete My Review
export const deleteMyReview = (id) => async dispatch => {
    try{
        const res = await Api.delete(`reviews/${id}`)
        dispatch({
            type: DELETE_REVIEW,
            payload: res.data.review,
            length: res.data.length,
        })
        dispatch(setAlert("Review Deleted", 'success'))
    } catch(err) {
        dispatch(setAlert("Already deleted. Please reload", 'danger'))
    }
}

// Delete All Reviews, if the product gets deleted, /*LINKED to productAction */
export const deleteAllProductReview = (id) => async dispatch => {
    try{
        await Api.delete(`reviews/deleteall/${id}`)
    } catch(err) {
        dispatch(setAlert("Something went wrong. Please reload", 'danger'))
    }
}
