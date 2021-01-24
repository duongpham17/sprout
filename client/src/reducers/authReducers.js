import {
    USER_LOADED,
    SIGNUP,
    SIGNUP_CONFIRM, 
    LOGIN, 
    LOGOUT, 
    UPDATE_MY_PASSWORD,
    UPDATE_MY_EMAIL,
    SEND_FORGOTTEN_PASSWORD_EMAIL,
    TRYAGAIN_SEND_FORGOTTEN_PASSWORD_EMAIL,
    RESET_PASSWORD,
} from '../actions/types'

const initialState = {
    user: {},
    loggedOn: false,
    loading: true,
    sent: false,
    confirm: false,
}

export default function(state = initialState, action){
    const {type, payload} = action;
    
    switch(type){
        case SIGNUP:
            return {
                ...state,
                confirm: true
            }
            
        case USER_LOADED:
        case LOGIN:
        case SIGNUP_CONFIRM:
        case RESET_PASSWORD:
        case UPDATE_MY_PASSWORD:
        case UPDATE_MY_EMAIL:
            return {
                ...state,
                user: payload,
                loggedOn: true,
                loading: false
            }

        case SEND_FORGOTTEN_PASSWORD_EMAIL:
            return{
                ...state,
                sent: true
            }

        case TRYAGAIN_SEND_FORGOTTEN_PASSWORD_EMAIL :
            return{
                ...state,
                sent: false
            }
            
        case LOGOUT:
            return{
                initialState
            }

            default:
                return state;
        }
}