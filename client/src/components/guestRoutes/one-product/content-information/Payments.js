import './Payments.scss';
import React from 'react';

const Payment = props => {
    return (
        <div className="payment-content">
            <h3>I Accept These Payment Methods</h3>
            {!props.user.visa.sortcode ? "" : props.user.visa.sortcode.length === 6 && props.user.visa.accountnumber.length === 8  ? <button className="visa">Visa</button> : ""  }

            {props.user.paypal.email.length <= 3 ? "" : <button className="paypal">Paypal</button> }

            {props.user.cash === "no" ? "" : <button className="cash">Cash</button> }

            {props.user.bitcoin.length <= 12 ? "" : <button className="bitcoin">Bitcoin</button> }

            {props.user.cardano.length <= 12 ? "" : <button className="cardano">Cardano</button> }

            {props.user.litecoin.length <= 12 ? "" : <button className="litecoin">Litecoin</button> }

            {props.user.dash.length <= 12 ? "" : <button className="dash">Dash</button> }

            {props.user.vechain.length <= 12 ? "" : <button className="vechain">Vechain</button> }
        </div>
    )
}

export default Payment
