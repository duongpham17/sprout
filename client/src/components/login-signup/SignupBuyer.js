import './Authenticate.scss';
import React, { Fragment, useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";

import { signup, signupConfirm } from '../../actions/authActions'
import { setAlert } from '../../actions/alertActions'

const SignupBuyer = ({setAlert, signup, signupConfirm, auth:{loggedOn, confirm}}) => {

    const [check, setCheck] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        emailConfirm: '',
        password: '',
        passwordConfirm: '',
        termsAndCondition: '',
        code: (10000 + Math.random() * 99999).toFixed(0),
        code_confirm: "",
    })

  const {name, email, emailConfirm, password, passwordConfirm, termsAndCondition, code_confirm, code} = formData

  const onChange = (e) => {setFormData({...formData, [e.target.name]: e.target.value, })};

  const onSubmit = (e, type) => {
      e.preventDefault()
      setCheck(true)
      if(type === "verify"){
          if(password !== passwordConfirm){
              setAlert("Passwords Don't Match.", "danger")
              setCheck(false)
          } else {
              signup(formData)
              setTimeout(function(){setCheck(false) }, 2000);
          }
      }

      if(type === "confirm"){
          if(code_confirm !== code){
              setAlert("The code does not match", "danger")
          } else {
              signupConfirm(formData)
          }
      }
  };

  if(loggedOn){
    return <Redirect to='/' />
  }

return (
    <Fragment>
    <section className="authentication-section">
    {!confirm ?
      <form className="form" onSubmit={e => onSubmit(e, "verify")}>
        <h3><Link to="/signup seller">Seller?</Link></h3>
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
        <Fragment>
            {check ? <Fragment><div className="loading_signup"/><br/><br/></Fragment> :
                <button>Create</button>
            }
        </Fragment>
        : "" }
        
        <div className="other">
          <p> Already have an account? <Link to="/login">Login</Link> </p>
        </div>
      </form>
      : 
      <form className="confirm-email-content" onSubmit={e => onSubmit(e, "confirm")} >
        <h2>Please check <br/> {!formData.email ? "Your Email" : formData.email} <br/> for the code.</h2>
        <input type="text" placeholder="Enter code here" name="code_confirm" value={code_confirm} onChange={(e) => onChange(e) }  />
        <button>Confirm</button>
      </form>
      }
      </section>
    </Fragment>
    );
}

const mapStateToProps = state => ({
  auth: state.authReducers
})

export default connect(mapStateToProps, {setAlert, signup, signupConfirm})(SignupBuyer);