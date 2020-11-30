import {
    STATS_PRODUCTS,
    STATS_SUPPLIERS
} from '../actions/types'

const initialState = {
    product: [],
    supplier: [],
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
            
        
        default:
            return state;
    }
}