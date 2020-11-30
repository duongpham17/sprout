import React, { Fragment } from 'react';

const Meat = props => {

    return ( 
    <Fragment>
        {props.category === "meat" ? 
            <div className={props.classname}>
                <small>Type</small><br/>
                <select name="type" value={props.type} onChange={e => props.onChange(e)}>
                <option value="0">* Pick type - {props.postType} </option>
                <option value="beef">Beef</option>
                <option value="poultry">Poultry</option>
                <option value="pork">Pork</option>
                <option value="lamb">Lamb</option>
                <option value="other meat">Others</option>
                </select>
            </div>
        : ""}
    </Fragment>
    )
}

export default Meat
