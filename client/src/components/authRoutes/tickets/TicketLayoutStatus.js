import './TicketLayoutStatus.scss';
import React, { Fragment, useState } from 'react';
import {MdContentCopy} from 'react-icons/md';
import moment from 'moment';

const TicketLayoutApproved = props => {

    const [info, setInfo] = useState(false)
    const [receipt, setReceipt ] = useState(false)

    const copy = (data) => {    
        navigator.clipboard.writeText(data)
        props.setAlert("Copied!", 'primary')
    }

    return (
        <Fragment>  
            {/* Ticket Information */}
            <div className="ticket-information">

            <div className="time-area">
                <p className="time">{moment(props.el.createdAt).format("lll").split(" ").slice(0, 2).join(" ")} {moment(props.el.createdAt).format("lll").split(" ").slice(3, 5).join(" ")} </p>
                <p className="time">ID: {props.el._id}</p>
            </div>

            {info === true ?
            <Fragment>
                <button className={info === true ? "info" : "" } onClick={() => setInfo(false)}>Close Information &#171;</button>
                <div className="price-area">
                    {props.el.delivery === "delivery" ?
                    <Fragment>
                        <p>Quantity:<span className="quantity">{props.el.quantity}</span></p>
                        <p>Price:<span className="price">£{props.el.price}</span> </p>

                        {props.el.deliveryCost === 0 ? <p>Delivery Cost: <span className="delivery-cost">FREE</span></p> 
                        : <p>Delivery Cost: <span className="delivery-cost">£{props.el.deliveryCost}</span></p> }

                        <p>Total:<span>£{(props.el.quantity * props.el.price) + props.el.deliveryCost}</span> </p>
                    </Fragment>
                    : 
                    <Fragment>
                        <p>Quantity:<span className="quantity">{props.el.quantity}</span></p>
                        <p>Price:<span className="price">£{props.el.price}</span> </p>
                        <p>Total:<span>£{(props.el.quantity * props.el.price)}</span> </p>
                    </Fragment>
                    }
                </div>

                <div className="description-area">
                    <p>Description:<span> {props.el.description}</span> </p>
                </div>

                <div className="dropdown-close">
                    <button onClick={() => setInfo(false)}>Close </button>
                </div>
            </Fragment>
            : <button className={info === true ? "info" : "" } onClick={() => setInfo(true)}>Ticket Information &#187; <span className="quick-info">£{props.el.quantity * props.el.price}</span></button> }
            </div>

            {/* Payment Information */}
            {props.paymentReceipt === "true" ? 
            <div className="payment-receipt">
                {receipt === true ? 
                <Fragment>
                    <button className={receipt === true ? "receipt-btn" : ""} onClick={() => setReceipt(false)}>Receipt &#171;</button>
                    <div className="receipt">
                        {props.el.delivery === "collect" ? 
                        <div className="payment-method-delivery">
                            <div className="delivery-collect">Collect</div>
                            <div className="address">
                                <p> Address:  <span>{props.el.sellerHome.address_s  }</span>        </p> 
                                <p> Address2: <span>{props.el.sellerHome.address2_s }</span>        </p> 
                                <p> City:     <span>{props.el.sellerHome.city_s     }</span>        </p> 
                                <p> Postcode: <span>{props.el.sellerHome.postcode_s.toUpperCase()}</span> </p> 
                            </div>
                            <div className="-payment-method">
                                <p>Payment Method: <span>{props.el.payment.charAt(0).toUpperCase() + props.el.payment.slice(1).toLowerCase()}</span></p>
                                {!props.el.transactionId.opt_1 ? "" : <li>{props.el.transactionId.opt_1}</li>}
                                {!props.el.transactionId.opt_2 ? "" : <li>{props.el.transactionId.opt_2}</li>}
                                {!props.el.transactionId.cryptoTransId ? "" : <li>Transaction ID: <button onClick={() => copy(props.el.transactionId.cryptoTransId)}> <span><MdContentCopy/> {props.el.transactionId.cryptoTransId}</span></button></li>}
                            </div>
                        </div>
                        : ""}

                        {props.el.delivery === "delivery" ? 
                        <div className="payment-method-delivery">
                            <div className="delivery-collect">Delivery Date: {props.el.deliveryDate === "Invalid date" ? "Unknown" : props.el.deliveryDate}</div>

                            <div className="address">
                                <p> Address:  <span>{props.el.buyerHome.address_b  }</span>        </p> 
                                <p> Address2: <span>{props.el.buyerHome.address2_b }</span>        </p> 
                                <p> City:     <span>{props.el.buyerHome.city_b     }</span>        </p> 
                                <p> Postcode: <span>{props.el.buyerHome.postcode_b.toUpperCase()}</span> </p> 
                            </div>
                            <div className="-payment-method">
                                <p>Payment Method: <span>{props.el.payment.charAt(0).toUpperCase() + props.el.payment.slice(1).toLowerCase()} </span> </p>
                                {!props.el.transactionId.opt_1 ? "" : <li>{props.el.transactionId.opt_1}</li>}
                                {!props.el.transactionId.opt_2 ? "" : <li>{props.el.transactionId.opt_2}</li>}
                                {!props.el.transactionId.cryptoTransId ? "" : <li>Transaction ID: <button onClick={() => copy(props.el.transactionId.cryptoTransId)}> <span><MdContentCopy/> {props.el.transactionId.cryptoTransId}</span></button></li>}
                            </div>
                        </div>
                        : ""}

                    </div>
                </Fragment>
                : 
                <button className={receipt === true ? "receipt-btn" : ""} onClick={() => setReceipt(true)}>Receipt &#187; <span className="quick-info">{props.el.delivery === "no" ? "nothing" : props.el.delivery} - {props.el.payment} </span></button> }
            </div>
            : ""}

            {/* Contact Area */}
            {props.contactSeller === "true" ?
            <div className="contact-area">
                <p>Seller Contacts:</p>

                <button onClick={() => copy(!props.el.seller.business.contactEmail ? props.el.seller.email : props.el.seller.business.contactEmail)}>
                    <span>{!props.el.seller.business.contactEmail ? props.el.seller.email : props.el.seller.business.contactEmail }</span>
                </button>
                <button onClick={() => copy(!props.el.seller.business.phone ?  "" : props.el.seller.business.phone)}>
                    <span>{!props.el.seller.business.phone ?  "" : props.el.seller.business.phone}</span>
                </button>
            </div>
            : ""}

            {props.contactBuyer === "true" ?
            <div className="contact-area">
                <p>Buyer Contacts:</p>

                <button onClick={() => copy(!props.el.buyer.business.contactEmail ? props.el.buyer.email : props.el.buyer.business.contactEmail) }>
                    <span>{!props.el.buyer.business.contactEmail ? props.el.buyer.email : props.el.buyer.business.contactEmail} </span>
                </button>
                <button onClick={() => copy(!props.el.buyer.business.phone ?  "" : props.el.buyer.business.phone )}>
                    <span>{!props.el.buyer.business.phone ?  "" : props.el.buyer.business.phone } </span>
                </button>
            </div>
            : ""}

        </Fragment>
    )
}

export default TicketLayoutApproved

