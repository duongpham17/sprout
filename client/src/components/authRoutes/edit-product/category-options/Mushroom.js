import React, { Fragment } from 'react';

const Mushroom = props => {

    return ( 
    <Fragment>
        {props.category === "mushroom" ? 
          <div className={props.classname}>
            <small>Type</small><br/>
            <select name="type" value={props.type} onChange={e => props.onChange(e)}>
              <option value="0">* Pick type - {props.postType} </option>
              <option value="oyster">Oyster</option>
              <option value="portobello">Portobello </option>
              <option value="cremini">Cremini</option>
              <option value="procini">Porcini</option>
              <option value="chanterelle">Chanterelle</option>
              <option value="maitake">Maitake</option>
              <option value="button">Button</option>
              <option value="lobster">Lobster</option>
              <option value="shiitake">Shiitake</option>
              <option value="clamshell">Clamshell</option>
              <option value="morel">Morel</option>
              <option value="enoki">Enoki</option>
              <option value="other mushroom">Others</option>
            </select>
          </div>
        : ""}
    </Fragment>
    )
}

export default Mushroom