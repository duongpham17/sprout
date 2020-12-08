import './CreateProduct.scss';
import React, {Fragment, useState} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import {createProduct} from '../../../actions/productActions';

import Bakery from './category-options/Bakery';
import Confection from './category-options/Confection';
import Vegetable from './category-options/Vegetable';
import Fruit from './category-options/Fruit';
import Seasoning from './category-options/Seasoning';
import Mushroom from './category-options/Mushroom';
import Beverage from './category-options/Beverage';
import Meat from './category-options/Meat';
import Seafood from './category-options/Seafood';
import Category from './category-options/Category';

const CreateProduct = ({createProduct, product:{done}, user:{user}}) => {

const [formData, setFormData] = useState({
    price: '',
    quantity: '',
    description_title: '',
    category:'',
    type: '',
    region: '',
});

const {
  price, quantity, description_title, category, type, region,
} = formData

const onSubmit = (e) => {
  e.preventDefault()
  createProduct(formData)
}

const onChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value.toLowerCase()});
}

if(done){
  return <Redirect to='/my product' />
}
    return (
      <Fragment>
        {!user ?  <div className="Loading">Loading...</div> : 
        <Fragment>
        
        {/* Details that must be filled in before creating a product */}
        {user.shop && user.business.address.length >= 4 && user.business.city.length >= 5 && user.business.postcode.length >= 5 ? "" :
        <div className="no_content3"> 
        {!user.shop ? <p><Link to="/me">In order to create a product, please make a shop name by clicking here</Link></p> : ""}
        {user.business.address.length >= 4 && user.business.city.length >= 5 && user.business.postcode.length >= 5 ? "" : <p><Link to="/my product">In order to create a product, please provide an address by clicking here</Link></p> }
        </div>
        }

        {user.shop && user.business.address.length >= 4 && user.business.city.length >= 5 && user.business.postcode.length >= 5 ?
        <section className="create_container">
        <div>
            <h4>Create Product. This will be displayed on the home screen.</h4>
            <form className="create-form-left" onSubmit={e => onSubmit(e)}>
                  <div className="create-form-input">
                    <input
                      type="number"
                      placeholder="Price Per Item"
                      name="price"
                      value={price}
                      onChange={e => onChange(e)}
                      max="9999999"
                      required
                    />
                  </div>
                  <div className="create-form-input">
                    <input
                      type="number"
                      placeholder="Stock quantity"
                      name="quantity"
                      value={quantity}
                      onChange={e => onChange(e)}
                      max="9999999"
                      required
                    />
                  </div>

              {/* BASED ON SELECTION E.G if cake then show cake types */}
              <Category onChange={onChange} category={category} classname={"select-box"} message={"Category"} optionMessage={`* Please select a category`} />

              <Bakery     category={category}  classname={"select-box"} type={type} onChange={onChange} />
              <Confection category={category}  classname={"select-box"} type={type} onChange={onChange} />
              <Vegetable  category={category}  classname={"select-box"} type={type} onChange={onChange} />
              <Fruit      category={category}  classname={"select-box"} type={type} onChange={onChange} />
              <Seasoning  category={category}  classname={"select-box"} type={type} onChange={onChange} />
              <Mushroom   category={category}  classname={"select-box"} type={type} onChange={onChange} />
              <Beverage   category={category}  classname={"select-box"} type={type} onChange={onChange} />
              <Seafood    category={category}  classname={"select-box"} type={type} onChange={onChange} />
              <Meat       category={category}  classname={"select-box"} type={type} onChange={onChange} />

              {/* BASED ON SELECTION E.G if cake then show cake types */}

                {/************************End of option area*************************/}

                  <div className="create-form-input">
                    <input
                      type="text"
                      placeholder="Title or Product Name"
                      name="description_title"
                      value={description_title}
                      onChange={e => onChange(e)}
                      maxLength="80"
                      minLength="5"
                      required
                    />
                  </div>

                  <div className="select-box">
                  <select name="region" value={region} onChange={e => onChange(e)}>
                    <option value="london">* Please Select a Region. Default London</option>
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

                <button>Create Product!</button>
              </form>
          </div>
          </section>
          : "" }
          
        </Fragment>
      }
      </Fragment>
    )
}

const mapStateToProps = state => ({
  product: state.productReducers,
  user: state.userReducers,
})

export default connect(mapStateToProps, {createProduct})(CreateProduct)
