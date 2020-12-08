import {
    MY_REVIEW,
    UPDATE_REVIEW,
    DELETE_REVIEW,
    PRODUCT_REVIEW,
    LOGOUT,
} from '../actions/types'

const initialState = {
    myreviews: [],
    review: null,
    length: null,
    reviewed: false
}

export default function(state = initialState, action){
    const {type, payload, length, reviewed} = action

    switch(type){

        case MY_REVIEW:
        case UPDATE_REVIEW:
        case DELETE_REVIEW:
            return {
                ...state,
                myreviews: payload,
                length: length,
            }
        case PRODUCT_REVIEW:
            return{
                ...state,
                review: payload,
                reviewed: reviewed
            }
        case LOGOUT:
            return{
                initialState
            }
        default:
            return state
    }
}