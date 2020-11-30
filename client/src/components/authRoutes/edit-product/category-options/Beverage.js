import React, { Fragment } from 'react';

const Beverage = props => {
    return ( 
    <Fragment>
        {props.category === "beverage" ? 
          <div className={props.classname}>
            <small>Type</small><br/>
            <select name="type" value={props.type} onChange={e => props.onChange(e)}>
                <option value="0">* Pick type - {props.postType} </option>
                <option value="tea">Tea</option>
                <option value="coffee">Coffee</option>
                <option value="juice">Juice</option>
                <option value="plant based">Plant-Based</option>
                <option value="wine">Wine</option>
                <option value="bear">Beer</option>
                <option value="other beverage">Others</option>
            </select>
        </div>
        : ""}
    </Fragment>
    )
}

export default Beverage