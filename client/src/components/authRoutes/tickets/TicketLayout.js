import React, { Fragment } from 'react';
import moment from 'moment';

const TicketLayout = props => {

    const copy = (data) => {
        navigator.clipboard.writeText(data)
        props.setAlert("Copied!", 'primary')
    }

    return (
        <Fragment>
                <div className="price-area">
                    <p className="time">{moment(props.el.createdAt).format("lll").split(" ").slice(0, 2).join(" ")} {moment(props.el.createdAt).format("lll").split(" ").slice(3, 5).join(" ")} </p>
                    <p className="time">ID: {props.el._id}</p>
                    <p>Quantity:<span className="quantity">{props.el.quantity}</span></p>
                    <p>Price:<span className="price">£{props.el.price}</span> </p>
                    <p>Delivery Cost: <span className="delivery-cost">{props.el.deliveryCost === 0 ? "FREE" : `£${props.el.deliveryCost}` }</span></p>
                    <p>Total:<span>£{(props.el.quantity * props.el.price) + props.el.deliveryCost}</span> </p>
                </div>
                <br/>

                {props.contact === "true" ?
                <div className="contact-area">
                    <p>Seller Contacts:</p>
                    <p>
                        <button onClick={() => copy(props.el.seller.business.contactEmail === undefined ? props.el.seller.email : props.el.seller.business.contactEmail)}>
                            <span>{props.el.seller.business.contactEmail === undefined ? `${props.el.seller.email}` : `${props.el.seller.business.contactEmail}` } </span>
                        </button>
                    </p>
                    <p>
                        <button onClick={() => copy(props.el.seller.phone)}>
                            <span>{props.el.seller.phone === 0 ?  "" : `${props.el.seller.phone}` } </span>
                        </button>
                    </p>
                </div>
                : ""}

                {props.contactBuyer === "true" ?
                <div className="contact-area">
                    <button>
                        Buyer Contacts: <span>{props.el.buyer.contactEmail === "none" ? props.el.buyer.email : props.el.buyer.email} </span>
                    </button>
                </div>
                : ""}

                <div className="description-area">
                    <p>Description: <span>{props.el.description}</span></p>
                </div>
        </Fragment>
    )
}

export default TicketLayout

