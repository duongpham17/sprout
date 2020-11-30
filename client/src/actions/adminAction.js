import {
    GET_USER_DATA,
    GET_PRODUCT_DATA,
    DELETE_DATA,
    GET_USER_PRODUCTS_DATA,
    CREATE_USER,
    GET_TICKET,
    UPDATE_TICKET,
    GET_SUGGESTION,
    GET_REPORTED_PRODUCTS
} from './types'
import Api from '../routings/Api';
import {setAlert} from './alertActions';
const url = process.env.REACT_APP_WEBSITE_URL

//Get Ticket
export const getTicket = (id) => async dispatch => {
    try{
        const res = await Api.get(`${url}admins/ticket/${id}`);
        dispatch({
            type: GET_TICKET,
            payload: res.data.ticket
        })
    } catch(err) {
        dispatch(setAlert("Ticket does not exist", "danger"))
    }
}

export const updateTicket = (id, amount) => async dispatch => {
    const config = {
        headers:{
            "Content-Type" : "application/json"
        }
    }
    try{
        const body = {amount}
        const res = await Api.patch(`${url}admins/ticket/${id}`, body, config);
        dispatch({
            type: UPDATE_TICKET,
            payload: res.data.ticket
        })
        dispatch(setAlert("Ticket Date Extended.", "success"))
    } catch(err) {
        dispatch(setAlert("Ticket does not exist", "danger"))
    }
}


//Create User
export const createUser = (data) => async dispatch => {
    const config = {
        headers: {
            "Content-Type" : "application/json"
        }
    }
    try{
        await Api.post(`/admins/users`, data, config);
        dispatch({
            type: CREATE_USER,
        })
        dispatch(setAlert("Created new member", "success"))
    } catch(err) {
        dispatch(setAlert("Email has been taken", "danger"))
    }
}

//Get User With Id
export const getUserWithId = (id) => async dispatch => {
    try{
        const res = await Api.get(`/admins/user-id/${id}`);
        dispatch({
            type: GET_USER_DATA,
            payload: res.data.user
        })
    } catch(err) {
        dispatch(setAlert('No user found with this ID try Email', "danger"))
    }
}

//Get User with Email
export const getUserWithEmail = (id) => async dispatch => {
    try{
        const res = await Api.get(`${url}admins/user-email/${id}`);
        dispatch({
            type: GET_USER_DATA,
            payload: res.data.user
        })
    } catch(err) {
        dispatch(setAlert('No user found with this Email try ID.', "danger"))
    }
}


//Update User
export const updateUser = (id, data) => async dispatch => {
    const config = {
        headers:{
            "Content-Type" : "application/json"
        }
    };
    try{
        const res = await Api.patch(`${url}admins/user/${id}`, data, config);
        dispatch({
            type: GET_USER_DATA,
            payload: res.data.user
        })
        dispatch(setAlert("Updated User Information", 'success'))
    } catch(err) {
        dispatch(setAlert(err.response.data.error.codeName === "DuplicateKey" ? "Email Has Been Taken" : "Error Updating User", "danger"))
    }
}

//Get user products
export const getUserProducts = (id) => async dispatch => {
    try{
        const res = await Api.get(`${url}admins/user-products/${id}`);
        dispatch({
            type: GET_USER_PRODUCTS_DATA,
            payload: res.data.product
        })
    } catch(err) {
        dispatch(setAlert("User No Longer Exist." ,"danger"))
    }
}

//Delete User
export const deleteUser = (id) => async dispatch => {
    try{
        await Api.delete(`/admins/delete-user/${id}`);
        dispatch({
            type: DELETE_DATA
        })
        dispatch(setAlert("Deleted User", 'success'))
    } catch(err) {
        dispatch(setAlert("User No Longer Exist." ,"danger"))
    }
}

//Get Product with Id
export const getProductWithId = (id) => async dispatch => {
    try{
        const res = await Api.get(`${url}admins/product-id/${id}`);
        dispatch({
            type: GET_PRODUCT_DATA,
            payload: res.data.product
        })
    } catch(err) {
        dispatch(setAlert('No Product found with this ID.', "danger"))
    }
}

//delete product
export const deleteProduct = (id) => async dispatch => {
    try{
    await Api.delete(`${url}admins/delete-product/${id}`);
    dispatch({
        type: DELETE_DATA,
    })
    dispatch(setAlert("Deleted Product", 'success'))
    } catch(err){
        dispatch(setAlert("Product No Longer Exist", 'danger'))
    }
}

//delete product image
export const deleteProductReviews = (id, productId) => async dispatch => {
    try{
        const res = await Api.delete(`${url}admins/delete-reviews/${id}/${productId}`);
        dispatch({
            type: GET_PRODUCT_DATA,
            payload: res.data.product
        })
    } catch(err){
        dispatch(setAlert("Product No Longer Exist", 'danger'))
    }
}

//get Suggestion
export const getSuggestion = (page) => async dispatch => {
    try{
        const res = await Api.get(`${url}admins/suggest?page=${page}`);
        dispatch({
            type: GET_SUGGESTION,
            payload: res.data.suggest
        })
    } catch(err){
        dispatch(setAlert("Suggestion", 'danger'))
    }
}

//clean Suggestions
export const cleanSuggestion = () => async dispatch => {
    try{
        const res = await Api.delete(`${url}admins/suggest`);
        dispatch({
            type: GET_SUGGESTION,
            payload: res.data.suggest
        })
    } catch(err){
        dispatch(setAlert("Product No Longer Exist", 'danger'))
    }
}

//get reported products
export const getReportedProducts = (num) => async dispatch => {
    try{
        const res = await Api.get(`${url}admins/reports?report=${num}`);
        dispatch({
            type: GET_REPORTED_PRODUCTS,
            payload: res.data.product
        })
    } catch(err){
        dispatch(setAlert("Product No Longer Exist", 'danger'))
    }
}

//clear product reports
export const clearProductsReports = (id) => async dispatch => {
    try{
        const res = await Api.delete(`${url}admins/reports/${id}`);
        dispatch({
            type: GET_PRODUCT_DATA,
            payload: res.data.product
        })
        dispatch(setAlert("Reports Cleared.", 'success'))
    } catch(err){
        dispatch(setAlert(err.response.data.message, 'danger'))
    }
}
