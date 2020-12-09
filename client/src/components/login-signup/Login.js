import './Authenticate.scss';
import React, { Fragment, useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {SiCodechef} from 'react-icons/si';
import {FaShoppingCart} from 'react-icons/fa';

import { login } from "../../actions/authActions";

const Login = ({login, auth:{loggedOn}}) => {

const [formData, setFormData] = useState({
  email: '',
  password: '',
});

const {email, password} = formData

const onSubmit = (e) => {
  e.preventDefault();
  login(email, password)
};

const onChange = (e) => {
  setFormData({...formData, [e.target.name]: e.target.value});
};

if(loggedOn){
  return <Redirect to='/' />
}

return (
    <Fragment>
    <section className="authentication-section">

      <form className="form" onSubmit={e => onSubmit(e)}>
        <h1>Login</h1>

          <input
            className={email.length >= 9  ? "change-border-bottom" : ""}
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            required
          />

          <input
            className={password.length >= 8  ? "change-border-bottom" : ""}
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
            required
          />

        <button type="submit">Login</button>
        <br/>
        <Link className="forgot-password-link" to="/forgot password">Forgot Password?</Link>

        <div className="other">
          <p>
          Dont have an account?<br/>
          <Link to="/signup seller"><SiCodechef/> Create a Seller</Link>  OR  <Link to="/signup buyer"><FaShoppingCart/> Create a Buyer</Link>
          </p>
        </div>
      </form>

      </section>
    </Fragment>
    );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.authReducers
})

export default connect(mapStateToProps, {login})(Login);