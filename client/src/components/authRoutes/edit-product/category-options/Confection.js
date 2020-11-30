import React, { Fragment } from 'react';

const Beverage = props => {
    return ( 
    <Fragment>
        {props.category === "confection" ? 
          <div className={props.classname}>
            <small>Type</small><br/>
            <select name="type" value={props.type} onChange={e => props.onChange(e)}>
                <option value="0">* Pick type - {props.postType} </option>
                <option value="fudge">Fudge</option>
                <option value="chocolate">Chocolate</option>
                <option value="gummies">Gummies</option>
                <option value="hard candies">Hard Candies</option>
                <option value="licorice">Licorice</option>
                <option value="sour">Sour</option>
                <option value="chewing gum">Chewing Gum</option>
                <option value="other confection">Others</option>
            </select>
        </div>
        : ""}
    </Fragment>
    )
}

export default Beverage