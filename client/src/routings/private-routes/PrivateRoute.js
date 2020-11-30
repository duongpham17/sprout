import './PrivateRoute.scss';
import React from 'react';
import {Route, Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const PrivateRoute = ({component: Component, auth: {loggedOn}, ...rest}) => 
(
    <Route {...rest} 
        render={props => !loggedOn
        ? 
        <div className="no-access">This page is only for logged in users. <Link to='/login'>Please Login</Link> Or <Link to='/signup'>Signup</Link></div> 
        : 
        (<Component {...props} />) }
    />
);

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.authReducers
})

export default connect(mapStateToProps)(PrivateRoute)
