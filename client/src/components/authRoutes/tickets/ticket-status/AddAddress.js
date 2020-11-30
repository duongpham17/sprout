import './AddAddress.scss';
import React, { Fragment, useState } from 'react';
import {FaHome} from 'react-icons/fa';
import {connect} from 'react-redux';
import {addBuyerAddress, deleteBuyerAddress} from '../../../../actions/userActions';
import {TiDelete} from 'react-icons/ti';
import {AiFillHome} from 'react-icons/ai';

const AddAddress = ({user: {user}, addBuyerAddress, deleteBuyerAddress}) => {

    const [add, setAdd] = useState(false)
    const [deleteTime, setDeleteTime] = useState(false)

    const [formData, setFormData] = useState({
        title: "",
        address: "",
        address2: "",
        city: "",
        postcode: "",
    })
    const {title, address, address2, city, postcode} = formData

    const onSubmit = (e) => {
        e.preventDefault()

        addBuyerAddress(formData)

        setFormData({
            title: "",
            address: "",
            address2: "",
            city: "",
            postcode: "",
        })
    }
    
    const onChange = (e) => setFormData({...formData, [e.target.name] : e.target.value})

    //only let user delete address every 1 second
    const deleteAddressSeconds = (e, _id) => {
        e.preventDefault()
        deleteBuyerAddress(_id)
        setDeleteTime(true)
        setTimeout(function(){
            setDeleteTime(false)
        },800 )
    }
    
    return (
        <Fragment>
            {!user ? "" :

            <div className="buyers-address">
                <button onClick={() => setAdd(!add)}><FaHome/> {add === true ? "Close Address" : "Add Address"}</button>

                {add === true ? 
                    <Fragment>
                        <div className="address-container">
                            <div className="add-address">
                                <form onSubmit={e => onSubmit(e)}>
                                <small>Nickname:</small>
                                <input type="text" placeholder="..." name="title" value={title} onChange={e => onChange(e)} maxLength="9" minLength="3" required />
                                <small>Address:</small>
                                <input type="text" placeholder="..." name="address" value={address} onChange={e => onChange(e)} maxLength="40" minLength="3" required />
                                <small>Address2: *optional*</small>
                                <input type="text" placeholder="..." name="address2" value={address2} onChange={e => onChange(e)} maxLength="40" minLength="3" />
                                <small>City:</small>
                                <input type="text" placeholder="..." name="city" value={city} onChange={e => onChange(e)} maxLength="25" minLength="3" required/>
                                <small>Postcode: </small>
                                <input type="text" placeholder="..." name="postcode" value={postcode} onChange={e => onChange(e)} maxLength="15" minLength="3" required />
                                <button type="submit"><AiFillHome/> Add</button>
                                </form>
                            </div>

                            <div className="saved-address">
                                {user.addresses.map((el, index) => 
                                <div className="card" key={index}>
                                    <div className="info">
                                        <h3>{el.title}</h3>
                                        <p>Address:</p>
                                        <li>{el.address}</li>
                                        <p>Address2: *optional*</p>
                                        <li>{el.address2}</li>
                                        <p>City:</p>
                                        <li>{el.city}</li>
                                        <p>Postcode: </p>
                                        <li>{el.postcode}</li>
                                    </div>
                                    <div className="delete">
                                        <button onClick={(e) => deleteAddressSeconds(e, el._id)}>{deleteTime === false ? <TiDelete/> : ""}</button>
                                    </div>
                                </div>
                                )}
                            </div>


                        </div>
                    </Fragment>
                : "" }
            </div>
            }
        </Fragment>
    )
}

const mapStateToProps = state => ({
    user: state.userReducers
})

export default connect(mapStateToProps, {addBuyerAddress, deleteBuyerAddress})(AddAddress)
