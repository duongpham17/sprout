import './Payments.scss';
import React from 'react';

const Payment = props => {
    return (
        <div className="payment-content">
            <h3>I Accept These Payment Methods</h3>
            {!props.user.visa ? "" : <button className="visa">Visa</button> }
            {!props.user.paypal ? "" : <button className="paypal">Paypal</button> }
            {!props.user.cash === "no" ? "" : <button className="cash">Cash</button> }
            {!props.user.bitcoin ? "" : <button className="bitcoin">Bitcoin</button> }
            {!props.user.cardano ? "" : <button className="cardano">Cardano</button> }
            {!props.user.litecoin ? "" : <button className="litecoin">Litecoin</button> }
            {!props.user.dash ? "" : <button className="dash">Dash</button> }
            {!props.user.vechain ? "" : <button className="vechain">Vechain</button> }
        </div>
    )
}


export default Payment
