import React, { Fragment } from 'react';

const Fish = props => {

    return ( 
    <Fragment>
        {props.category === "seafood" ? 
            <div className={props.classname}>
              <small>Type</small><br/>
              <select name="type" value={props.type} onChange={e => props.onChange(e)}>
                <option value="0">* Pick type - {props.postType} </option>
                <option value="fish">Fish</option>
                <option value="crustaceans">Crustaceans</option>
                <option value="shellfish">Shellfish</option>
                <option value="roe">Roe</option>
                <option value="other seafood">Other</option>
              </select>
            </div>
        : ""}
    </Fragment>
    )
}

export default Fish
