import './ForgotPassword.scss';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {MdDone} from 'react-icons/md';

import { forgottenPassword, tryAgain  } from "../../actions/authActions";

const ForgotLogin = ({forgottenPassword, tryAgain, auth:{sent}}) => {

    const [forgotPasswordEmail, setForgotPasswordEmail] = useState("")

    const forgot = (e) => {
        e.preventDefault()
        forgottenPassword(forgotPasswordEmail)
    }

    return (
        <div className="forgotten-password-container">
            {!sent ? 
            <form>
            <h2>Forgotten Password</h2>
            <input minLength="6" type="email" placeholder="Enter Your Email" onChange={e => setForgotPasswordEmail(e.target.value)} required />
            <button onClick={(e) => forgot(e)}>Send reset link to my email</button>
            </form>
            :
            <button onClick={() => tryAgain()} className="sent"><MdDone/> Sent to : {forgotPasswordEmail} <br/><br/> Please Check Your Junk. <br/><br/> Try again after 3minutes </button>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.authReducers
})

export default connect(mapStateToProps, {forgottenPassword, tryAgain})(ForgotLogin)
