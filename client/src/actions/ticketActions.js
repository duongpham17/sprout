import {
    GET_ALL_TICKET,
    LENGTH_TICKET,
    DELETE_TICKET,
    STATUS_TICKET,
    BUYER_TICKET_HISTORY,
    SELLER_TICKET_HISTORY,
    TRUST_POINT,
    TICKET_TO_BIN,
    GET_BUYER_TICKET_BIN,
    DELETE_BUYER_TICKET_BIN,
    GET_SELLER_TICKET_BIN,
    DELETE_SELLER_TICKET_BIN,
} from './types'
import {setAlert} from './alertActions'

import Api from '../routings/Api'

//get user /tickets 
export const getUserTicketLength = () => async dispatch => {
    try {
        const res = await Api.get(`/tickets/length`);
        dispatch({
            type: LENGTH_TICKET,
            payload: res.data.user
        })
    } catch (err) {
        console.log(err.response)
        dispatch(setAlert(err.response.data.message, 'primary'))
    }
}

//get user /tickets
export const getUserTicket = () => async dispatch => {
    try {
        const res = await Api.get(`/tickets/orders`);
        dispatch({
            type: GET_ALL_TICKET,
            payload: res.data.user
        })
    } catch (err) {
        dispatch(setAlert(err.response.data.message, 'primary'))
    }
}

//create ticket
export const createTicket = (id, quantity, price, seller, buyer, description, collect, delivery2, deliveryDate, deliveryCost ) => async dispatch => {
    const config = { 
        headers:{
            "Content-Type" : "application/json"
        }
    }
    try {
        const body = {quantity, price, seller, buyer, description, collect, delivery2, deliveryDate, deliveryCost}
        const res = await Api.post(`/tickets/create/${id}`, body, config);
        dispatch({
            type: LENGTH_TICKET,
            payload: res.data.ticket
        })
    } catch (err) {
        dispatch(setAlert(err.response.data.message || err.response.data, 'primary'))
    }
}

//Status or Stage of the /tickets
export const statusTicket = (id, status) => async dispatch => {
    const config = { 
        headers:{
            "Content-Type" : "application/json"
        }
    }
    try {
        const body = {status}
        const res = await Api.patch(`/tickets/update/${id}`, body, config);
        dispatch({
            type: STATUS_TICKET,
            payload: res.data.ticket
        })
    } catch (err) {
        dispatch(setAlert('Error, ticket no longer exist. Please realod.', 'primary'))
    }
}

//Stage 2 for buyer payment 
export const ticketPaymentDetails = (id, paymentData) => async dispatch => {
    const config = { 
        headers:{
            "Content-Type" : "application/json"
        }
    }
    try {
        const res = await Api.patch(`/tickets/payment/${id}`, paymentData, config);
        dispatch({
            type: STATUS_TICKET,
            payload: res.data.ticket
        })
    } catch (err) {
        dispatch(setAlert('Error, ticket no longer exist. Please realod.', 'primary'))
    }
}


//delete ticket
export const deleteTicket = (id) => async dispatch => {
    try {
        const res = await Api.delete(`/tickets/delete/${id}`);
        dispatch({
            type: DELETE_TICKET,
            payload: res.data.ticket
        })
    } catch (err) {
        dispatch(setAlert(err.response.data.message, 'primary'))
    }
}

//buyer ticket history
export const buyerTicketHistory = (limit, page) => async dispatch => {
    try {
        const res = await Api.get(`/tickets/buyhistory?limit=${limit}&page=${page}`);
        dispatch({
            type: BUYER_TICKET_HISTORY,
            payload: res.data.ticket
        })
    } catch (err) {
        dispatch(setAlert(err.response.data.message, 'primary'))
    }
}

//seller ticket history
export const sellerTicketHistory = (limit, page) => async dispatch => {
    try {
        const res = await Api.get(`/tickets/sellhistory?limit=${limit}&page=${page}`);
        dispatch({
            type: SELLER_TICKET_HISTORY,
            payload: res.data.ticket
        })
    } catch (err) {
        dispatch(setAlert(err.response.data.message, 'primary'))
    }
}

//let seller delete ticket history after 6 months
export const DeleteSellerTicketHistory = (id) => async dispatch => {
    try {
        const res = await Api.delete(`/tickets/history/${id}`);
        dispatch({
            type: SELLER_TICKET_HISTORY,
            payload: res.data.ticket
        })
    } catch (err) {
        dispatch(setAlert(err.response.data.message, 'primary'))
    }
}

//let seller delete ticket history after 6 months
export const undoSellerTicketHistory = (id, status) => async dispatch => {
    const config = { 
        headers:{
            "Content-Type" : "application/json"
        }
    }
    try {
        const body = {status}
        const res = await Api.patch(`/tickets/undohistory/${id}`, body, config);
        dispatch({
            type: SELLER_TICKET_HISTORY,
            payload: res.data.ticket
        })
    } catch (err) {
        dispatch(setAlert(err.response.data.message, 'primary'))
    }
}

//increase points or decrease points for user 
export const scoreEachOther = (id, ticketId, good, bad, scoreSeller, scoreBuyer) => async dispatch => {
    const config = { 
        headers:{
            "Content-Type" : "application/json"
        }
    }
    try{
        const body = {good, bad, scoreSeller, scoreBuyer}
        const res = await Api.patch(`/tickets/trust/${id}/${ticketId}`, body, config)
        dispatch({
            type: TRUST_POINT ,
            payload: res.data.ticket
        })
    } catch (err) {
        dispatch(setAlert(err.response.data.message, 'primary'))
    }
}

//send to bin or trash, after 12 days it can then be deleted, to prevent scamming
export const sendTicketToBin = (id) => async dispatch => {
    const config = { 
        headers:{
            "Content-Type" : "application/json"
        }
    }
    try{
        const res = await Api.patch(`/tickets/time/${id}`, config)
        dispatch({
            type: TICKET_TO_BIN,
            payload: res.data.ticket
        })
    } catch (err) {
        dispatch(setAlert(err.response.data.message, 'primary'))
    }
}


//get all documents with approved === bin
export const getBuyerTicketBin = () => async dispatch => {
    try{
        const res = await Api.get(`/tickets/bin/buyer`)
        dispatch({
            type: GET_BUYER_TICKET_BIN,
            payload: res.data.ticket
        })
    } catch (err) {
        dispatch(setAlert("Internet connection. Please reload.", 'primary'))
    }
}

//delete ticket inside bin
export const deleteBuyerTicketBin = (id) => async dispatch => {
    try {
        const res = await Api.delete(`/tickets/bin/buyer/${id}`);
        dispatch({
            type: DELETE_BUYER_TICKET_BIN,
            payload: res.data.ticket
        })
    } catch (err) {
        dispatch(setAlert(err.response.data.message, 'primary'))
    }
}


//get Seller Ticket bin
export const getSellerTicketBin = () => async dispatch => {
    try {
        const res = await Api.get(`/tickets/bin/seller`);
        dispatch({
            type: GET_SELLER_TICKET_BIN,
            payload: res.data.ticket
        })
    } catch (err) {
        dispatch(setAlert(err.response.data.message, 'primary'))
    }
}

//delete Seller ticket bin
export const deleteSellerTicketBin = (id) => async dispatch => {
    try {
        const res = await Api.delete(`/tickets/bin/seller/${id}`);
        dispatch({
            type: DELETE_SELLER_TICKET_BIN,
            payload: res.data.ticket
        })
    } catch (err) {
        dispatch(setAlert(err.response.data.message, 'primary'))
    }
}



