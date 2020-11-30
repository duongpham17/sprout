import './GetUser.scss';
import React, { Fragment, useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {getUserWithId, getUserWithEmail, updateUser} from '../../actions/adminAction';

const GetUser = ({getUserWithId, getUserWithEmail, updateUser, admin: {user} }) => {

    const [userId, setUserId] = useState(!user ? "" : user._id)

    //update user
    const [userInfo, setUserInfo] = useState({
        role: '',
        email: '',
        good: '',
        bad: '',
    })
    const{email, role, good, bad} = userInfo

    const onChange = (e) => setUserInfo({...userInfo, [e.target.name] : e.target.value})

    useEffect(() => {
        const i = !user ? "" : user
        setUserInfo({
            role: i.role,
            good: i.good,
            bad: i.bad,
            email: i.email,
        })
    }, [setUserInfo, user])

    const updateUserInfo = (e, id) => {
        e.preventDefault()
        updateUser(id, userInfo)
    }

    return (
        <Fragment>
        <div className="get-information">
            <button onClick={() => getUserWithId(userId)}>Request With User ID</button>
            <button onClick={() => getUserWithEmail(userId)}>Request With User Email</button>
            <input placeholder="Enter User Email or ID" type="text" value={userId} onChange={(e) => setUserId(e.target.value) } />
        </div>

        {!user ?  <div>Empty</div> : 
        <div className="gotten-user-information">
            <small>Role</small>
            <input type="text" name="role" value={role || ''} onChange={(e) => onChange(e) } />
            <small>Email</small>
            <input type="email" name="email" value={email || ''} onChange={(e) => onChange(e) } maxLength="34" />
            <small>Good Score</small>
            <input type="number" name="good" value={good || ''} onChange={(e) => onChange(e) } />
            <small>Bad Score</small>
            <input type="number" name="bad" value={bad || ''} onChange={(e) => onChange(e) } />

            <button onClick={e => updateUserInfo(e, userId)}>Update User's Information</button>
        </div>
        } 

        </Fragment>
    )
}

const mapStateToProps = state => ({
    admin: state.adminReducers,
})

export default connect(mapStateToProps, {getUserWithId, getUserWithEmail, updateUser})(GetUser)
