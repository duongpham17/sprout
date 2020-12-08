import './Payment.scss';
import React, {useState, Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import {AiOutlineCreditCard} from 'react-icons/ai'


import {paymentOptions} from '../../../actions/userActions';

const Payment = ({paymentOptions, user:{user}}) => {
    const [open, setOpen] = useState(false)

    const [formData, setFormData] = useState("normal")

    const [paymentForm, setPaymentForm] = useState({
        cash: "",

        /* Visa */
        sortcode: "", accountnumber: "", bank: "", first: "", last: "",
        
        /* Paypal */
        email: "", 

        /* Crypto */
        bitcoin: "",
        cardano: "",
        litecoin: "",
        dash: "",
        vechain: "",
    })

    useEffect(() => {
        const pay = !user ? "" : user
        const visa = !user ? "" : user.visa
        const paypal = !user ? "" : user.paypal

        setPaymentForm({
            cash: pay.cash,

            bank: visa.bank,
            first: visa.first,
            last: visa.last,
            sortcode: visa.sortcode,
            accountnumber: visa.accountnumber,

            email: paypal.email,

            bitcoin: pay.bitcoin,
            cardano: pay.cardano,
            litecoin: pay.litecoin,
            dash: pay.dash,
            vechain: pay.vechain,
        })
    }, [user, setOpen])

    const {cash, bank, email, sortcode, accountnumber, first, last, bitcoin, cardano, litecoin, dash, vechain} = paymentForm

    const onChange = (e) => setPaymentForm({...paymentForm, [e.target.name]: e.target.value});

    const submitPayment = (e) => {
        e.preventDefault()
        paymentOptions(paymentForm)
    }

    const clearForm = (e) => {
        e.preventDefault()
        setPaymentForm({
            cash: "no",
            /* Visa */
            sortcode: "", accountnumber: "", bank: "", first: "", last: "",
            /* Paypal */
            email: "", 
            /* Crypto */
            bitcoin: "", cardano: "", litecoin: "", dash: "", vechain: "",
        })
    }

    return (
        <Fragment>
        <div className="add-payment">
            <button className={open ? "open" : ""} onClick={() => setOpen(!open)}><AiOutlineCreditCard/> Add a way to Receive Payment</button>
        </div>

        {!user ? "" :
        <div className="payment-content">
            {open === true ?
            <Fragment>
                <div className="payment">
                    <li><button className={formData === "cash" ? "payment-btn" : ""}  onClick={() => setFormData("cash") }>Cash</button></li>
                    <li><button className={formData === "visa" ? "payment-btn" : ""} onClick={() => setFormData("visa") }>Visa</button></li>
                    <li><button className={formData === "paypal" ? "payment-btn" : ""}  onClick={() => setFormData("paypal") }>Paypal</button></li>
                    <li><button className={formData === "bitcoin" ? "payment-btn" : ""}  onClick={() => setFormData("bitcoin") }>Bitcoin</button></li>
                    <li><button className={formData === "cardano" ? "payment-btn" : ""}  onClick={() => setFormData("cardano") }>Cardano</button></li>
                    <li><button className={formData === "litecoin" ? "payment-btn" : ""}  onClick={() => setFormData("litecoin") }>Litecoin</button></li>
                    <li><button className={formData === "dash" ? "payment-btn" : ""}  onClick={() => setFormData("dash") }>Dash</button></li>
                    <li><button className={formData === "vechain" ? "payment-btn" : ""}  onClick={() => setFormData("vechain") }>Vechain</button></li>

                {formData === "cash" ? 
                <div className="payment-methods">
                    <p>If Cash is Yes. Cash payment will only be available for Buyer's that are collecting.</p>
                    <button className={cash === "yes" ? "no-cash" : ""} onClick={() => setPaymentForm({...paymentForm, cash: "yes"}) }>Yes</button>
                    <button className={cash === "no" ? "no-cash" : ""} onClick={() => setPaymentForm({...paymentForm, cash: "no"}) }>No</button>
                </div>
                : ""}

                {formData === "visa" ? 
                <div className="payment-methods">
                    <small>Bank Name:</small>
                    <input type="text" maxLength="18" minLength="3"  placeholder={!user.visa.bank ? "...." : bank} name="bank" value={bank || ""} onChange={e => onChange(e)} required/>
                    <small>First Name:</small>
                    <input type="text" maxLength="20" minLength="1"  placeholder={!user.visa.first  ? "...." : first} name="first" value={first || ""} onChange={e => onChange(e)} required/>
                    <small>Last Name:</small>
                    <input type="text" maxLength="20" minLength="1"  placeholder={!user.visa.last  ? "...." : last} name="last" value={last || ""} onChange={e => onChange(e)} required/>
                    <small>Sort Code:</small>
                    <input type="text" maxLength="6" minLength="6"  placeholder={!user.visa.sortcode  ? "...." : sortcode} name="sortcode" value={sortcode || ""} onChange={e => onChange(e)} required/>
                    <small>Account Number:</small>
                    <input type="text" maxLength="8" minLength="8"  placeholder={!user.visa.accountnumber  ? "...." : accountnumber} name="accountnumber" value={accountnumber || ""} onChange={e => onChange(e)} required/>
                </div>
                : ""}

                {formData === "paypal" ? 
                <div className="payment-methods">
                    <small>Paypal Email</small>
                    <input type="email" maxLength="40" placeholder={!user.paypal.email  ? "...." : email}   name="email" value={email || ""} onChange={e => onChange(e)} required/>
                </div>
                : ""}

                {formData === "bitcoin" ? 
                <div className="payment-methods">
                    <small>Bitcoin Address ({!user.bitcoin ? "0" : user.bitcoin.length }) Characters:</small>
                    <textarea type="text" maxLength="63" placeholder={!user.bitcoin  ? "...." : `${user.bitcoin}`} name="bitcoin" value={bitcoin || ""} onChange={e => onChange(e)} required/>
                </div>
                : ""}

                {formData === "cardano" ? 
                <div className="payment-methods">
                    <small>Cardano Address ({!user.cardano ? "0" : user.cardano.length }) Characters:</small>
                    <textarea type="text" maxLength="63" placeholder={!user.cardano ? "...." : `${user.cardano}`} name="cardano" value={cardano || ""} onChange={e => onChange(e)} required/>
                </div>
                : ""}

                {formData === "litecoin" ? 
                <div className="payment-methods">
                    <small>Litecoin Address ({!user.litecoin ? "0" : user.litecoin.length }) Characters:</small>
                    <textarea type="text" maxLength="63" placeholder={!user.litecoin ? "...." : `${user.litecoin}`} name="litecoin" value={litecoin || ""} onChange={e => onChange(e)} required/>
                </div>
                : ""}

                {formData === "dash" ? 
                <div className="payment-methods">
                    <small>Dash Address ({!user.dash ? "0" : user.dash.length }) Characters:</small>
                    <textarea type="text" maxLength="63" placeholder={!user.dash ? "...." : `${user.dash}`} name="dash" value={dash || ""} onChange={e => onChange(e)} required/>
                </div>
                : ""}

                {formData === "vechain" ? 
                <div className="payment-methods">
                    <small>Vechain Address ({!user.vechain ? "0" : user.vechain.length }) Characters:</small>
                    <textarea type="text" maxLength="63" placeholder={!user.vechain ? "...." : `${user.vechain}`} name="vechain" value={vechain || ""} onChange={e => onChange(e)} required/>
                </div>
                : ""}

                <div className="save-clear-btn">
                    <li><button className="save" onClick={(e) => submitPayment(e)}>Save Changes</button></li>
                    <li><button className="clear" onClick={(e) => clearForm(e)}>Clear All</button></li>
                </div>

            </div>

            </Fragment>
            : "" }
        </div>
        }
        </Fragment>
    )
}

const mapStateToProps = state => ({
    user: state.userReducers
})

export default connect(mapStateToProps, {paymentOptions})(Payment)
