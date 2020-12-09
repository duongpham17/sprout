import './Delivery.scss';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {updateDeliveryDetails} from '../../../../actions/productActions';

const Delivery = props => {

    const edit = props.edit

    const [formData, setFormData] = useState({
        cost_delivery: "",
        est_delivery: "",
        collect: "",
        delivery: ""
    })

    const {cost_delivery, est_delivery, collect, delivery} = formData

    useEffect(() => {
      const prod = !edit ? "" : edit

      setFormData({
        cost_delivery: prod.cost_delivery,
        est_delivery: prod.est_delivery,
        collect: prod.collect,
        delivery: prod.delivery
      })

    }, [setFormData, edit])
    
    const updateDeliveryData =(e) => {
      e.preventDefault()
      props.updateDeliveryDetails(props.match, formData)
    }

    const onChange = e => setFormData({...formData, [e.target.name] : e.target.value})
      
    return (
        <div className="delivery-container"> 
          <form onSubmit={e => updateDeliveryData(e)}>
            <div className="delivery-preferences">
              <small>Select your delivery preferences.</small><br/>
              {delivery === "yes" 
              ? <button type="button" className={delivery === "yes" ? 'selected' : ""} onClick={() => setFormData({...formData, delivery: "no"})}>Delivery</button> 
              : <button type="button" onClick={() => setFormData({...formData, delivery: "yes"})}>Delivery</button> 
              }
              {collect === "yes" 
              ? <button type="button" className={collect === "yes" ? 'selected' : ""} onClick={() => setFormData({...formData, collect: "no"})}>Collect</button> 
              : <button type="button" onClick={() => setFormData({...formData, collect: "yes"})}>Collect</button> 
              }
            </div>

            <div>
              <small>Cost of delivery per order. Put 0 for free delivery </small><br/>
              <input type="number" placeholder="Delivery cost" name="cost_delivery" value={cost_delivery} onChange={e => onChange(e)} required />
            </div>

            <div>
              <small>Estimated days for delivery </small><br/>
              <input type="text" placeholder="Estimated days for Delivery" name="est_delivery" value={est_delivery} onChange={e => onChange(e)} required /> 
            </div>

            {est_delivery ?
            <button type="submit">Save</button>
            : ""}
        </form>
      </div>
    )
}

export default connect(null, {updateDeliveryDetails})(Delivery)
