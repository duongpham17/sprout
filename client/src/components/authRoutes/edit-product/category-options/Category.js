import React from 'react'

const Category = props => {
    return (
        <div className={props.classname}>
        <small>{props.message}</small><br/>
        <select name="category" value={props.category} onChange={e => props.onChange(e)}>
          <option value="0">{props.optionMessage}</option>
          <option value="bakery">Bakery</option>
          <option value="confection">Confection</option>
          <option value="vegetable">Vegetable</option>
          <option value="fruit">Fruit</option>
          <option value="seasoning">Seasoning</option>
          <option value="mushroom">mushroom</option>
          <option value="beverage">Beverage</option>
          <option value="meat">Meat</option>
          <option value="seafood">Seafood</option>
        </select>
      </div>
    )
}

export default Category
