import React, { Fragment } from 'react';

const Seasoning = props => {

    return ( 
    <Fragment>
      {props.category === "seasoning" ? 
        <div className={props.classname}>
          <small>Type</small><br/>
          <select name="type" value={props.type} onChange={e => props.onChange(e)}>
            <option value="0">* Pick type - {props.postType} </option>
            <option value="salt and pepper">Salt & Pepper</option>
            <option value="herb">Herbs</option>
            <option value="spices">Spices</option>
            <option value="asian">Asian</option>
            <option value="other seasoning">Others</option>
          </select>
        </div>
      : ""}
    </Fragment>
    )
}


export default Seasoning