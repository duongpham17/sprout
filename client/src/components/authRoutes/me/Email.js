import React, {Fragment, useState} from 'react'
import {updateMyEmail} from '../../../actions/authActions';
import {setAlert} from '../../../actions/alertActions';
import {connect} from 'react-redux';
import {RiLockPasswordLine} from 'react-icons/ri';

const Email = props => {
    const [formData, setFormData] = useState({
        email: '',
        emailConfirm: '',
        passwordCurrent: '',
    })

    const {email, emailConfirm, passwordCurrent} = formData

    const onSubmit = (e) => {
        e.preventDefault()
        if(email !== emailConfirm){
            props.setAlert("Email Does not match.", "primary")
        } else {
        props.updateMyEmail(passwordCurrent, email)
        }
    }

    const onChange = (e) => setFormData({...formData, [e.target.name] : e.target.value})

 
    return (
        <div className='changepassword_container'>
        {props.open === 'email' ?
        <Fragment>
        <button className={`user-password-btn ${props.open==='email' ? "open" : ''}`} onClick={() => props.setOpen("none")}><RiLockPasswordLine size="1.5rem"/> Close Login Email </button>
        <form onSubmit={e => onSubmit(e)}>
            <div className="input-password-container">
                <li>
                    <h3>Current Login Email: {props.user.email}</h3>
                </li>

                <li>
                    <input type="password" placeholder="Current Password" minLength="8"
                    name="passwordCurrent" value={passwordCurrent} onChange={e => onChange(e)} required />
                </li>
                <li>
                    <input type="email" placeholder="New Login Email" maxLength="34"
                    name="email" value={email} onChange={e => onChange(e)} required />
                </li>
                <li>
                    <input type="email" placeholder="Confirm New Login Email" maxLength="34"
                    name="emailConfirm" value={emailConfirm} onChange={e => onChange(e)} required/>
                </li>

                <button type="submit">Change Loggin Email</button>
            </div>
        </form>
        </Fragment>
        :  
        <button className={`user-password-btn ${props.open === 'email' ? "open" : ''}`} onClick={() => props.setOpen("email")}><RiLockPasswordLine size="1.5rem"/> Change Login Email</button> 
        }
    </div>
    )
}

export default connect(null, {updateMyEmail, setAlert})(Email)
