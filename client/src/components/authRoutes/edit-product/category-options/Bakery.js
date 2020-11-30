import React, { Fragment } from 'react';

const Bakery = props => {

    return ( 
    <Fragment>
      {props.category === "bakery" ? 
        <div className={props.classname}>
          <small>Type</small><br/>
          <select name="type" value={props.type} onChange={e => props.onChange(e)}>
            <option value="0">* Pick type - {props.postType} </option>
            <option value="brownie">Brownie</option>
            <option value="bread">Bread</option>
            <option value="cake">Cake</option>
            <option value="cookie">Cookie</option>
            <option value="cupcake">Cupcake</option>
            <option value="cakepop">Cake-Pop</option>
            <option value="donut">Donut</option>
            <option value="pastry">Pastry</option>
            <option value="pie and tart">Pie & Tarts</option>
            <option value="dessert">Dessert</option>
            <option value="other bakery">Other</option>
          </select>
        </div>
      : ""}
    </Fragment>
    )
}

/*

* props.category  === Based on the category selection from CreateProduct and Edit.

* props.classname === There is two Different className one for CreateProduct and Edit.

* props.postType  === In CreateProduct Selection it is left empty, Edit selection it shows the user selection.

* props.type      === Store the value from the option.

*/


export default Bakery
