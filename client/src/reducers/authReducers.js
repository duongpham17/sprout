import {
    USER_LOADED,
    SIGN_UP, 
    LOGIN, 
    LOGOUT, 
    UPDATE_MY_PASSWORD,
    UPDATE_MY_EMAIL,
    FORGOTTEN_PASSWORD,
    RESET_PASSWORD,
} from '../actions/types'

const initialState = {
    user: {},
    loggedOn: false,
    loading: true,
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

        case FORGOTTEN_PASSWORD:
            return{
                ...state,
            }

            default:
                return state;
        }
}