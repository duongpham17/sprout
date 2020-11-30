import './Edit.scss';
import React, { Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import moment from 'moment';

import {getOneEditProduct, deleteProduct, relistProduct, uploadImage, deleteImage} from '../../../actions/productActions';
import {setAlert} from '../../../actions/alertActions';

import {AiOutlineInfoCircle} from 'react-icons/ai';
import {BsCardText} from 'react-icons/bs';
import {FiPackage, FiRefreshCw} from 'react-icons/fi';
import {GiTreeBranch} from 'react-icons/gi';
import {MdDelete} from 'react-icons/md';
import {IoIosImages} from 'react-icons/io';
import {GoLocation} from 'react-icons/go';

import UploadImages from './utils/UploadImages';
import Product from './utils/Product';
import Allergens from './utils/Allergens';
import Description from './utils/Description';
import Delivery from './utils/Delivery';

const Edit = ({product:{edit, done}, relistProduct, uploadImage, deleteImage, setAlert, deleteProduct, getOneEditProduct, match} ) => {

  const [dropDown, setDropDown] = useState("")

  useEffect(() => {
    //first on each re render grab the one product api data
    getOneEditProduct(match.params.id)
  }, [getOneEditProduct, match])

  //delete product
  const delProduct = () => {
    deleteProduct(match.params.id)
  }

  if(done === true){
    return <Redirect to="/myproduct"/>
  }

  return (
    <Fragment>
      {!edit ? <div className="no_content">Loading... Refresh if it takes too long.</div> : 
      
      <Fragment>
        <div className="edit_back_buttons">
            <li><Link to='/myproduct'>&#171; Back: To Listing</Link></li>
            <li><Link to={`/product/${edit._id}`}><GoLocation/> Go To Product</Link></li>
        </div>
        
        <div className="edit-product-information-container">

            <div className="edit-btn">
              <button className={dropDown === "product" ? "selected" : ""} onClick={() => setDropDown(dropDown === "product" ? "0" : "product")}><AiOutlineInfoCircle /> Product Information </button>
              <button className={dropDown === "description" ? "selected" : ""} onClick={() => setDropDown(dropDown === "description" ? "0" : "description")}><BsCardText /> Description </button>
              <button className={dropDown === "gallery" ? "selected" : ""} onClick={() => setDropDown(dropDown === "gallery" ? "0" : "gallery")}><IoIosImages /> Gallery </button>
              <button className={dropDown === "delivery" ? "selected" : ""} onClick={() => setDropDown(dropDown === "delivery" ? "0" : "delivery")}><FiPackage /> Delivery </button>
              <button className={dropDown === "allergen" ? "selected" : ""} onClick={() => setDropDown(dropDown === "allergen" ? "0" : "allergen")}><GiTreeBranch /> Allergen </button>
              <button className={Date.now() < (parseInt(Date.parse(edit.relistDate))) ? "" : "ready"} onClick={() => setDropDown(dropDown === "relist" ? "0" : "relist")}><FiRefreshCw/> Relist: {Date.now() < (parseInt(Date.parse(edit.relistDate))) ? "Ready" : "Not-Ready"} </button>
              <button className={dropDown === "delete" ? "selected" : ""} onClick={() => setDropDown(dropDown === "delete" ? "0" : "delete")}><MdDelete /> Delete Product </button>
            </div>

            {dropDown === "product" ?
            <Product edit={edit} match={match.params.id} />
            : "" }

            {dropDown === "description" ?
            <Description edit={edit} match={match.params.id} />
            : "" }

            {dropDown === "delivery" ?
            <Delivery edit={edit} match={match.params.id} />
            : "" }

            {dropDown === "allergen" ?
            <Allergens edit={edit} match={match.params.id} />
            : "" }

            {dropDown === "gallery" ?
            <UploadImages edit={edit} galleryImages={"true"} uploadImage={uploadImage} deleteImage={deleteImage} setAlert={setAlert} match={match.params.id} />
            : "" }

            {dropDown === "relist" ?
            <div className="relist-product">
                  <h2>Relist date available on: {moment(edit.relistDate).format("lll").split(" ").slice(0, 5).join(" ")}</h2>
                  {Date.now() < (parseInt(Date.parse(edit.relistDate))) ? "" : <button className={Date.now() < (parseInt(Date.parse(edit.relistDate))) ? "hidden" : ""} onClick={() => relistProduct(edit._id, edit.relistDate, edit.createdAt)}>Make It Fresh!</button>}
            </div>
            : "" }

            {dropDown === "delete" ?
            <div className="deleteProduct">
              <h2>If there is NO images product will be instantly deleted.</h2>
              <button onClick={delProduct}>Delete Product</button>
            </div>
            : "" }
                    
        </div>
        </Fragment>
    }
  </Fragment>
  )
}

Edit.propTypes = {
    product: PropTypes.object.isRequired,
    getOneEditProduct: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    deleteProduct: PropTypes.func.isRequired,
    relistProduct: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    deleteImage: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    product: state.productReducers
})

export default connect(mapStateToProps, {deleteImage, uploadImage, relistProduct, setAlert, deleteProduct, getOneEditProduct})(Edit)
