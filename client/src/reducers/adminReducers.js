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
} from '../actions/types'

const initialState = {
    user: null,
    product: null,
    productTicket: null,
    loading: true,
    User: null,
    ticket: null,
    suggest: null,
    report: null,
};

export default function(state = initialState, action){
    const {type, payload, ticket} = action;

    switch(type){
        case CREATE_USER:
            return{
                ...state,
                loading: false
            }
        case GET_USER_DATA:
            return {
                ...state,
                user: payload,
                loading: false,
            }
        case GET_PRODUCT_DATA:
            return {
                ...state,
                product: payload,
                loading: false,
                productTicket: ticket
            }
        case GET_USER_PRODUCTS_DATA:
            return{
                ...state,
                User: payload,
                loading: false,
            }
        case GET_TICKET:
        case UPDATE_TICKET:
            return{
                ...state,
                ticket: payload,
                loading: false
            }
        case GET_SUGGESTION:
            return {
                ...state,
                suggest: payload
            }
        case GET_REPORTED_PRODUCTS:
            return{
                ...state,
                report: payload
            }
        case DELETE_DATA:
            return {
                ...state,
                product: null,
                user: null,
                User: null,
                loading: false,
            }

        default: 
            return state;
    }
}
