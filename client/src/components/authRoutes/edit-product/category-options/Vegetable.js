import React, { Fragment } from 'react';

const Vegetable = props => {

    return ( 
    <Fragment>
        {props.category === "vegetable" ? 
          <div className={props.classname}>
            <small>Type</small><br/>
            <select name="type" value={props.type} onChange={e => props.onChange(e)}>
              <option value="0">* Pick type - {props.postType} </option>
              <option value="bulb and stem">Bulb & Stem</option>
              <option value="leafy and salad">Leafy & Salad</option>
              <option value="edible flower">Edible Flower </option>
              <option value="podded and seed">Podded & Seed</option>
              <option value="root and tuberous">Root & Tuberous</option>
              <option value="sea">Sea</option>
              <option value="other vegetable">Other</option>
            </select>
          </div>
        : ""}
    </Fragment>
    )
}


export default Vegetable