import React, {useEffect} from 'react'
import {userData} from '../actions/userActions';
import {connect} from 'react-redux';
import { loadUser } from '../actions/authActions';

const LoadData = ({ userData, loadUser, auth: {loggedOn}})=> {

    useEffect(() => {
        if(document.cookie){
            loadUser(document.cookie)
        }
    }, [loadUser])

    useEffect(() => {
        if(loggedOn === true){
            userData()
        }
    }, [userData, loggedOn])


    return(
        <p></p>
    )
}

const mapStateToProps = state => ({
    auth: state.authReducers
})

export default connect(mapStateToProps, {userData, loadUser})(LoadData)
