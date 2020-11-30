import "./CreateUser.scss";
import React,{useState} from 'react'
import {connect} from 'react-redux';
import {setAlert } from '../../actions/alertActions';
import {createUser} from '../../actions/adminAction';

const CreateUser = ({createUser, setAlert}) => {
    const [data, setData] = useState({
        role: "",
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        termsAndCondition: "yes",
    })  
    
    const {role, name, email, password, passwordConfirm} = data

    const onSubmit = (e) => {
        e.preventDefault()

        if(password !== passwordConfirm){
            setAlert("password does not match", 'primary')
        } else {
            createUser(data)
            setData({
                role: "",
                name: "",
                email: "",
                password: "",
                passwordConfirm: "",
                termsAndCondition: "yes",
            })
        }
    }


    const onChange = (e) => setData({...data, [e.target.name] : e.target.value})
    return (
        <div className="create-user">
            <form onSubmit={e => onSubmit(e)}>  
                <small>Role</small>
                <input className={role === "user" || role === "admin" ? "okay" : ""} type="text" placeholder="..." name="role" value={role} onChange={(e) => onChange(e)} required />
                <small>Name</small>
                <input className={name.length >= 4 ? "okay" : ""} type="text" placeholder="..." name="name" value={name} onChange={(e) => onChange(e)} maxLength="15" minLength="4" required />
                <small>Email</small>
                <input className={email.length >= 12 ? "okay" : ""}  type="email" placeholder="..." name="email" value={email} onChange={(e) => onChange(e)} maxLength="34" minLength="12" required/>
                <small>Password</small>
                <input className={password.length >= 8 ? "okay" : ""}  type="password" placeholder="..." name="password" value={password} onChange={(e) => onChange(e)} maxLength="100" minLength="8" required />
                <small>Password Confirm</small>
                <input className={password === passwordConfirm && password.length >= 1 ? "okay" : ""}  type="password" placeholder="..." name="passwordConfirm" value={passwordConfirm} onChange={(e) => onChange(e)} minLength="8" required />

                <button>Submit</button>
            </form>
        </div>
    )
}

export default connect(null, {createUser, setAlert})(CreateUser)
