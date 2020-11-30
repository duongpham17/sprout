import {
    FILTER,
    GET_ONE_PRODUCT, 
    CREATE_PRODUCT,
    MY_POST,
    USER_POST,
    UPDATE_PRODUCT,
    UPLOAD_IMAGE,
    DELETE_IMAGE,
    DELETE_PRODUCT,
    GET_ONE_EDIT_PRODUCT,
    UPDATE_VIEWS,
    UPDATE_FEATURES,
    GET_SIMILAR_PRODUCT,
    SEARCH_BAR_FOR_PRODUCTS,
    UPDATE_QUANTITY,
    RELIST,
} from '../actions/types'

const initialState = {
    posts: [],      //alot of post
    post: null,     
    edit: null,
    mypost: [],     //my listing after creation, for many post
    userpost: [],
    done: false,    //when creation has happened to send mypost
    loading: true,
    similar: null,  //similar products
    length: null,
    search: null,
}

export default function(state = initialState, action){
    const {type, payload, length} = action

    switch(type){
        case SEARCH_BAR_FOR_PRODUCTS:
            return{
                ...state,
                search: payload,
                loading: false
            }

        case FILTER:
            return {
                ...state,
                posts: payload,
                loading: false,
            };
        
        case GET_SIMILAR_PRODUCT:
            return {
                ...state,
                similar: payload,
                loading: false,
            };

        case GET_ONE_PRODUCT:
        case UPDATE_QUANTITY:
            return {
                ...state,
                post: payload,
                loading: false,
            };

        case UPDATE_VIEWS:
            return{
                ...state,
                loading: false,
            }

        case CREATE_PRODUCT: 
            return {
                ...state,
                done: true,
                loading: false,
            };
        
        case USER_POST:
            return{
                ...state,
                userpost: payload,
                length: length,
                loading: false
            }
        case MY_POST:
            return {
                ...state,
                mypost: payload,
                length: length,
                done: false,
                loading: false,
            };

        case RELIST:
        case GET_ONE_EDIT_PRODUCT:
        case UPDATE_PRODUCT: 
        case UPDATE_FEATURES:
        case UPLOAD_IMAGE:
        case DELETE_IMAGE:
            return {
                ...state,
                edit: payload,
                loading: false,
            };  
        case DELETE_PRODUCT:
            return {
                ...state,
                done: true,
                search: null,
            };

        default:
            return state
    }
}

