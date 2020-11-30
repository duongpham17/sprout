import './ContactsAndBusiness.scss';
import React, { Fragment } from 'react';
import {MdContentCopy} from 'react-icons/md';

const ContactsAndBusiness = props => {
    //click to copy information
    const copy = (data) => {
        navigator.clipboard.writeText(data)
        props.setAlert("Copied!", 'primary')
    }
    
    return (
        <Fragment>
        <div className="contact-content">

            <div className="-address">
                <h2>Business Address: </h2>
                <li>Address: <span>{props.post.user.business.address}</span></li>
                {!props.post.user.business.address2 ? "" :
                <li>Address2: <span>{props.post.user.business.address2}</span></li>
                }
                <li>City: <span>{props.post.user.business.city}</span></li>
                <li>Postcode: <span>{props.post.user.business.postcode}</span></li>
            </div>

            <div className="-contact">
                <h2>Contacts: </h2>
                {!props.post.user.business.contactEmail ? "" : 
                <li>Email: <br/> <button onClick={() => copy(props.post.user.business.contactEmail)}><MdContentCopy/> {props.post.user.business.contactEmail}</button></li>
                }
                {!props.post.user.business.phone ? "" :
                <li>Phone: <br/> <button onClick={() => copy(props.post.user.business.phone)}><MdContentCopy/> {props.post.user.business.phone}</button></li>
                }
            </div>

        </div>
        </Fragment>
    )
}

export default ContactsAndBusiness
