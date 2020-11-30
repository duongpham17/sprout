import {
    USER_DATA,
} from '../actions/types'

const initialState = {
    user: null,
    loading: true,
    role: null,
}

export default function(state = initialState, action){
    const {type, payload, role} = action;
    
    switch(type){
        case USER_DATA:
            return{
                ...state,
                user: payload,
                loading: false,
                role: role,
            }
        default:
            return state;
    }
}