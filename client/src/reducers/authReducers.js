import {
    USER_LOADED,
    SIGN_UP, 
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
    sent: false
}

export default function(state = initialState, action){
    const {type, payload} = action;
    
    switch(type){
        case USER_LOADED:
        case LOGIN:
        case SIGN_UP:
        case RESET_PASSWORD:
            return {
                ...state,
                user: payload,
                loggedOn: true,
                loading: false
            }

        case LOGOUT:
        case UPDATE_MY_PASSWORD:
        case UPDATE_MY_EMAIL:
            return {
                user: {},
                loggedOn: false,
                loading: false,
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

            default:
                return state;
        }
}