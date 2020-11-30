import './PrivateRoute.scss';
import React from 'react';
import {Route, Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const PrivateRoute = ({component: Component, auth: {user:{role}}, ...rest}) => 
(
    <Route {...rest} 
        render={props => role !== 'user'
        ? 
        <div className="on_reload">This page is only for logged in users. <Link to='/login'>Please Login</Link></div> 
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