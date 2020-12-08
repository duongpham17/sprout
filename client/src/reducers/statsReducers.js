import {
    STATS_PRODUCTS,
    STATS_SUPPLIERS,
    TOTAL_PRODUCTS_BY_REGION
} from '../actions/types'

const initialState = {
    product: [],
    supplier: [],
    total: null
}

export default function(state = initialState, action){
    const {type, payload} = action;
    
    switch(type){
        case STATS_PRODUCTS:
            return{
                ...state,
                product: payload,
            }
        case STATS_SUPPLIERS:
            return{
                ...state,
                supplier: payload
            }
        case TOTAL_PRODUCTS_BY_REGION:
            return{
                ...state,
                total: payload
            }

        default:
            return state;
    }
}