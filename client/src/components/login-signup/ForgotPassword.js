import './ForgotPassword.scss';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {MdDone} from 'react-icons/md';

import { forgottenPassword } from "../../actions/authActions";

const ForgotLogin = ({forgottenPassword}) => {
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState("")
    const [sent, setSent] = useState(false)

    const forgot = (e) => {
        e.preventDefault()
        forgottenPassword(forgotPasswordEmail)
        setSent(true)
    }

    return (
        <div className="forgotten-password-container">
            <form>
            <h2>Forgotten Password</h2>
            <input minLength="6" type="email" placeholder="Enter Your Email" onChange={e => setForgotPasswordEmail(e.target.value)} />

            {sent === false ? 

            <button onClick={(e) => forgot(e)}>Send reset link to my email</button>
            :
            <button className="sent">Sent <MdDone/></button>
            }
            </form>
        </div>
    )
}


export default connect(null, {forgottenPassword})(ForgotLogin)
