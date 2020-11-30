import './Contact.scss';
import React, {useState, useEffect, Fragment} from 'react';
import {connect} from 'react-redux';
import {RiContactsBook2Line} from 'react-icons/ri';
import {GiShop} from 'react-icons/gi';
import {AiOutlineInfoCircle} from 'react-icons/ai';

import {updateBusinessInformation} from '../../../actions/userActions';

const Contact = ({updateBusinessInformation,  user:{user} }) => {

    //open the contact and address page
    const [open, setOpen] = useState(false)
    const [info, setInfo] = useState(false)
    
    const [formData, setFormData] = useState({
        show: "",
        contactEmail: "",
        phone: "",
        address: "",
        address2: "",
        city: "",
        postcode: "",
    })

    useEffect(() => {
        const contact = !user ? "" : user.business
        setFormData({
            show: contact.show,
            contactEmail: contact.contactEmail,
            phone: contact.phone,
            address: contact.address,
            address2: contact.address2,
            city: contact.city,
            postcode: contact.postcode
        })
    }, [setFormData, user])

    const {show, contactEmail, phone, address, address2, city, postcode} = formData
    
    const onSubmit = (e) => {
        e.preventDefault()
        updateBusinessInformation(formData)
    }

    const clear = (e) => {
        e.preventDefault()
        setFormData({
            show: "no",
            contactEmail: "",
            phone: "",
            address: "",
            address2: "",
            city: "",
            postcode: ""
        })
    }

    const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

    return (
        <Fragment>
            <div className="contacts-information">
                <button className={open ? "open" : ""} onClick={() => setOpen(!open)}><GiShop/> Business Address & <RiContactsBook2Line/> Contacts </button>
            </div>

            {!user ? "" : 
            <Fragment>
                {open === true ? 
                <div className="business-info">
                    <div className="-info">

                        <div className="show-info">
                            <button className="--info" onClick={() => setInfo(!info)}><AiOutlineInfoCircle/> Allow Buyers to see this Information on product page? </button>
                            {info === true ? <p className="show-text">Good for if you're a supplier, own a business that is not your home address and planning to allow products to be collected.</p> : "" }
                            <button className={`yes-no  ${show === "yes" ? "yes" : ""}`} onClick={() => setFormData({...formData, show: "yes"})}> Yes </button>
                            <button className={`yes-no  ${show === "no" ? "no" : ""}`} onClick={() => setFormData({...formData, show: "no"})}> No </button>
                        </div>

                        <form onSubmit={e => onSubmit(e)}>
                            <h2>Businesss Contacts </h2>
                            <small>Contact Email:</small>
                            <input type="text" minLength="8" maxLength="34" placeholder="..." name="contactEmail" value={contactEmail} onChange={e => onChange(e)}  />
                            <small>Phone Number:</small>
                            <input type="text" placeholder="..." name="phone" value={phone || ""} onChange={e => onChange(e)}  />
                            <h2>Business Address </h2>
                            <small>Address:</small>
                            <input type="text" placeholder="..." name="address" value={address || ""} onChange={e => onChange(e)} maxLength="40"  />
                            <small>Address 2: * optional *</small> 
                            <input type="text" placeholder="..." name="address2" value={address2 || ""} onChange={e => onChange(e)} maxLength="40"  />
                            <small>City:</small>
                            <input type="text" placeholder="..." name="city" value={city || ""} onChange={e => onChange(e)} maxLength="30" />
                            <small>Post Code:</small>
                            <input type="text" placeholder="..." name="postcode" value={postcode || ""} onChange={e => onChange(e)} maxLength="15"  />

                            <button type="submit">Update</button>
                            <button onClick={e => clear(e)}>Clear</button>
                        </form> 
                    </div>
                </div>
                
                : "" }

            </Fragment>
            }
        </Fragment>
    )
}

const mapStateToProps = state => ({
    user: state.userReducers 
})

export default connect(mapStateToProps, {updateBusinessInformation})(Contact)
