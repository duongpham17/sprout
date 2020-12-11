import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {userData} from '../actions/userActions';
import {totalProductsByRegion} from '../actions/statsActions';

const LoadData = ({ totalProductsByRegion, userData, auth: {loggedOn}})=> {

    useEffect(() => {
        if(loggedOn === true) return userData()
    }, [userData, loggedOn])

    useEffect(() => {
        totalProductsByRegion()
    }, [totalProductsByRegion])

    return (<></>)
}

const mapStateToProps = state => ({
    auth: state.authReducers
})

export default connect(mapStateToProps, {userData, totalProductsByRegion})(LoadData)
