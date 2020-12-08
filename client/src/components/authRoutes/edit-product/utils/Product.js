import './Product.scss';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {updateProduct} from '../../../../actions/productActions';

import Bakery from '../category-options/Bakery';
import Confection from '../category-options/Confection';
import Vegetable from '../category-options/Vegetable';
import Fruit from '../category-options/Fruit';
import Seasoning from '../category-options/Seasoning';
import Mushroom from '../category-options/Mushroom';
import Beverage from '../category-options/Beverage';
import Seafood from '../category-options/Seafood';
import Meat from '../category-options/Meat';
import Category from '../category-options/Category';

const Product = props => {

    const edit = props.edit

    const [formData, setFormData] = useState({
        price: '', quantity: '', description_title: '',  descriptionOne: '', region: '', category: '', 
        type: '', minimumQuantity: '', supplier: "", return_policy: '',
    })

    useEffect(() => {
        const prod = !edit ? "" : edit
        setFormData({
            supplier: prod.supplier,
            price: prod.price,
            quantity: prod.quantity,
            description_title: prod.description_title,
            descriptionOne: prod.descriptionOne,
            region: prod.region,
            category: prod.category,
            type: prod.type,
            minimumQuantity: prod.minimumQuantity,
            est_delivery: prod.est_delivery,
            cost_delivery: prod.cost_delivery,
            return_policy: prod.return_policy
        })
    }, [setFormData, edit])

    const {supplier, price, quantity, description_title, descriptionOne, region, category, type, minimumQuantity, return_policy} = formData

    const onSubmit = e => {
        e.preventDefault()
        props.updateProduct(props.match, formData)
    }

    const onChange = e => setFormData({...formData, [e.target.name] : e.target.value})


    return (
        <div className="edit-product-information">

        <form onSubmit={e => onSubmit(e)}> 
        <div>
           <small>Want to show as a supplier? E.g bulk buying and supplying businesses.</small><br/>
              <select name="supplier" value={supplier} onChange={e => onChange(e)}>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
          </div>

          <div>
           <small>Region *Important*. Used for Searching.</small><br/>
              <select name="region" value={region} onChange={e => onChange(e)}>
                <option value="london">London</option>
                <option value="south-west">South West</option>
                <option value="south-east">South East</option>
                <option value="east-of-england">East of England</option>
                <option value="west-midlands">West Midlands</option>
                <option value="east-midlands">East Midlands</option>
                <option value="north-west">North West</option>
                <option value="north-east">North East</option>
                <option value="yorkshire">Yorkshire and the Humber</option>
              </select>
          </div>

          <div>
          <small>Price of Product</small><br/>
            <input
              type="number"
              placeholder="£"
              name="price"
              value={price}
              onChange={e => onChange(e)}
              max="9999999"
            />
          </div>

          <div>
          <small>Stock quantity OR Amount of supply</small><br/>
            <input
              type="number"
              placeholder={edit.quantity}
              name="quantity"
              value={quantity}
              onChange={e => onChange(e)}
              max="9999999"
            />
          </div>

          <div>
          <small>Minimum Quantity allowed to purchase </small><br/>
            <input
              type="number"
              placeholder={edit.minimumQuantity}
              name="minimumQuantity"
              value={minimumQuantity}
              onChange={e => onChange(e)}
            />
          </div>

         {/* BASED ON SELECTION E.G if cake then show cake types */}
          <Category onChange={onChange} category={category} classname={"select-box-input"} message={"Category. Pick... Type will then appear."} optionMessage={`* Current Category or Type? ${edit.category}`} />

          <Bakery     category={category} postType={edit.type} classname={"select-box-input"} type={type} onChange={onChange} />
          <Confection category={category} postType={edit.type} classname={"select-box-input"} type={type} onChange={onChange} />
          <Vegetable  category={category} postType={edit.type} classname={"select-box-input"} type={type} onChange={onChange} />
          <Fruit      category={category} postType={edit.type} classname={"select-box-input"} type={type} onChange={onChange} />
          <Seasoning  category={category} postType={edit.type} classname={"select-box-input"} type={type} onChange={onChange} />
          <Mushroom   category={category} postType={edit.type} classname={"select-box-input"} type={type} onChange={onChange} />
          <Beverage   category={category} postType={edit.type} classname={"select-box-input"} type={type} onChange={onChange} />
          <Meat       category={category} postType={edit.type} classname={"select-box-input"} type={type} onChange={onChange} />
          <Seafood    category={category} postType={edit.type} classname={"select-box-input"} type={type} onChange={onChange} />

        {/* BASED ON SELECTION E.G if cake then show cake types */}
          
          <div>
          <small>Product Title - *Important* For Searching. So make sure to make it descriptive. Do not use $ % & / or any special characters.</small><br/>
            <input
              type="text"
              placeholder="Product Title"
              name="description_title"
              value={description_title}
              onChange={e => onChange(e)}
              maxLength="80"
            />
          </div>
          
          <div>
          <small>Main Description * Maximum 300 characters *  </small><br/>
              <textarea
                type="text"
                placeholder="Other description of the product. To leave this empty put in... none"
                name="descriptionOne"
                value={descriptionOne}
                onChange={e => onChange(e)}
                maxLength="300"
              />
          </div>

          <div>
          <small> Return Policy * Maximum 500 characters *  </small><br/>
              <textarea
                type="text"
                placeholder="Your Return Policy"
                name="return_policy"
                value={return_policy}
                onChange={e => onChange(e)}
                maxLength="500"
              />
          </div>

          <button type="submit">Save</button>
      </form>
      </div>
    )
}

export default connect(null, {updateProduct})(Product)
