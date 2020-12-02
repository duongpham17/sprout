import React, {useEffect} from 'react'
import {userData} from '../actions/userActions';
import {connect} from 'react-redux';

const LoadData = ({ userData, auth: {loggedOn}})=> {

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

export default connect(mapStateToProps, {userData})(LoadData)
