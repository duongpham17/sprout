import './Tickets.scss';
import React, {Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {TiTick} from 'react-icons/ti';

import {setAlert} from '../../../../actions/alertActions';

import {scoreEachOther, deleteTicket, getUserTicket} from '../../../../actions/ticketActions';

import TicketLayoutStatus from '../TicketLayoutStatus';
import TicketLayout from '../TicketLayout';
import Payment from './Payment';
import AddAddress from './AddAddress';
import Info from './Info';

const BuyerTickets = ({scoreEachOther, setAlert, deleteTicket, getUserTicket, ticket:{tickets}, user:{user} }) => {

    useEffect(() => {
        getUserTicket()
    }, [getUserTicket])

    const [sure, setSure] = useState({
        cancel: "",
    })

    const {cancel} = sure

    //make buyer put in cancel to cancel order.
    const cancelOrderThirdStage = (e, id) => {
        e.preventDefault();
        if(cancel === "cancel"){
            deleteTicket(id)
            setSure({cancel: ""})
        }else{
            setAlert("Please type in... cancel ... to confirm.", 'primary' )
        }
    }
    const onCancel = e => setSure({...sure, [e.target.name]: e.target.value})

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
            <Info buyerInfo={"true"} />
            <AddAddress />

            {/* BUYER PAGE*/}
            <div className="empty-ticket-container">
            {!tickets ? "" :
                <Fragment>

                <div>{tickets.ticketsBuyer.length === 0 ? 
                    <Fragment>
                        <div className="no_content4">You have no orders</div> 
                        <div className="quote">" What Would Life Be Without diverse Food? "</div>
                    </Fragment>
                    : ""}
                </div>

                {/* 4/4 STATUS: received */}
                {tickets.ticketsBuyer.length === 0 ? "" : 
                    <div className="status-title">
                        <h3>4/4 Please Leave a Rating For the Seller. Thank You.</h3>
                        <div className="status-completed-container-buyer">
                        {tickets.ticketsBuyer.map((el, index) =>
                            <div key={index}>
                            {el.status === "received" ?
                                <div className="status-card" key={index}>
                                    <TicketLayoutStatus el={el} setAlert={setAlert} contactSeller={"true"} paymentReceipt={"true"} />

                                    <div className="rating">
                                        {el.scoreBuyer === 'yes' ? 
                                        <p className="rating-confirmed">Seller Rating...Confirmed!</p>
                                        : 
                                        <p>Seller Rating... <span>Not Confirmed</span></p> 
                                        }
                                    </div>

                                    <div className="status-btn">
                                    {el.scoreSeller === "no" ? 
                                        <Fragment>
                                        <p>Please leave a rating for the seller.</p>
                                        <div className="double-btn">
                                        <button className="completed-good" onClick={e => ratings_good(e, el.seller._id, el._id, (el.seller.good + 1), el.seller.bad, "yes" , `${el.scoreBuyer === "no" ? "no" : "yes"}` )}>Good</button>
                                        <button className="completed-bad"  onClick={e => ratings_bad(e, el.seller._id, el._id, el.seller.good, (el.seller.bad + 1), "yes" , `${el.scoreBuyer === "no" ? "no" : "yes"}` )}>Bad</button>
                                        </div>
                                        </Fragment>
                                        : <div className="double-btn">Rated Seller <TiTick color="#4fd680" /> <br/></div> }
                                    </div>

                                </div>
                            : "" }
                            </div>
                        )}
                    </div>
                </div>
                }

                {/* 3/4 STATUS: sent */}
                {tickets.ticketsBuyer.length === 0 ? "" : 
                    <div className="status-title">
                        <h3>3/4 Payment Sent. Waiting for seller to receive payment.</h3>
                        <div className="status-sent-container-buyer">
                        {tickets.ticketsBuyer.map((el, index) =>
                            <div key={index}>
                            {el.status === "sent" ?
                                <div className="status-card">
                                    <TicketLayoutStatus el={el} setAlert={setAlert} contactSeller={"true"} paymentReceipt={"true"} />

                                    <div className="status-btn">
                                        <p className="await-sending">awaiting for payment confirmation...</p>
                                        <div className="double-btn">
                                        <input type="text" placeholder="Enter -- cancel -- to " name="cancel" value={cancel} onChange={e => onCancel(e)} />
                                         <button className="cancel" onClick={e => cancelOrderThirdStage(e, el._id)}>Cancel Order</button>
                                        </div>
                                    </div>
                                
                                </div>
                            : "" }
                            </div>
                        )}
                    </div>
                </div>
                }

                {/* 2/4 STATUS: approved */}
                {tickets.ticketsBuyer.length === 0 ? "" : 
                <div className="status-title">
                    <h3>2/4 Approved By Seller</h3>
                    <div className="status-approved-container-buyer">
                    {tickets.ticketsBuyer.map((el, index) =>
                        <Fragment key={index}>
                        {el.status === "approved" ?
                            <div className="status-card">
                                <TicketLayoutStatus el={el} setAlert={setAlert} contactSeller={"true"} />

                                <Payment posts={el} setAlert={setAlert} TicketId={el._id} user={user} />
                            </div>
                        : "" }
                        </Fragment>
                    )}
                    </div>
                </div>
                }

                {/* 1/4 STATUS: awaiting  */}
                {tickets.ticketsBuyer.length === 0 ? "" : 
                <div className="status-title">
                    <h3>1/4 Awaiting Approval Confirmation From Seller. </h3>
                    <div className="status-awaiting-container-buyer">
                    {tickets.ticketsBuyer.map((el, index) =>
                        <div key={index}>
                        {el.status === "awaiting" ?
                            <div className="status-card" key={index}>
                                <TicketLayout el={el}/>
                                
                                <div className="status-btn">
                                    <li><p>Est.Delivery Date: {el.deliveryDate === "Invalid date" ? "unknown" : el.deliveryDate}</p></li>
                                    <li><p>Awaiting...</p></li>
                                    <li><button className="decline" onClick={() => deleteTicket(el._id)}>Cancel Order</button></li>
                                </div>
                            </div>
                        : "" }
                        </div>
                    )}
                    </div>
                </div>
                }

                </Fragment>
            }
            </div>
        </Fragment>
    )
}


BuyerTickets.propTypes = {
    ticket: PropTypes.object.isRequired,
    deleteTicket: PropTypes.func.isRequired,
    getUserTicket: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    scoreEachOther: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    ticket: state.ticketReducers,
    user: state.userReducers,
})

export default connect(mapStateToProps, {scoreEachOther, setAlert, deleteTicket, getUserTicket})(BuyerTickets)
