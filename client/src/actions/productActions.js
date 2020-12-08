import {
    MY_POST,
    USER_POST,

    CREATE_PRODUCT,
    UPDATE_PRODUCT,
    UPLOAD_IMAGE,
    DELETE_IMAGE,
    GET_ONE_EDIT_PRODUCT,
    UPDATE_VIEWS,
    UPDATE_FEATURES,
    UPDATE_QUANTITY,
    DELETE_PRODUCT,
    RELIST,

    GET_ONE_PRODUCT,
    GET_SIMILAR_PRODUCT,

    FILTER,
    SEARCH_BAR_FOR_PRODUCTS,
} from './types'
import {setAlert} from './alertActions';
import Api from '../routings/Api'

const message = "Try reloading the page."


//update quanttiy when a ticket is created based on qunatity entered in. /* LINKED to ticketActions */
export const updateQuantity = (id, quantity) => async dispatch => {
    const config = { 
        headers:{
            "Content-Type" : "application/json"
        }
    }
    try {
        const body = {quantity}
        const res = await Api.patch(`/products/quantity/${id}`, body, config);
        dispatch({
            type: UPDATE_QUANTITY,
            payload: res.data.product,
        })
    } catch(err){
        dispatch(setAlert("Internet Issue. Please reload.", "primary"))
    }   
}

//update view count by 1 everytime a user clicks on a specific product id link.
export const updateViews = (id, view)=> async dispatch => {
    try {
        const config = { 
            headers:{
                "Content-Type" : "application/json"
            }
        };
        const body = {view}
        await Api.patch(`/products/views/${id}`, body, config);
        dispatch({
            type: UPDATE_VIEWS,
        })
    } catch (err) {
        dispatch(setAlert("Please check your internet connection.", 'primary'))
    }
}

//Create Products
export const createProduct = (formData) => async dispatch => {
    const config = { 
        headers:{
            "Content-Type" : "application/json"
        }
    }
    try {
        await Api.post(`/products/create`, formData, config);
        dispatch({
            type: CREATE_PRODUCT,
        })
        dispatch(setAlert('Product Created :D', 'success'))
    } catch(err){
        dispatch(setAlert("Please Check what you have enntered is correct", 'danger'))
    }   
}

//Get One Product by ID Populated user
export const getOneProduct = id => async dispatch => {
    try {
        const res = await Api.get(`/products/one/${id}`);
        dispatch({
            type: GET_ONE_PRODUCT,
            payload: res.data.product
        })
    } catch (err) {
        console.log(err.response)
        dispatch(setAlert("product does not exist", 'danger'))
    }
}


//get choosen user listing of /products
export const getUserProducts = (id, page, sort, limit) => async dispatch => {
    try {
        const res = await Api.get(`/products/userpost/${id}?page=${page}&sort=${sort}&limit=${limit}`);
        dispatch({
            type: USER_POST,
            payload: res.data.product,
            length: res.data.length
        })
    } catch (err) {
        dispatch(setAlert(message, 'danger'))
    }
}

//Get My Products, get edit page of /products user has created.
export const getMyPost = (page, sort, limit) => async dispatch => {
    try{
        const res = await Api.get(`/products/mypost?page=${page}&sort=${sort}&limit=${limit}`)
        dispatch({
            type: MY_POST,
            payload: res.data.product,
            length: res.data.length
        })
    } catch(err){
        dispatch(setAlert(message, 'danger'))
    }
}

//relist product by 12days for my /products page
export const relistMyProduct = (id, relistDate, createdAt) => async dispatch => {
    const config = { 
        headers:{
            "Content-Type" : "application/json"
        }
    };
    try {
        const body = {relistDate, createdAt}
        const res = await Api.patch(`/products/relistmyproduct/${id}`, body, config);
        dispatch({
            type: MY_POST,
            payload: res.data.product
        })
        dispatch(setAlert("Relisted Product. Good Luck!", 'success'))
    } catch(err){
        dispatch(setAlert(message, 'danger'))
    }   
}


//recommend similar /products to users going to specific /products. based on category or type
export const getSimilarProducts = (type, limit) => async dispatch => {
    try{
        const res = await Api.get(`/products/similar?type=${type}&limit=${limit}`)
        dispatch({
            type: GET_SIMILAR_PRODUCT,
            payload: res.data.product
        })
    } catch(err){
        dispatch(setAlert(message, 'danger'))
    }
}


//Get One Product by ID, NO population of user
export const getOneEditProduct = id => async dispatch => {
    try {
        const res = await Api.get(`/products/editproduct/${id}`);
        dispatch({
            type: GET_ONE_EDIT_PRODUCT,
            payload: res.data.product
        })
    } catch (err) {
        dispatch(setAlert(message, 'danger'))
    }
}


//Update users product
export const updateProduct = (id, FormData) => async dispatch => {
    const config = { 
        headers:{
            "Content-Type" : "application/json"
        }
    };
    try {
        const res = await Api.patch(`/products/edit/${id}`, FormData, config);
        dispatch({
            type: UPDATE_PRODUCT,
            payload: res.data.product
        })
        dispatch(setAlert('Product Information Updated', 'success'))
    } catch(err){
        dispatch(setAlert(err.response.data.message, 'danger'))
    }   
}

//Update users product description area
export const updateProductDescription = (id, FormData) => async dispatch => {
    const config = { 
        headers:{
            "Content-Type" : "application/json"
        }
    };
    try {
        const res = await Api.patch(`/products/edit/des/${id}`, FormData, config);
        dispatch({
            type: UPDATE_PRODUCT,
            payload: res.data.product
        })
        dispatch(setAlert('Description Updated', 'success'))
    } catch(err){
        dispatch(setAlert(err.response.data.message, 'danger'))
    }   
}

//update allergens
export const updateAllergens = (id, allergenForm) => async dispatch => {
    const config = { 
        headers:{
            "Content-Type" : "application/json"
        }
    };
    try {
        const res = await Api.patch(`/products/allergen/${id}`, allergenForm, config);
        dispatch({
            type: UPDATE_FEATURES,
            payload: res.data.product
        })
        dispatch(setAlert("Saved Changes", "success"))
    } catch(err){
        dispatch(setAlert(message, 'danger'))
    }   
}

//update delivery details
export const updateDeliveryDetails = (id, formData) => async dispatch => {
    const config = { 
        headers:{
            "Content-Type" : "application/json"
        }
    };
    try {
        const res = await Api.patch(`/products/features/${id}`, formData, config);
        dispatch({
            type: UPDATE_FEATURES,
            payload: res.data.product
        })
        dispatch(setAlert("Saved Delivery Preferences", 'success'))
    } catch(err){
        dispatch(setAlert(message, 'danger'))
    }   
}

//relist product by 12days for edit page 
export const relistProduct = (id, relistDate, createdAt) => async dispatch => {
    const config = { 
        headers:{
            "Content-Type" : "application/json"
        }
    };
    try {
        const body = {relistDate, createdAt}
        const res = await Api.patch(`/products/relist/${id}`, body, config);
        dispatch({
            type: RELIST,
            payload: res.data.product
        })
        dispatch(setAlert("Relisted Product. Good Luck!", 'success'))
    } catch(err){
        dispatch(setAlert(message, 'danger'))
    }   
}


//Image Upload used as gallery
export const uploadImage = (url, id) => async dispatch => {
    const config = { 
        headers:{
            "Content-Type" : "application/json"
        }
    }
    try{
        const body = {url}
        const res = await Api.put(`/products/upload/images/${id}`, body, config);
        dispatch({
            type: UPLOAD_IMAGE,
            payload: res.data.product
        })
        dispatch(setAlert("successfully uploaded image", 'success'))
    } catch(err) {
        dispatch(setAlert("7 Images max.", 'danger'))
    }
}

//Image Delete from database
export const deleteImage = (image_id, id) => async dispatch => {
    try{
    const res = await Api.delete(`/products/delete/images/${id}/${image_id}`);
    dispatch({
        type: DELETE_IMAGE,
        payload: res.data.product
    })
    }catch(err){
        dispatch(setAlert("Image already deleted", "primary"))
    }
}

//delete product after images has been deleted
export const deleteProduct = (id) => async dispatch => {
    try{
        await Api.delete(`/products/delete/product/${id}`)
        dispatch({
            type: DELETE_PRODUCT,
        })
        dispatch(setAlert("Successfully Deleted", 'success'))
    }catch(err){
        dispatch(setAlert(err.response.data.message, 'danger'))
    }
}


/*CATEGORY'S AND FILTER'S ***********************************************************************/

//filter Category
export const filterAndCategory = (page, type, sort, limit, region) => async dispatch => {
    try {
        const res = await Api.get(`/products/categorys?page=${page}&type=${type}&sort=${sort}&limit=${limit}&region=${region}`);
        dispatch({
            type: FILTER,
            payload: res.data.product,
            length: res.data.length
        })
    } catch (err) {
        dispatch(setAlert(message, 'danger'))
    }
}

// 1/2 ) Search bar for product based on description title
export const searchBar = (description_title) => async dispatch => {
    try{
        const res = await Api.get(`/products/search/bar/description/${description_title}`)
        dispatch({
            type: SEARCH_BAR_FOR_PRODUCTS,
            payload: res.data.product,
        })
    } catch(err){
        dispatch(setAlert(message, 'danger'))
    }
}

//2/3) Once product has been clicked. This will render that product page. filter Category based on description
export const searchBarClick = (page, description_title, sort, limit, region) => async dispatch => {
    try {
        const res = await Api.get(`/products/categorys?page=${page}&description_title=${description_title}&sort=${sort}&limit=${limit}&region=${region}`);
        dispatch({
            type: FILTER,
            payload: res.data.product,
            length: res.data.length
        })
    } catch (err) {
        dispatch(setAlert(message, 'danger'))
    }
}

//3/3) For enter event for when user just puts in E.g v this will go to the page for only v
export const searchBarEnter = (page, description_title, sort, limit, region) => async dispatch => {
    try {
        const res = await Api.get(`/products/search/enter/${description_title}?page=${page}&sort=${sort}&limit=${limit}&region=${region}`);
        dispatch({
            type: FILTER,
            payload: res.data.product,
            length: res.data.length
        })
    } catch (err) {
        dispatch(setAlert(message, 'danger'))
    }
}
