import './Payment.scss';
import React, {Fragment, useState} from 'react';
import {ticketPaymentDetails, deleteTicket} from '../../../../actions/ticketActions';
import {connect} from 'react-redux';
import {MdContentCopy} from 'react-icons/md';
import {TiLocationArrowOutline} from 'react-icons/ti';
import {FaHome} from 'react-icons/fa';

const Payment = props => {

    //let users open and close the address form. Check and Fill address form before sending to seller.
    const [checkForm, setCheckForm] = useState(true)
    //let users enter the bitcoin transaction id
    const [cryptoTransaction, setCryptoTransaction] = useState("none")
    //payment options drop down
    const [paymentOption, setPaymentOption ] = useState(false)
    
    /* Setting two seperate useState - setAddress & setPaymentData. Both are based on user input. This makes it cleaner & easier to replace & fill values. */
    //Buyer & Seller. Status set to sent. Static Information for Ticket, once buyer clicks submit these info will be sent.
    const [address, setAddress] = useState({
        status: "sent",

        address_b: "",
        address2_b: "",
        city_b: "",
        postcode_b: "",

        address_s: props.posts.seller.business.address,
        address2_s: !props.posts.seller.business.address2 ? "" : props.posts.seller.business.address2,
        city_s: props.posts.seller.business.city,
        postcode_s: props.posts.seller.business.postcode,
    })
    //Payment data will be filled once. user chooses a payment method.
    const [paymentData, setPaymentData] = useState(
        {
        payment: "",
        delivery: "",
        
        opt_1: "",
        opt_2: "",
        opt_3: "",
        opt_4: "",
        opt_5: "",
        opt_6: "",
        cryptoTransId: "none",
        }
    )

    //simple deconstructing of the useState. Easier to use the variables E.g address.address_b === address_b
    const { address_b, address2_b, city_b, postcode_b } = address
    const { payment, delivery, cryptoTransId } = paymentData
    
    //target "name" to equal the value passed into "value" inside <input />.
    const onChange = (e) => setAddress({...address, [e.target.name] : e.target.value})

    //Let users auto fill form address with the address they have saved.
    const AddressIndex = (index) => {
        //set the index value corresponding to where the choosen address sits inside the array E.g user.addresses[0] or user.addressess[1].
        setAddress({...address,
            address_b: props.user.addresses[index].address,
            address2_b: props.user.addresses[index].address2,
            city_b: props.user.addresses[index].city,
            postcode_b: props.user.addresses[index].postcode,
        })
    }

    //choose which payment methods users like to pay with
    const payment_data = (data) => {
        setPaymentData(data)
        setPaymentOption(false)
    }

    //once choosen and sent the user can then submit the form. Cant use concat since its object. So use Object.assign({}, object1, object2).
    //combine paymentData object with address object into one object. So we can pass 1 object containing all information into the body for API / AXIOS
    const SubmitPaymentDetails = (e) => {
        e.preventDefault()
        props.ticketPaymentDetails(props.TicketId, Object.assign({}, paymentData, address) )
    }

    //choose payment method
    const dropDownBtn = () => {
        //clicking "choose payment method" will drop down payment options
        setPaymentOption(!paymentOption)
        //everytime we click this button, we will reset the payment data. But persist the delivery options.
        setPaymentData({delivery : delivery})
        setCryptoTransaction("none")
    }

    //click to copy information
    const copy = (data) => {
        navigator.clipboard.writeText(data)
        props.setAlert("Copied!", 'primary')
    }

    //uppercase first letter of a word 
    const upper = (value) => {
       return ( value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() )
    }

    //component to add new crypto currency payment
    const CryptoCurrency = (props) => (
        <Fragment>
        {!props.posts ? ""
        : <li>
            <button onClick={() => payment_data({...paymentData,
                payment: props.currency,
                opt_1: `Seller Address: ${props.posts}`, 
                cryptoTransId: cryptoTransaction, 
            })
            }>{upper(props.currency)}</button>
        </li> }
        </Fragment>
    )
    //component for when a crypto payment is picked. send the correct payment method.
    const SendCryptoTransaction = (props) => (
        <Fragment>
        {payment === props.currency ? 
            <div className="-payment">
                <li><button onClick={() => copy(props.posts)}><MdContentCopy/>Seller {upper(props.currency)} Address: <span>{props.posts}</span></button></li>
                <li className="crypto-transaction">Your {upper(props.currency)} Transaction Id ({cryptoTransId.length})</li>
                <li><textarea maxLength="64"
                placeholder={cryptoTransaction.length <= 20 ? "Send payment to seller first. Then enter the transaction ID and click Send." : cryptoTransaction} 
                onChange={e => setCryptoTransaction(e.target.value)} /></li>
                <li><button className={cryptoTransId.length > 21 ? "send" : ""} onClick={() => payment_data({...paymentData, cryptoTransId: cryptoTransaction })}>{cryptoTransId.length > 21 ? "Sent" : "Send"} <TiLocationArrowOutline/></button></li>
            </div>
        : ""}       
        </Fragment>
    )

    return (
        <Fragment>
            <div className="payment-data">

            {/* 1/4 ) Collect And Delivery, Let Buyer pick. */}
            {props.posts.collect === "yes" && props.posts.delivery2 === "yes" ? 
            <div className="delivery-or-collect">                 
                <li> <button className={delivery === "delivery"? "-delivery-" : ""} onClick={() => setPaymentData({ delivery: "delivery"})}>Delivery</button> </li>
                <li> <button className={delivery === "collect" ? "-delivery-" : ""} onClick={() => setPaymentData({ delivery: "collect"})}>Collect</button> </li>
            </div>
            : ""}

            {/* Let users check address again and to progress to payment */}
            {delivery === "collect" || delivery === "delivery" ? 
            <div className="check-address">
                <button onClick={() => setCheckForm(!checkForm)}>{checkForm === true ? "Next" : "Check Address"}</button>
            </div> 
            : "" }

            {checkForm === true ? 
            <Fragment>

            {/* Collect Only */}
            {delivery === "collect" ?
            <div className="user-address"> 
                <li>Seller's Address</li>
                <li>Address:  <span>{props.posts.seller.business.address}</span></li>
                <li>Address2: <span>{props.posts.seller.business.address2}</span></li>
                <li>City:  <span>{props.posts.seller.business.city}</span></li>
                <li>Post Code: <span>{props.posts.seller.business.postcode.toUpperCase()}</span></li>
            </div>
            : "" }

            {/* Delivery Only. Buyers must fill out the their address or click a saved address */}
            {delivery === "delivery" ? 
            <div className={`user-address`}>
                <li className="delivery-date">Est.Delivery: {props.posts.deliveryDate}</li><br/>

                <div className="pick-address">
                    {props.user.addresses.map((el, index) => 
                        <div className="-pick" key={index}>
                            <button onClick={e => AddressIndex(index)}><FaHome/> {el.title}</button>
                        </div> 
                    )}
                </div>

                <li>Your Address</li>
                <small>Address:</small>
                <li><input type="text" placeholder="...." maxLength="40" minLength="5" name="address_b" value={address_b} onChange={e => onChange(e)} required /> </li>
                <small>Address 2: *optional*</small>
                <li><input type="text" placeholder="...." maxLength="40" minLength="5" name="address2_b" value={address2_b} onChange={e => onChange(e)} /></li>
                <small>City:</small>
                <li><input type="text" placeholder="...." maxLength="25" minLength="5" name="city_b" value={city_b} onChange={e => onChange(e)} required /></li>
                <small>Post Code:</small>
                <li><input type="text" placeholder="...." maxLength="15" minLength="5" name="postcode_b" value={postcode_b} onChange={e => onChange(e)} required  /></li>
            </div>
            : ""}

            </Fragment>
            : "" }

            {/* 2/4 ) Pick a Payment Method that the seller accepts */}
            {delivery === "delivery" || delivery === "collect" ? 
            <div className="payment-dropdown-container">

                {postcode_b.length >= 5 || delivery === "collect"  ?
                <div className="dropdown-btn"><button onClick={() => dropDownBtn()}>Choose Payment Method</button></div>
                : "" }

                {paymentOption === true ?
                <Fragment>
                <div className="payment-options">

                    {/* Cash only, for collect */}
                    {delivery === "collect" ? 
                    <li> <button onClick={() => payment_data({...paymentData, payment: "cash"})}>Cash</button></li> 
                    : ""}

                    {/* Visa */}
                    {!props.posts.seller.visa.bank ? ""
                    : <li>
                        <button onClick={() => payment_data({...paymentData,
                            payment: "visa",
                            opt_1: `Bank: ${props.posts.seller.visa.bank}`, 
                            opt_2: `Reference: ${props.TicketId.slice(15, 30)}`,
                            opt_3: `First Name: ${props.posts.seller.visa.first}`,
                            opt_4: `Last Name: ${props.posts.seller.visa.last}`,
                            opt_5: `Sort Code: ${props.posts.seller.visa.sortcode}`,
                            opt_6: `Account Number: ${props.posts.seller.visa.accountnumber}`,
                        })
                        }>Visa</button>
                    </li> }

                    {/* Paypal */}
                    {!props.posts.seller.paypal.email ? ""
                    : <li>
                        <button onClick={() => payment_data({...paymentData,
                            payment: "paypal",
                            opt_1: `Email: ${props.posts.seller.paypal.email}`,
                            opt_2: `Reference: ${props.TicketId.slice(15, 30)}`,
                        })
                        }>Paypal</button>
                    </li> }

                    {/* Bitcoin */}
                    <CryptoCurrency posts={props.posts.seller.bitcoin} currency={"bitcoin"} />
                    {/* Cardano */}
                    <CryptoCurrency posts={props.posts.seller.cardano} currency={"cardano"} />
                    {/* Litecoin */}
                    <CryptoCurrency posts={props.posts.seller.litecoin} currency={"litecoin"} />
                    {/* Dash */}
                    <CryptoCurrency posts={props.posts.seller.dash} currency={"dash"} />
                    {/* Vechain */}
                    <CryptoCurrency posts={props.posts.seller.vechain} currency={"vechain"} />

                </div>
                </Fragment>
                : ""}
            </div>
            : ""}

            {/* 3/4 ) Choosen payment, Return seller payment information based on selection from above */}
            <div className="seller-payment-info">

                {payment === "visa" ? 
                <div className="-payment">
                    <li>Bank Name:  <span>{props.posts.seller.visa.bank} </span></li>
                    <li>First Name: <span>{props.posts.seller.visa.first}</span></li>
                    <li>Last Name:  <span>{props.posts.seller.visa.last} </span></li>
                    <li><button onClick={() => copy(props.TicketId.slice(15, 30)) }><MdContentCopy/> Reference: <span>{props.TicketId.slice(15, 30)}</span></button></li>
                    <li><button onClick={() => copy(props.posts.seller.visa.sortcode) }><MdContentCopy/> Sort Code: <span>{props.posts.seller.visa.sortcode}</span></button></li>
                    <li><button onClick={() => copy(props.posts.seller.visa.accountnumber) }><MdContentCopy/> Account Number: <span>{props.posts.seller.visa.accountnumber}</span></button></li>
                </div>
                : ""}

                {payment === "paypal" ? 
                <div className="-payment">
                    <li><button onClick={() => copy(props.posts.seller.paypal.email)}><MdContentCopy/>Email:<span> {props.posts.seller.paypal.email}</span></button></li>
                    <li><button onClick={() => copy(props.TicketId.slice(15, 30))}><MdContentCopy/>Reference:<span> {props.TicketId.slice(15, 30)}</span></button></li>
                </div>
                : ""}

                {/* Bitcoin */}
                <SendCryptoTransaction posts={props.posts.seller.bitcoin} currency={"bitcoin"}  /> 
                {/* Cardano */}
                <SendCryptoTransaction posts={props.posts.seller.cardano} currency={"cardano"}  /> 
                {/* Litecoin */}
                <SendCryptoTransaction posts={props.posts.seller.litecoin} currency={"litecoin"}  /> 
                {/* Dash */}
                <SendCryptoTransaction posts={props.posts.seller.dash} currency={"dash"} /> 
                {/* Vechain */}
                <SendCryptoTransaction posts={props.posts.seller.vechain} currency={"vechain"}  /> 

            </div>

            {/* 4/4 Send Order To Seller */}
            <div className="status-btn">
                <div className="double-btn">
                <li><button className="decline" onClick={() => props.deleteTicket(props.TicketId)}>Cancel Order</button></li>
                
                {/* Submit button for visa, paypal, cash */}
                {payment === "cash"  || payment === "visa" || payment === "paypal"  ? 
                <li><button className="submit" onClick={e => SubmitPaymentDetails(e)}>Submit Order</button></li> 
                : ""}

                {/* Submit button for visa and paypal */}
                {cryptoTransaction.length >= 20 ? 
                <li><button className={`submit ${cryptoTransId === "none" ? "hidden" : ""}`} onClick={e => SubmitPaymentDetails(e)}>Submit Order</button></li> 
                : ""}
                </div>
            </div>

            
            </div>
        </Fragment>
    )
}

export default connect(null, {ticketPaymentDetails, deleteTicket})(Payment)