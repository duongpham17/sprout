import React from 'react';
import {Route, Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import './PrivateRoute.scss';

//Private route for only role = admin
const PrivateRoute = ({component: Component, auth: {user:{role}}, ...rest}) => 
(
    <Route {...rest} 
        render={props => role !== 'admin'
        ? 
        <div className="no-access">This route is Restricted! <Link to='/'>Please return to Home page</Link></div> 
        : 
        (<Component {...props} />)}
    />
);

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.authReducers
})

export default connect(mapStateToProps)(PrivateRoute)