import {
    FOLLOW,
    GET_FOLLOWS,
    UNFOLLOW,
    GET_LATEST_FOLLOW_PRODUCT,
    SEARCH_BAR_FOR_SHOPNAME,
    UPDATE_FOLLOWINGS,
} from '../actions/types'

const initialState = {
    follow: null,
    follows: null,
    length: null,
    search: null,
    loading: true,
}

export default function(state = initialState, action){
    const {type, payload, length} = action;
    
    switch(type){
        case SEARCH_BAR_FOR_SHOPNAME:
            return{
                ...state,
                search: payload,
                loading: false,
            }
        case GET_FOLLOWS:
        case UNFOLLOW:
        case FOLLOW:
        case UPDATE_FOLLOWINGS:
            return {
                ...state,
                follow: payload,
                loading: false
            }
        case GET_LATEST_FOLLOW_PRODUCT:
            return{
                ...state,
                follows: payload,
                length: length,
                loading: false
            }

        default:
            return state;
    }
}