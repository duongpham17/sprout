import './Product.scss';
import React,{Fragment, useState} from 'react';
import {connect} from 'react-redux'
import moment from 'moment';

import {FaStar} from 'react-icons/fa';

import {createTicket} from '../../../actions/ticketActions';
import {updateQuantity} from '../../../actions/productActions';

const Product = props => {

    /* Ticket Orders */
    //Get current quantity choosen by buyer, then minus this quantity with the product quantity when submitted.
    const [ticketForm, setTicketForm] = useState({
        Quantity: "",
    })
    const {Quantity} = ticketForm

    //Values we will get back.
    const onSubmit = (e, price, seller, buyer, qty, description, collect, delivery2, deliveryDate, deliveryCost) => {
        e.preventDefault()
        if(seller=== buyer){
            props.setAlert("You can't buy your own product.", "primary")
        } else{
            props.createTicket(props.match, Quantity, price, seller, buyer, description, collect, delivery2, deliveryDate, deliveryCost)
            props.updateQuantity(props.match, qty)
            props.setAlert("Added to Purchasing!", 'success')
        } 
    }

    //buyer filling in the input will give us the Quantity value.
    const onChange = (e) => {
        setTicketForm({...ticketForm, [e.target.name]: e.target.value.toLowerCase()});
    }

    return (
    <Fragment>
    <div className="product_">

    <div className="product-content">
        <li>
        {props.post.ratingsAverage === 1 ? <p className="star"><FaStar/></p> : ""}
        {props.post.ratingsAverage === 2 ? <p className="star"><FaStar/><FaStar/></p> : ""}
        {props.post.ratingsAverage === 3 ? <p className="star"><FaStar/><FaStar/><FaStar/></p> : ""}
        {props.post.ratingsAverage === 4 ? <p className="star"><FaStar/><FaStar/><FaStar/><FaStar/></p> : ""}
        {props.post.ratingsAverage > 4.5 ? <p className="star"><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></p> : ""}
        </li> <br/>
        <li>{props.post.description_title}</li> <br/>
        <li>£{props.post.price}</li>
        <li>Quantity Available: {props.post.quantity}</li>
        {props.post.quantity < 1 ? <li><span className="out-of-stock">Out of Stock</span>. Check back later</li> :
        <Fragment>
        <form onSubmit={e => onSubmit(e, props.post.price, props.post.user._id, props.user, (props.post.quantity - Quantity), props.post.description_title, props.post.collect, props.post.delivery, moment(((props.post.est_delivery * 24 * 60 * 60 * 1000) + Date.now())).format("lll").split(" ").slice(0, 3).join(" "), props.post.cost_delivery)}>
            <input type="number" placeholder="amount" name="Quantity" value={Quantity} onChange={e => onChange(e)} max={props.post.quantity} min={props.post.minimumQuantity} required /> 
            <p>Total = £{(Quantity * props.post.price) + props.post.cost_delivery} Include Delivery Cost </p>
            <button type="submit">Add To Buyer</button>
        </form>

        {props.post.delivery === "yes" || props.post.collect === "yes" ? 
            <Fragment>
                <div className="delivery-content">
                    <li className={props.post.delivery === "no" ? "red" : "green"}>{props.post.delivery === "no" ? "No-Delivery" : "Delivery"}</li>
                    <li className={props.post.collect === "no" ? "red" : "green"}>{props.post.collect === "no" ? "No-Collection" : "Collection"}</li>
                </div>
                <div className="delivery">
                    {props.post.delivery === "no" ? "" :
                    <Fragment>
                    <li>{props.post.cost_delivery === 0 ? "FREE Delivery" : `Delivery Cost £${props.post.est_delivery}` }</li>
                    <li>({props.post.est_delivery > 1 ? `${props.post.est_delivery} days` : `${props.post.est_delivery} day`}) Estimated Delivery Date: <span>{moment(((props.post.est_delivery * 24 * 60 * 60 * 1000) + Date.now())).format("lll").split(" ").slice(0, 3).join(" ")}</span></li>
                    </Fragment>
                    }
                </div>
            </Fragment>
        : "" }

        </Fragment> 
        }


        {!props.post.descriptionOne ? "" : 
        <div className="description-content">
            <li><p>Description: {props.post.descriptionOne}</p></li>
        </div>
        }

    </div>
    </div>
    </Fragment>
    )
}

export default connect(null, {createTicket, updateQuantity})(Product)