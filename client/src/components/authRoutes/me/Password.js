import './Password.scss';
import React, {Fragment, useState} from 'react';
import {updateMyPassword} from '../../../actions/authActions';
import {connect} from 'react-redux';
import {RiLockPasswordLine} from 'react-icons/ri';
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai';
import {setAlert} from '../../../actions/alertActions';

const Password = props => {

    const [formData, setFormData] = useState({
        passwordCurrent: '',
        password: '',
        passwordConfirm: '',
    })

    const [see, setSee] = useState(false)

    const {passwordCurrent, password, passwordConfirm} = formData

    const onSubmit = (e) => {
        e.preventDefault()
        if(password !== passwordConfirm){
            props.setAlert("Check Your New & Confirm Password.", 'primary')
        } else {
            props.updateMyPassword(passwordCurrent, password)
        }
    }

    const onChange = (e) => setFormData({...formData, [e.target.name] : e.target.value})


    return (
        <div className='changepassword_container'>
        {props.open === 'password' ?
        <Fragment>
        <button className={`user-password-btn ${props.open==='password' ? "open" : ''}`} onClick={() => props.setOpen("none")}><RiLockPasswordLine size="1.5rem"/> Close Password </button>
        <form onSubmit={e => onSubmit(e)}>
            <div className="input-password-container">
                <li>
                    <input type={see ? "text" : "password"} placeholder="Current Password" 
                    name="passwordCurrent" value={passwordCurrent} onChange={e => onChange(e)} required />
                </li>
                <li>
                    <input type={see ? "text" : "password"} placeholder="New password" maxLength="72"
                    name="password" value={password} onChange={e => onChange(e)} required />
                </li>
                <li>
                    <input type={see ? "text" : "password"} placeholder="Confirm Password" maxLength="72"
                    name="passwordConfirm" value={passwordConfirm} onChange={e => onChange(e)} required  />
                </li>
                
                <button type="button" className="eye" onClick={() => setSee(!see)}>{see ? <AiFillEye /> : <AiFillEyeInvisible />  }</button><br/>
                <button type="submit">Change password</button>
            </div>
        </form>
        </Fragment>
        :  
        <button className={`user-password-btn ${props.open==='password' ? "open" : ''}`} onClick={() => props.setOpen("password")}><RiLockPasswordLine size="1.5rem"/> Change Password</button> 
        }
    </div>
    )
}


export default connect(null, {updateMyPassword, setAlert})(Password)
