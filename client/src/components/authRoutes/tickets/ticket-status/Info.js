import './Info.scss';
import React, {Fragment, useState} from 'react';
import {BiHelpCircle} from 'react-icons/bi';
import {Link} from 'react-router-dom';

const Info = props => {
    const [open, setOpen] = useState(false)

    return (
        <div className="info-container">
            <button onClick={() => setOpen(!open)}><BiHelpCircle/> Help</button>

            {open ? 
                <Fragment>
                {props.buyerInfo === "true" ? 
                <div className="info">
                    <h2>First Stage, 1/4</h2>
                    <p>Make an order. Wait for seller to approve your order.</p>
                    <h2>Second Stage, 2/4 </h2>
                    <p>Enter your delivery preferences (use "Add Address" to fill in address faster when checking out) and payment methods. Make sure to put the reference. For crypto users make sure to send the crypto transcation ID NOT your wallet address. <br/>  
                    Extra advice, contact seller if your unsure or cancel your order.
                    </p>
                    <h2>Third Stage, 3/4 </h2>
                    <p>
                        Waiting for seller to receive your payment.
                    </p>
                    <h2>Fourth Stage, 4/4 </h2>
                    <p>
                        Give the seller a rating, better to wait until you recieve your items.
                    </p>
                    <h2>Extra </h2>
                    <p>
                        If you cannot see your product from stage 3/4 or 4/4 check your bin and history.
                    </p>
                </div>
                : ""}

                {props.sellerInfo === "true" ? 
                <div className="info">
                    <h2>First Stage, 1/4</h2>
                    <p>You can approve or decline the order.</p>
                    <h2>Second Stage, 2/4 </h2>
                    <p>
                        Wait for buyer to send their delivery / collect preferences and the payment they used to pay you. <br/> 
                        You can add or remove the way you want to receive payments by going to "edit" and "Add a way to Recieve Payment". <Link to="/myproduct">Click me to go straight there</Link>
                    </p>
                    <h2>Third Stage, 3/4 </h2>
                    <p>
                        Click on "Receipt" to see the buyer preferences and the payment method used. Once you have recieved the payment click "Payment Received". 
                        <br/> Please do not send to the bin, always check with the buyer. The bin should only ever be used if a buyer does not send any details for a long period of time.
                    </p>
                    <h2>Fourth Stage, 4/4 </h2>
                    <p>
                        Leave the buyer a rating and wait for the buyer to leave you a rating. Sending straight to history means you get no points. <br/> 
                    </p>
                    <h2>Extra </h2>
                    <p>
                        If for some reason the product you approved is no longer there, that means the buyer has cancelled his order.
                    </p>
                </div>
                : ""}
                </Fragment>
            : "" }
        </div>
    )
}

export default Info
