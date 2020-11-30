import './Authenticate.scss';
import React, { Fragment, useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";

import { signupBuyer } from '../../actions/authActions'
import { setAlert } from '../../actions/alertActions'

const SignupBuyer = ({setAlert, signupBuyer, auth:{loggedOn}}) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        emailConfirm: '',
        password: '',
        passwordConfirm: '',
        termsAndCondition: '',
    })

const {name, email, emailConfirm, password, passwordConfirm, termsAndCondition} = formData

const onChange = (e) => {setFormData({...formData, [e.target.name]: e.target.value, })};

const onSubmit = (e) => {
    e.preventDefault();
    if(password !== passwordConfirm) {
      setAlert('Password does not match. Please try again.', 'danger')
    } else if(email !== emailConfirm){
      setAlert('Email does not match. Please Check if its correct.', 'danger')
    } else {
      signupBuyer(name, email, password, termsAndCondition)
    }
};

if(loggedOn){
  return <Redirect to='/' />
}

return (
    <Fragment>
    <section className="authentication-section">
      <form className="form" onSubmit={e => onSubmit(e)}>

        <h3><Link to="/signup">Seller?</Link></h3>
        <h1>Create A Buyer Account</h1>

          <input
            className={name.length >= 4  ? "change-border-bottom" : ""}
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={e => onChange(e)}
            minLength="4"
            maxLength="30"
            required
          />

          <input
            className={email.length >= 9  ? "change-border-bottom" : ""}
            type="email"
            placeholder="Email Address used for login"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            maxLength="40"
            minLength="8"
            required
          />

          <input
            className={emailConfirm === email && emailConfirm.length >= 1  ? "change-border-bottom" : ""}
            type="email"
            placeholder="Confirm Email Address for login"
            name="emailConfirm"
            value={emailConfirm}
            onChange={e => onChange(e)}
            required
          />
   
          <input
            className={password.length >= 8 ? "change-border-bottom" : ""}
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
            minLength="8"
            maxLength="72"
            required
          />

          <input
            className={passwordConfirm === password && passwordConfirm.length >= 1  ? "change-border-bottom" : ""}
            type="password"
            placeholder="Confirm Password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={e => onChange(e)}
            required
          />

        <div className="terms-condition">
        <a href="/terms_and_conditions">Read The Terms & Conditions</a>   
        <button className={termsAndCondition === "yes" ? "agree" : ""} type="button" onClick={() => setFormData({...formData, termsAndCondition: "yes"})}>I Accept These Terms And Conditions</button>
        </div>

        {termsAndCondition === "yes" ?
        <button> Submit </button>
        : ""}
        
        <div className="other">
          <p> Already have an account? <Link to="/login">Login</Link> </p>
        </div>

      </form>

      </section>
    </Fragment>
    );
}

const mapStateToProps = state => ({
  auth: state.authReducers
})

export default connect(mapStateToProps, {setAlert, signupBuyer})(SignupBuyer);