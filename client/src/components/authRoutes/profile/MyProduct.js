import './MyProduct.scss'
import React, { Fragment, useEffect, useState } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import moment from 'moment';
import defaultImage from '../../img/default.jpg';
import {getMyPost, relistMyProduct} from '../../../actions/productActions';

import Pagination from '../../template/Pagination';
import Social from './Social';
import Payment from './Payment';
import Contact from './Contact';

const MyPost = ({relistMyProduct, getMyPost, product:{mypost, length, loading}}) => {

    //Total view counts
    const [viewCount, setViewCount] = useState({
        view: ""
    })
    const {view} = viewCount

    useEffect(() => {
        setViewCount({
            view: !mypost ? "" : mypost.map(el => el.view)
        })
    }, [mypost])

    return (
        <Fragment>
        
        <Payment />

        <Contact />

        <Social />

        {mypost.length === 0 ? 
        <Fragment>
            {loading ? "Loading..." : 
            <div className="no_content">
                <h3>No Product Found... <Link to='/create'>Create One?</Link></h3><br/>
                <h3><Link to='/my product'>Back to My Product page?</Link></h3>
            </div> 
            }
        </Fragment>
        : 
        <Fragment>
            <div className="myproduct-length">
                <h3>My Total Listed Products: {length}</h3>
                <h3>Total Views Per page: {view.length === 0 ? "" : view.reduce((a, b) => a + b)}</h3>
            </div>

            <div className="myproduct-container">
            {mypost.map((el, index) => 
                <div className="myproduct-container-map" key={index}>
                    <div className="fresh-btn"> 
                    {Date.now() < (parseInt(Date.parse(el.relistDate))) ? "" : <button className={Date.now() < (parseInt(Date.parse(el.relistDate))) ? "hidden" : ""} onClick={() => relistMyProduct(el._id, el.relistDate, el.createdAt)}>Make It Fresh!</button>}
                    </div>

                    <div className="myproduct-image">
                       <Link to={`/product/${el._id}`}><img className="myproduct-image" src={el.image.length === 0 ? defaultImage : el.image[0].url} alt="Bad URL" /></Link>
                    </div>

                    {el.supplier === "yes" ?
                        <div className="information-supplier"> 
                            Supplier
                        </div>
                    : "" }

                        <div className="information-stats">
                            <li><p className={localStorage.getItem('sorting') === "new" || localStorage.getItem('sorting') === "old" ? "selected-sort" : ""} >{moment(el.createdAt).format("lll").split(" ").slice(0, 3).join(" ")}</p></li>
                            <li><p className={localStorage.getItem('sorting') === "high-view" ? "selected-sort" : ""} ><span> Views: </span> {el.view > 10000 ? `${Math.round(el.view * 0.001)}K`: el.view }</p></li><br/>
                            <li><p className={localStorage.getItem('sorting') === "high-price" || localStorage.getItem('sorting') === "low-price" ? "selected-sort" : "" } > £: {el.price}</p></li>
                            <li><p className={localStorage.getItem('sorting') === "high-quantity" || localStorage.getItem('sorting') === "low-quantity" ? "selected-sort" : "" } > <span> Quantity: </span> {!el.quantity ? "0" : el.quantity }</p></li> <br/>
                            <li><p className={localStorage.getItem('sorting') === "high-rating" || localStorage.getItem('sorting') === "low-rating" ? "selected-sort" : "" } > <span>Rating: </span> {el.ratingsAverage}</p></li>
                            <li><p className={localStorage.getItem('sorting') === "high-num-review" || localStorage.getItem('sorting') === "low-num-review" ? "selected-sort" : ""} > <span>Reviews: </span> {el.ratingsQuantity}</p></li>
                        </div>
                        
                        <div className='information-query'>
                            <p><span> Category: </span> {el.category}</p>
                            <p><span> Type: </span> {el.type}</p>
                            <p><span>Location:</span> {el.region}</p>
                        </div>

                        <div className='information-title'>
                            {el.description_title.split(" ").length >= 8 ? <p>{el.description_title.split(" ").slice(0, 8).join(" ")}...</p> : <p>{el.description_title}</p>} 
                        </div>
                        
                    <div className="edit" >
                        <button><Link to={`/edit/${el._id}`} className="Edit">Edit</Link></button>
                    </div>
                </div>
            )}
        </div>

        </Fragment>
        }

        <Pagination posts={mypost} getDataRequest={getMyPost} limit={20}
        classname={"for-myproduct-top"} sort={"true"} sortclassname={'for-myproduct-sort'} editsort={"editsort"}
        />

        </Fragment>
    )
}

const mapStateToProps = state => ({
    product: state.productReducers,
    user: state.userReducers
})
export default connect(mapStateToProps, {relistMyProduct, getMyPost})(MyPost)
