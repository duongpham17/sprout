import {
    MY_REVIEW,
    UPDATE_REVIEW,
    DELETE_REVIEW,
    LOGOUT,
} from '../actions/types'

const initialState = {
    myreviews: [],
    myreview: null,
    length: null,
}

export default function(state = initialState, action){
    const {type, payload, length} = action

    switch(type){

        case MY_REVIEW:
        case UPDATE_REVIEW:
        case DELETE_REVIEW:
            return {
                ...state,
                myreviews: payload,
                length: length,
            }
        case LOGOUT:
            return{
                initialState
            }
        default:
            return state
    }
}