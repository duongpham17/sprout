import {
    SIGNUP,
    SIGNUP_CONFIRM, 
    LOGIN,
    LOGOUT, 
    USER_LOADED, 
    UPDATE_MY_PASSWORD,
    UPDATE_MY_EMAIL,
    SEND_FORGOTTEN_PASSWORD_EMAIL,
    TRYAGAIN_SEND_FORGOTTEN_PASSWORD_EMAIL,
    RESET_PASSWORD,
} from './types'
import {setAlert} from './alertActions'
import Api from '../routings/Api'

//Loaduser that has already login and has not logged out
export const loadUser = () => async dispatch => {
    try{
        const res = await Api.get(`/users`);
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
        console.log('User Logged in. Welcome and Enjoy :D')
    } catch(err) {
        console.log('%c Log into get access :(', 'color: #4fd680')
    }
}

//LOGIN 
export const login = (email, password) => async dispatch => {
    try{
        const config = { 
            headers:{
                "Content-Type" : "application/json"
            }
        };
        const body = {email, password};
        const res = await Api.post(`/users/login`, body, config);
        dispatch({
            type: LOGIN,
            payload: res.data.user
        })
        dispatch(setAlert('Login Successful', 'success'))
    } catch(err) {
        dispatch(setAlert(err.response.data.message || err.response.data, 'danger'))
    }
}

//signup
export const signup = (formData) => async dispatch => {
    try{
        const config = { 
            headers:{
                "Content-Type" : "application/json"
            }
        };
        const res = await Api.post(`/users/signup`, formData, config);
        dispatch({
            type: SIGNUP,
            payload: res.data.user
        })
    } catch(err) {
        console.log(err.response)
        dispatch(setAlert(`${err.response.data.message}`, 'danger'))
    }
}

//signup confirm
export const signupConfirm = (formData) => async dispatch => {
    try{
        const config = { 
            headers:{
                "Content-Type" : "application/json"
            }
        };
        const res = await Api.post(`/users/signup/confirm`, formData, config);
        dispatch({
            type: SIGNUP_CONFIRM,
            payload: res.data.user
        })
        dispatch(setAlert('Welcome to Sprout', 'success'))
    } catch(err) {
        dispatch(setAlert(`${err.response.data.message}`, 'danger'))
    }
}

//LOGOUT
export const logout = () => async dispatch => {
    try {
        await Api.get(`/users/logout`)
        dispatch({
            type: LOGOUT
        })
        dispatch(setAlert('Logged out successful', 'success'))
    } catch (err) {
        dispatch(setAlert('Something went wrong... Try again', 'danger'))
    }
}

//Update Password 
export const updateMyPassword = (passwordCurrent, password) => async dispatch => {
    try{
        const config = { 
            headers:{
                "Content-Type" : "application/json"
            }
        };
        const body = {passwordCurrent, password};
        await Api.patch(`/users/password`, body, config)
        dispatch({
            type: UPDATE_MY_PASSWORD
        })
        dispatch(setAlert('Successfully Changed Password.', 'success'))
    } catch (err) {
        dispatch(setAlert('Passwords does not match', 'danger'))
    }
}

//Update Email
export const updateMyEmail = (passwordCurrent, email) => async dispatch => {
    try{
        const config = { 
            headers:{
                "Content-Type" : "application/json"
            }
        };
        const body = {passwordCurrent, email};
        await Api.patch(`/users/email`, body, config)
        dispatch({
            type: UPDATE_MY_EMAIL
        })
        dispatch(setAlert('Successfully Changed Login Email.', 'success'))
    } catch (err) {
        dispatch(setAlert(err.response.status === 500 ? "Email Already Taken." : err.response.data.message, 'danger'))
    }
}

//Send forgotten password
export const forgottenPassword = (email) => async dispatch => {
    try{
        const config = { 
            headers:{
                "Content-Type" : "application/json"
            }
        };
        const body = {email};
        await Api.post(`/users/forgotpassword`, body, config)
        dispatch({
            type: SEND_FORGOTTEN_PASSWORD_EMAIL
        })
        dispatch(setAlert(`Email Sent. Check your Junk aswell.`, 'success'))
    } catch (err) {
        dispatch(setAlert(err.response.data.message || err.response.data, 'danger'))
    }
}

//let user send email again
export const tryAgain = () => async dispatch => {
    dispatch({
        type: TRYAGAIN_SEND_FORGOTTEN_PASSWORD_EMAIL
    })
}

//reset url
export const resetPassword = (id, password) => async dispatch => {
    try{
        const config = { 
            headers:{
                "Content-Type" : "application/json"
            }
        };
        const body = {password};
        const res = await Api.patch(`/users/resetpassword/${id}`, body, config)
        dispatch({
            type: RESET_PASSWORD,
            payload: res.data.password
        })
        dispatch(setAlert(`Password Updated`, 'success'))
    } catch (err) {
        dispatch(setAlert(err.response.data.message, 'danger'))
    }
}

