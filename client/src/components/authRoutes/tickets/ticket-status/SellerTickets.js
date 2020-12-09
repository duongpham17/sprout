import './Tickets.scss';
import React, {Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {TiTick} from 'react-icons/ti';

import {setAlert} from '../../../../actions/alertActions';

import {scoreEachOther, deleteTicket, statusTicket, sendTicketToBin, getUserTicket} from '../../../../actions/ticketActions';

import TicketLayout from '../TicketLayout';
import TicketLayoutStatus from '../TicketLayoutStatus';
import Info from './Info';

const SellerTickets = ({setAlert, scoreEachOther, sendTicketToBin, getUserTicket, deleteTicket, statusTicket , ticket:{tickets}},) => {

    useEffect(() => {
        getUserTicket()
    }, [getUserTicket])

    const [sure, setSure] = useState({
        cancel: ""
    })

    const {cancel} = sure
    
    const binTicket = (e, id) => {
        e.preventDefault()
        if(cancel === "cancel"){
            sendTicketToBin(id)
            statusTicket(id, "bin")
            setSure({cancel: ""})
        } else {
            setAlert("Enter cancel, to send to Bin", 'primary')
        }
    }

    const SendToBinStageTwo = (e, id) => {
        e.preventDefault()
        if(cancel === "cancel"){
            sendTicketToBin(id)
            statusTicket(id, "bin")
            setSure({cancel: ""})
        } else {
            setAlert("Enter cancel, to send to Bin", 'primary')
        }
    }
    const onChange = e => setSure({...sure, [e.target.name]: e.target.value })

    const ratings_good = (e, userId, ticketId, good, bad, scoreSeller, scoreBuyer) => {
        e.preventDefault()
        scoreEachOther(userId, ticketId, good, bad, scoreSeller, scoreBuyer)
    }

    const ratings_bad = (e, userId, ticketId, good, bad, scoreSeller, scoreBuyer) => {
        e.preventDefault()
        scoreEachOther(userId, ticketId, good, bad, scoreSeller, scoreBuyer)
    }

    return (
        <Fragment>
            <Info sellerInfo={"true"} />

            {/* Seller Page*/}
            <div className="empty-ticket-container">
            {tickets ?
                <Fragment>
                    <div>
                        {tickets.ticketsSeller.length === 0 ? 
                        <Fragment>
                        <div className="no_content4">You have no orders, as of yet.</div> 
                        <div className="quote">"We are born different for a reason, to make unique food."</div>
                        </Fragment>
                        : ""}
                    </div>

                    {/*4/4 SELLER History Area */}
                    {tickets.ticketsSeller.length === 0 ? "" : 
                    <div className="status-title">
                        <h3>4/4 Confirmed Payment. Please Give Buyers Time To Leave A Point.</h3>
                        <div className="status-completed-container-seller">
                        {tickets.ticketsSeller.map((el, index) =>
                            <Fragment key={index}>
                            {el.status === "received" ?
                                <div className="status-card">
                                    <TicketLayoutStatus el={el} setAlert={setAlert} contactBuyer={"true"} paymentReceipt={"true"} />

                                    <div className="rating">
                                        {el.scoreSeller === 'yes' ? 
                                        <div className="status-rating">
                                            Buyer Rating... <span>Confirmed!</span>
                                        </div>
                                        : <p>Awaiting Rating... <span>Not Confirmed</span></p> }
                                    </div>

                                    <div className="status-history-btn">
                                        <small className="warning">{el.scoreSeller === 'no' ? 'No point if rating is not confirmed' : ''}</small>
                                        <button className="history" onClick={() => statusTicket(el._id, "history")}>Send To History</button>
                                    </div>
                                    
                                    <div className="status-btn">
                                        {el.scoreBuyer === "no" ? 
                                            <Fragment>
                                            <p className="rate">Please leave a rating for the buyer</p>
                                            <div className="double-btn">
                                            <button className="completed-good" onClick={e => ratings_good(e, el.buyer._id, el._id, (el.buyer.good + 1), el.buyer.bad, el.scoreSeller, "yes") }>Good</button>
                                            <button className="completed-bad" onClick={e => ratings_bad(e, el.buyer._id, el._id, el.buyer.good, (el.buyer.bad + 1), el.scoreSeller, "yes") }>Bad</button>
                                            </div>
                                            </Fragment>
                                        : 
                                            <div className="double-btn">Rated Buyer <TiTick color="#4fd680" /></div> 
                                        }
                                    </div>
                                </div>
                            : "" }
                            </Fragment>
                        )}
                        </div>
                    </div>
                    }

                    {/*3/4 Received Payment */}
                    {tickets.ticketsSeller.length === 0 ? "" : 
                    <div className="status-title">
                        <h3>3/4 Waiting To Receive Payment...</h3>
                        <div className="status-sent-container-seller">
                        {tickets.ticketsSeller.map((el, index) =>
                            <Fragment key={index}>
                            {el.status === "sent" ?
                                <div className="status-card">
                                     <TicketLayoutStatus el={el} setAlert={setAlert} paymentReceipt={"true"} contactBuyer={"true"} sell={"true"}/>
                                    
                                     <div className="status-btn">
                                        <p>Awaiting For Payment To Be Received And Confirmed By You...</p>
                                        <div className="triple-btn">   
                                            <input type="text" placeholder="Enter cancel to " name="cancel" value={cancel} onChange={e => onChange(e)} />
                                            <button className="bin" onClick={e => binTicket(e, el._id)}>Send To Bin</button>     
                                            <button className="received" onClick={() => statusTicket(el._id, "received")}>Payment Received</button>
                                        </div>
                                    </div>
                                </div>
                            : "" }
                            </Fragment>
                        )}
                        </div>
                    </div>
                    }

                    {/*2/4 Waiting for payment to be sent */}
                    {tickets.ticketsSeller.length === 0 ? "" : 
                    <div className="status-title">
                        <h3>2/4 Approved Order</h3>
                        <div className="status-approved-container-seller">
                        {tickets.ticketsSeller.map((el, index) =>
                            <div key={index}>
                            {el.status === "approved" ?
                                <div className="status-card">

                                    <TicketLayoutStatus el={el} setAlert={setAlert} contactBuyer={"true"} />

                                    <div className="status-btn">
                                        <p>Awaiting for buyer to send payment information....</p>
                                        <div className="double-btn">
                                        <p className="buyer-no-response">Buyer not responding? Send to bin</p>
                                        <input type="text" placeholder="Enter cancel" name="cancel" value={cancel} onChange={e => onChange(e)} />
                                        <button className="cancel" onClick={e => SendToBinStageTwo(e, el._id)}>Send To Bin</button>            
                                        </div>
                                    </div>

                                </div>
                            : "" }
                            </div>
                        )}
                        </div>
                    </div>
                    }

                    {/* 1/4 Awaiting Seller approval of product */}
                    {tickets.ticketsSeller.length === 0 ? "" : 
                    <div className="status-title">
                        <h3>1/4 Awaiting Your Approval...</h3>
                        <div className="status-awaiting-container-seller">
                        {tickets.ticketsSeller.map((el, index) =>
                            <div key={index}>
                            {el.status === "awaiting" ?
                                <div className="status-card">
                                    <TicketLayout el={el}/>

                                    <div className="buyer-points">
                                       <li> Good: <span className="good">{el.buyer.good > 1000 ? `${(el.buyer.good / 1000).toFixed(1)}K` : el.buyer.good}</span> </li>
                                       <li> Bad: <span className="bad">{el.buyer.bad > 1000 ? `${(el.buyer.bad / 1000).toFixed(1)}K` : el.buyer.bad}</span></li>
                                    </div>

                                    <div className="status-btn">
                                        <p>Est.Delivery Date: {el.deliveryDate === "Invalid date" ? "Unknown" : el.deliveryDate}</p>
                                        <p>Awaiting Your Approval...</p>
                                        <div className="double-btn">
                                        <button className="approve" onClick={() => statusTicket(el._id, "approved")}>Approve</button>        
                                        <button className="decline" onClick={() => deleteTicket(el._id)}>Decline</button>       
                                        </div>
                                    </div>

                                </div>
                            : "" }
                            </div>
                        )}
                        </div>
                    </div>
                    }

                </Fragment>
            : ""}
            </div>
        </Fragment>
    )
}

SellerTickets.propTypes = {
    ticket: PropTypes.object.isRequired,
    getUserTicket: PropTypes.func.isRequired,
    deleteTicket: PropTypes.func.isRequired,
    statusTicket: PropTypes.func.isRequired,
    sendTicketToBin: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    scoreEachOther: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    ticket: state.ticketReducers,
})

export default connect(mapStateToProps, {setAlert, scoreEachOther, sendTicketToBin, getUserTicket, deleteTicket, statusTicket})(SellerTickets)