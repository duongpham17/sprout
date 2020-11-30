import './TicketHistory.scss';
import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {AiFillPrinter, AiFillSave} from 'react-icons/ai';
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io';
import {MdContentCopy} from 'react-icons/md';

import {buyerTicketHistory, sellerTicketHistory, undoSellerTicketHistory, DeleteSellerTicketHistory} from '../../../../actions/ticketActions';
import moment from 'moment'
import { setAlert } from '../../../../actions/alertActions';
 
const TicketHistory = ({ticket:{history, loading},setAlert, DeleteSellerTicketHistory, undoSellerTicketHistory, buyerTicketHistory, sellerTicketHistory})=> {

    const [payInfo, setPayInfo] = useState(false)

    const [ticketHistory, setTicketHistory ] = useState("normal")

    const [formData, setFormData] = useState({
        address: "",
        post: "",
        city: "",
        country: "",
        name: "",
        date: "",
        date2: "",
    })

    //switch between page 1, 2, 3 ....
    const [page, setPage] = useState(1)
    //amount of result per page
    const limit = 200

    useEffect(() => {
        if(ticketHistory === "seller"){
            sellerTicketHistory(limit, page)
        } else if(ticketHistory === 'buyer'){
            buyerTicketHistory(limit, page)
        }
    }, [sellerTicketHistory, buyerTicketHistory, ticketHistory, page, limit])

    const {address, post, city, country, name, date, date2} = formData
      
    const onChange = (e) => {
       setFormData({...formData, [e.target.name]: e.target.value});
    };

    const unhistory = (e, id) => {
        e.preventDefault()
        undoSellerTicketHistory(id, "received")
        setAlert("done", 'success')
    }

    const increment = () => {
        setPage(page + 1)
    }
    const decrement = () => {
        setPage(page === 1 ? 1 : page - 1)
    }

    const copy = (data) => {
        navigator.clipboard.writeText(data)
    }

    const Payment = (props) => {
        return (
            <div>
                {history.map((el, index) => 
                    <div className="history-information" key={index}>
                        <ul>

                        <li className="date">{moment(el.createdAt).format("lll").split(" ").slice(0, 5).join(" ")} <br/>
                        {props.undo === "true" ? <Fragment>
                        {Date.now() > (parseInt(Date.parse(el.deleteHistoryDate))) ? <button className="delete-date" onClick={() => DeleteSellerTicketHistory(el._id)}>Delete</button> : "" }
                        </Fragment> : "" }
                        </li>
                        <li className="id">{el._id}</li>
                        <li className="description">{el.description}</li>
                        <li className="payment-method">{el.payment} <br/>

                        {payInfo === true ? 
                            <div className="pay-info">
                            <button onClick={() => setPayInfo(!payInfo)}>Close</button> <br/>
                            {el.transactionId.opt_1 && !el.transactionId.cryptoTransId ? 
                            <Fragment>
                            {!el.transactionId.opt_1 ? "" : <p>{el.transactionId.opt_1}</p>}<br/>
                            {!el.transactionId.opt_2 ? "" : <p>{el.transactionId.opt_2}</p>}
                            </Fragment>
                            : 
                            <p><button onClick={() => copy(el.transactionId.cryptoTransId)}><MdContentCopy/> </button> Transaction ID: {el.transactionId.cryptoTransId}</p> 
                            }
                            </div> 
                            : 
                            <button className="pay-info-btn" onClick={() => setPayInfo(!payInfo)}>More Info</button>
                            }
                            
                        </li>


                        <li className="price">£{el.price.toFixed(2)}</li>
                        <li className="quantity">{el.quantity}</li>
                        <li className="delivery_cost">£{el.deliveryCost}</li>
                        <li className="total">£{((el.price * el.quantity) + el.deliveryCost).toFixed(2)}</li>
                        {props.undo === "true" ?
                            <button className="undo" onClick={e => unhistory(e, el._id)}>undo</button>
                        : "" }

                        </ul>
                    </div>
                )}
            </div>
        )
    }

  return(
      <Fragment>
        <div className="complete-history-container">

            <div className="convert-to-pdf-btn">
            <button onClick={() => window.print()}><AiFillPrinter/><AiFillSave/></button><br/>
                <div className="date">
                    <input type="text" placeholder="From Date " name="date" value={date} onChange={e => onChange(e)}/>
                    --- To --- 
                    <input className="date-input-margin" type="text" placeholder="E.g Dec 26, 2020" name="date2" value={date2} onChange={e => onChange(e)}/>
                </div>
            </div>
            <div className="address-form">
                <li><input type="text" placeholder="Full Name" name="name" value={name} onChange={e => onChange(e)}/></li>
                <li><input type="text" placeholder="Address" name="address" value={address} onChange={e => onChange(e)}/></li>
                <li><input type="text" placeholder="City" name="city" value={city} onChange={e => onChange(e)}/></li>
                <li><input type="text" placeholder="Post Code" name="post" value={post} onChange={e => onChange(e)}/></li>
                <li><input type="text" placeholder="United Kingdom" name="country" value={country} onChange={e => onChange(e)}/></li>
            </div>
            {loading ? <div className="no_content">Loading...</div> : ""}
                <Fragment>
                    <div className="history-container">
                        <div className="history-btn">
                            {ticketHistory === "seller" ? 
                            <button className={ticketHistory === "seller" ? "seller" : "" }  onClick={() => setTicketHistory("normal")}>Selling History Book</button> 
                            : 
                            <button onClick={() => setTicketHistory("seller")}>Selling History Book</button>
                            }
                            {ticketHistory === "buyer" ? 
                            <button className={ticketHistory === "buyer" ? "seller" : "" }  onClick={() => setTicketHistory("normal")}>Buying History Book</button> 
                            : 
                            <button onClick={() => setTicketHistory("buyer")}>Buying History Book</button>
                            }
                        </div>
                {!history ? "" : 
                <Fragment>

                    {/* SELLER History Area */}
                    {ticketHistory === "seller" ?
                    <Fragment>
                    <div className="history-information-des">
                        <ul>
                            <li className="date">Date</li>
                            <li className="id">Ticket ID <br/>
                            Total Ticket / Sells ({history.length === 0 ? 0 : history.length})
                            </li>
                            <li className="description">Description</li>
                            <li className="payment-method">Payment Method</li>
                            <li className="price">Price<br/>
                            Avg: <br/>£{history.length === 0 ? "" : `${(history.map((el) => el.price).reduce((acc, cur) => acc + cur) / history.length + 1 ).toFixed(2)}` }
                            </li>
                            <li className="quantity">Quantity<br/>
                            Total: <br/>{history.length === 0 ? "" : `${history.map((el) => el.quantity).reduce((acc, cur) => acc + cur)} `}
                            </li>
                            <li className="delivery_cost">Delivery Cost<br/>
                            £{history.length === 0 ? "" : `${history.map((el) => (el.deliveryCost)).reduce((acc, cur) => acc + cur).toFixed(2)}` } 
                            </li>
                            <li className="total">Total<br/>
                            Amount: <br/> £{history.length === 0 ? "" : `${history.map((el) => (el.price * el.quantity) + el.deliveryCost).reduce((acc, cur) => acc + cur).toFixed(2)}` } 
                            </li>
                        </ul>
                    </div>
                    <Payment undo={"true"} />

                    </Fragment> 
                    : "" }

                    {/* BUYER History Area */}
                    {ticketHistory === "buyer" ?
                    <Fragment>
                    <div className="history-information-des">
                        <ul>
                            <li className="date">Date</li>
                            <li className="id">Ticket ID <br/>
                            Total Ticket / Buys ({history.length === 0 ? 0 : history.length})
                            </li>
                            <li className="description">Description</li>
                            <li className="payment-method">Payment Made to Seller</li>
                            <li className="price">Price<br/>
                            Avg Spend: <br/>£{history.length === 0 ? "" : `${(history.map((el) => el.price).reduce((acc, cur) => acc + cur) / history.length + 1 ).toFixed(2)}` }
                            </li>
                            <li className="quantity">Quantity<br/>
                            Total: <br/>{history.length === 0 ? "" : `${history.map((el) => el.quantity).reduce((acc, cur) => acc + cur)} `}
                            </li>
                            <li className="delivery_cost">Delivery Cost<br/>
                            £{history.length === 0 ? "" : `${history.map((el) => (el.deliveryCost)).reduce((acc, cur) => acc + cur).toFixed(2)}` } 
                            </li>
                            <li className="total">Total<br/>
                            Amount: <br/> £{history.length === 0 ? "" : `${history.map((el) => (el.price * el.quantity)).reduce((acc, cur) => acc + cur).toFixed(2)}` } 
                            </li>
                        </ul>
                    </div>

                    <Payment/>

                    </Fragment> 
                    : "" }  

                    </Fragment> 
                    }
                    </div>

                    {!history ? "" : 
                    <div className="arrows">
                        <button onClick={() => decrement()}><IoIosArrowBack/></button>
                        <button>Page: {page} || Result: {history.length}</button>
                        {history.length >= limit ?
                        <button onClick={() => increment()}><IoIosArrowForward/></button>
                        : ""}
                    </div>
                    }
                </Fragment>
            </div>
      </Fragment>
  )
}
 

TicketHistory.propTypes = {
    ticket: PropTypes.object.isRequired,
    buyerTicketHistory: PropTypes.func.isRequired, 
    sellerTicketHistory: PropTypes.func.isRequired,
    undoSellerTicketHistory: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    DeleteSellerTicketHistory: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    ticket: state.ticketReducers
})

export default connect(mapStateToProps, { DeleteSellerTicketHistory, undoSellerTicketHistory, buyerTicketHistory, sellerTicketHistory, setAlert})(TicketHistory)

