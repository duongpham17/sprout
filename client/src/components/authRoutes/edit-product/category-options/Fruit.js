import React, { Fragment } from 'react';

const Vegetable = props => {

    return ( 
    <Fragment>
        {props.category === "fruit" ? 
          <div className={props.classname}>
            <small>Type</small><br/>
            <select name="type" value={props.type} onChange={e => props.onChange(e)}>
              <option value="0">* Pick type - {props.postType} </option>
              <option value="berries">Berries</option>
              <option value="citrus">Citrus</option>
              <option value="drupe">Drupe</option>
              <option value="melon">Melon</option>
              <option value="pomes">Pomes</option>
              <option value="tropical">Tropical</option>
              <option value="other fruit">Other</option>
            </select>
        </div>
        : ""}
    </Fragment>
    )
}


export default Vegetable