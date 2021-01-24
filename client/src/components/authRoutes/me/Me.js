import './Me.scss'
import React, { Fragment, useState } from 'react';
import {connect} from 'react-redux';

import Password from './Password';
import Email from './Email';
import Information from './Information';
import Avatar from './Avatar';

const Me = ({ user:{user, loading} }) => {

    const [open, setOpen] = useState("none")

    return (
        <div className="me-container">
        {!user || loading ? <div className="loading" /> : 
        <Fragment>

        {/* AVATAR & SCORE */}
        <Avatar user={user} open={open} setOpen={setOpen} />

        {/* ME INFORMATION */}
        <Information user={user} open={open} setOpen={setOpen} />

        {/* CHANGE LOGIN EMAIL */}
        <Email user={user} open={open} setOpen={setOpen} />

        {/* CHANGE PASSWORD */}
        <Password user={user} open={open} setOpen={setOpen} />

        </Fragment>
        }
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.userReducers
})

export default connect(mapStateToProps, {})(Me)
