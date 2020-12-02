import {
    USER_DATA,
} from './types';
import {setAlert} from './alertActions';
import Api from '../routings/Api'

//Load user Data
export const userData = () => async dispatch => {
    try{
        const res = await Api.get(`/users/data`)
        dispatch({
            type: USER_DATA,
            payload: res.data.user,
            role: res.data.role
        })
    } catch(err) {
        console.log("Internet Issue")
    }
}

//update avatar
export const updateAvatar = (avatar) => async dispatch => {
    try{
        const config = { 
            headers:{
                "Content-Type" : "application/json"
            }
        };
        const body = {avatar}
        const res = await Api.patch(`/users/me`, body, config);
        dispatch({
            type: USER_DATA,
            payload: res.data.user
        })
        dispatch(setAlert('Updated Avatar', 'primary'))
    } catch(err) {
        dispatch(setAlert('Please reload. Or. Check Your Internet', 'primary'))
    }
}

//update shop name
export const updateUserInformation= (formData) => async dispatch => {
    try{
        const config = { 
            headers:{
                "Content-Type" : "application/json"
            }
        };
        const res = await Api.patch(`/users/me`, formData, config);
        dispatch({
            type: USER_DATA,
            payload: res.data.user
        })
        dispatch(setAlert('Updated!', 'success'))
    } catch(err) {
        dispatch(setAlert('Name has been taken. Please pick another name.', 'primary'))
    }
}

//AddSocial
export const addSocial = (app) => async dispatch => {
    const config = { 
        headers:{
            "Content-Type" : "application/json"
        }
    }
    try {
        const body = {app}
        const res = await Api.put(`/users/social`, body, config);
        dispatch({
            type: USER_DATA,
            payload: res.data.user
        })
        dispatch(setAlert('Social Added :D', 'success'))
    } catch (err) {
        dispatch(setAlert(err.response.data.message, 'primary'))
    }
}

//Delete social
export const deleteSocial = (id) => async dispatch => {
    try {
        const res = await Api.delete(`/users/social/${id}`);
        dispatch({
            type: USER_DATA,
            payload: res.data.user
        })
        dispatch(setAlert('Social Link has been deleted', 'success'))
    } catch (err) {
        dispatch(setAlert('Social Link has already been deleted. Please reload for changes.', 'primary'))
    }
};


//favourite a product
export const favourite = id => async dispatch => {
    try {
        const res = await Api.put(`/users/favourite/${id}`);
        dispatch({
            type: USER_DATA,
            payload: res.data.user
        })
        dispatch(setAlert('Product has been favourited :D', 'success'))
    } catch (err) {
        dispatch(setAlert(err.response.data.message, 'primary'))
    }
};

//delete favourite
export const favouriteDelete = (id) => async dispatch => {
    try {
        const res = await Api.delete(`/users/favourite/${id}`);
        dispatch({
            type: USER_DATA,
            payload: res.data.user
        })
        dispatch(setAlert('Favourite has been deleted', 'success'))
    } catch (err) {
        dispatch(setAlert('System error. Please reload.', 'primary'))
    }
};

export const paymentOptions = (paymentForm) => async dispatch => {
    const config = {
        headers: {
            "Content-Type" : "application/json"
        }
    }
    try{
        const res = await Api.patch(`/users/payment`, paymentForm, config)
        dispatch({
            type: USER_DATA,
            payload: res.data.user
        })
        dispatch(setAlert('Payment Options Updated!', 'success'))
    } catch (err) {
        dispatch(setAlert('Please Check Your Internet. Or Reload', "primary"))
    }
}

//get business address
export const updateBusinessInformation = (formData) => async dispatch => {
    const config = { 
        headers:{
            "Content-Type" : "application/json"
        }
    };
    try {
        const res = await Api.patch(`/users/business`, formData, config);
        dispatch({
            type: USER_DATA,
            payload: res.data.user
        })
        dispatch(setAlert('Business And Contacts Updated!', 'success'))
    } catch (err) {
        dispatch(setAlert('System error. Please reload.', 'primary'))
    }
};

//add buyer address
export const addBuyerAddress = (formData) => async dispatch => {
    const config = { 
        headers:{
            "Content-Type" : "application/json"
        }
    };
    try {
        const res = await Api.put(`/users/address`, formData, config);
        dispatch({
            type: USER_DATA,
            payload: res.data.user
        })
        dispatch(setAlert('Address Saved', 'success'))
    } catch (err) {
        dispatch(setAlert(err.response.data.message, 'primary'))
    }
}

//add buyer address
export const deleteBuyerAddress = (id) => async dispatch => {
    try {
        const res = await Api.delete(`/users/address/${id}`);
        dispatch({
            type: USER_DATA,
            payload: res.data.user
        })
        dispatch(setAlert('Address Deleted', 'success'))
    } catch (err) {
        dispatch(setAlert('System error. Please reload.', 'primary'))
    }
}

//report products
export const report = (id, userId) => async dispatch => {
    const config = { 
        headers:{
            "Content-Type" : "application/json"
        }
    };
    try {
        await Api.post(`/users/report/${id}/${userId}`, config);
        dispatch(setAlert('Reported. Thank You.', 'success'))
    } catch (err) {
        dispatch(setAlert('You have already reported this. Thank You.', 'primary'))
    }
}


//contact website
export const contactMe = (data) => async dispatch => {
    const config = { 
        headers:{
            "Content-Type" : "application/json"
        }
    };
    try {
        const res = await Api.post(`/users/contact`, data, config);
        dispatch(setAlert(res.data.message, 'success'))
    } catch (err) {
        dispatch(setAlert(err.response.data, 'primary'))
    }
}

//let user send a suggestion
export const suggestion = (data) => async dispatch => {
    const config = { 
        headers:{
            "Content-Type" : "application/json"
        }
    };
    try {
        await Api.post(`/users/suggest`, data, config);
        dispatch(setAlert('Message Sent. Thank You.', 'success'))
    } catch (err) {
        dispatch(setAlert('Error. Please try again later.', 'primary'))
    }
}
