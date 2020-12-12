import {
    GET_ALL_TICKET,
    DELETE_TICKET,
    LENGTH_TICKET,
    STATUS_TICKET,
    BUYER_TICKET_HISTORY,
    SELLER_TICKET_HISTORY,
    TRUST_POINT,
    TICKET_TO_BIN,
    GET_BUYER_TICKET_BIN,
    DELETE_BUYER_TICKET_BIN,
    GET_SELLER_TICKET_BIN,
    DELETE_SELLER_TICKET_BIN,
} from '../actions/types'

const initialState = {
    tickets: null,
    loading: true,
    history: null,
    buyerbin: null,
    sellerbin: null,
    length: null,
}

export default function(state = initialState, action){
    const {type, payload} = action

    switch(type){
        case LENGTH_TICKET:
            return{
                ...state,
                length: payload,
                loading: false,
            }
        case GET_ALL_TICKET:
        case DELETE_TICKET:
        case STATUS_TICKET:
        case TRUST_POINT:
        case TICKET_TO_BIN:
            return{
                ...state,
                tickets: payload,
                loading: false,
            }
        case BUYER_TICKET_HISTORY:
        case SELLER_TICKET_HISTORY:
            return{
                ...state,
                history: payload,
                loading: false,
            }
        case GET_BUYER_TICKET_BIN:
        case DELETE_BUYER_TICKET_BIN:
            return{
                ...state,
                buyerbin: payload,
                loading: false,
            }
        case GET_SELLER_TICKET_BIN:
        case DELETE_SELLER_TICKET_BIN:
            return{
                ...state,
                sellerbin: payload,
                loading: false,
            }
        default:
            return state
    }
}