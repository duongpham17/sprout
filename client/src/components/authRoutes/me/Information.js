import './Information.scss'
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {updateUserInformation} from '../../../actions/userActions';

const Information = props => {

    const user = props.user

    const [formData, setFormData] = useState({
        shop: '',
        name: '',
        region: '',
    })

    const {region, shop, name} = formData;

    useEffect(() => {
        const data = !user ? "" : user

        setFormData({
            shop: data.shop,
            name: data.name,
            region: data.region
        })
    }, [user, setFormData])

    const onSubmit = (e) => {
        e.preventDefault(e)
        props.updateUserInformation(formData)
    }

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    return (
        <div className='me-info'>
            {!user ? "" :
            <form onSubmit={e => onSubmit(e)}>

                <small>Shop Name:</small>
                <input type="text" placeholder="Shop name" name="shop" value={shop || ""} onChange={e => onChange(e)} maxLength="21" minLength="4" />

                <small>Your Name:</small>
                <input type="text" placeholder="Your Name" name="name" value={name || ""} onChange={e => onChange(e)} />

                <small>Selected Region:</small>
                <select name="region" value={region} onChange={e => onChange(e)} required>
                    <option value="london">* Current region: {user.region}</option>
                    <option value="london">London</option>
                    <option value="south-west">South West</option>
                    <option value="south-east">South East</option>
                    <option value="east-of-england">East of England</option>
                    <option value="west-midlands">West Midlands</option>
                    <option value="east-midlands">East Midlands</option>
                    <option value="north-west">North West</option>
                    <option value="north-east">North East</option>
                    <option value="yorkshire">Yorkshire and the Humber</option>
                </select>  

                <button type="submit">Save Information</button>
            </form>
            }
        </div>
    )
}

export default connect(null, {updateUserInformation})(Information)
