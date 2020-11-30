import './Description.scss';
import React, { Fragment, useState, useEffect } from 'react';
import {updateProductDescription} from '../../../../actions/productActions';
import {connect} from 'react-redux';

const Description = props => {

    const edit = props.edit

    const [formData, setFormData] = useState({
      title_1: "",
      des_1:  "",
      title_2: "",
      des_2: "",
      title_3: "",
      des_3: "",
    })

    const {title_1, title_2, title_3, des_1, des_2, des_3} = formData

    useEffect(() => {
      const el = !edit ? "" : edit.description
      setFormData({
        title_1: el.description_one.title,
        des_1: el.description_one.des,
        title_2: el.description_two.title,
        des_2: el.description_two.des,
        title_3: el.description_three.title,
        des_3: el.description_three.des
      })
    }, [edit, setFormData])

    const onSubmit = (e) => {
        e.preventDefault()
        props.updateProductDescription(props.match, formData)
    }

    const onChange = (e) => setFormData({...formData, [e.target.name] : e.target.value})
    
    return (
      <Fragment>
        <div className="edit-product-information">
          <form onSubmit={e => onSubmit(e)}>

            <div>
              <small>First. Title Description. * Maximum 100 characters for any title * </small><br/>
              <input
                type="text"
                placeholder="First - Title Description"
                name="title_1"
                value={title_1}
                onChange={e => onChange(e)}
                maxLength="100"
              />
            </div>

            <div>
              <small>Description. If you want to start on a new line use / . E.g Hello / Hello again from new Line. * Maximum 800 characters *</small><br/>
              <textarea
              type="text"
              placeholder="* Maximum 800 characters *"
              name="des_1"
              value={des_1}
              onChange={e => onChange(e)}
              maxLength="800"
              />
           </div>

           <div>
              <small>Second. Title Description </small><br/>
              <input
                type="text"
                placeholder="Second - Title Description"
                name="title_2"
                value={title_2}
                onChange={e => onChange(e)}
                maxLength="100"
              />
            </div>

            <div>
              <small>Description * Maximum 800 characters *</small><br/>
              <textarea
              type="text"
              placeholder="* Maximum 800 characters *"
              name="des_2"
              value={des_2}
              onChange={e => onChange(e)}
              maxLength="800"
              />
          </div>

          <div>
              <small>Third. Title Description </small><br/>
              <input
                type="text"
                placeholder="Third - Title Description"
                name="title_3"
                value={title_3}
                onChange={e => onChange(e)}
                maxLength="100"
              />
          </div>

            <div>
              <small>Description. If you want to start on a new line use / * Maximum 2000 characters * </small><br/>
              <textarea
              type="text"
              placeholder="description"
              name="des_3"
              value={des_3}
              onChange={e => onChange(e)}
              maxLength="2000"
              />
            </div>
              
            <button>Save</button>
          </form>
        </div>
      </Fragment>
    )
}

export default connect(null, {updateProductDescription})(Description)
