import './UserProducts.scss';
import React, {Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {GiShop} from 'react-icons/gi';
import {GoCalendar} from 'react-icons/go';
import {FaCrown, FaHome} from 'react-icons/fa';
import {HiSortAscending, HiSortDescending} from 'react-icons/hi';
import {TiArrowRightThick, TiArrowLeftThick} from 'react-icons/ti';
import {RiListSettingsLine} from 'react-icons/ri';

import {getUserProducts} from '../../../actions/productActions';
import ProductLayout from '../../template/ProductLayout';

const UserProducts = ({ getUserProducts, product:{userpost, length, loading}, match, location, history}) => {

    const limit = 20
    const [click, setClick] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)
    const [filtering, setFiltering] = useState(!localStorage.getItem('sorting') ? "normal" : localStorage.getItem('sorting') )

    //To create query param
    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const pages = parseInt(params.get('page'))
        setPageNumber(pages ? pages : pageNumber)

        if(filtering === "normal"){
            getUserProducts(match.params.id, pageNumber, "-createdAt", limit)
        } else if (filtering === "high-price") {
            getUserProducts(match.params.id, pageNumber,  "-price", limit)
        } else if (filtering === "low-price") {
            getUserProducts(match.params.id, pageNumber, "price", limit)
        } else if (filtering === "new"){
            getUserProducts(match.params.id, pageNumber, "-createdAt", limit)
        } else if (filtering === "old"){
            getUserProducts(match.params.id, pageNumber, "createdAt", limit)
        } else if (filtering === "high-view"){
            getUserProducts(match.params.id, pageNumber, "-view", limit)
        } else if (filtering === "high-rating"){
            getUserProducts(match.params.id, pageNumber, "-ratingsAverage", limit)
        } else if (filtering === "low-rating"){
            getUserProducts(match.params.id, pageNumber, "ratingsAverage", limit)
        } else if (filtering === "high-num-review"){
            getUserProducts(match.params.id, pageNumber, "-ratingsQuantity", limit)
        } else if (filtering === "low-num-review"){
            getUserProducts(match.params.id, pageNumber, "ratingsQuantity", limit)
        } else if (filtering === "low-quantity"){
            getUserProducts(match.params.id, pageNumber, "quantity", limit)
        } else if (filtering === "high-quantity"){
            getUserProducts(match.params.id, pageNumber, "-quantity", limit)
        }

    }, [pageNumber, location, filtering, getUserProducts, limit, match])

    const increment = (num) => {
        setPageNumber(pageNumber + num)
        history.push(`?page=${(pageNumber + num)}&sort=${filtering}`)
        window.scrollTo({top: 120, "behavior": "smooth"})
    }
    
    const decrement = (num) => {
        if(pageNumber > 1){
        setPageNumber(pageNumber - num)
        history.push(`?page=${(pageNumber - num)}&sort=${filtering}`)
        } else {
        return 1
        }
        window.scrollTo({top: 50, "behavior": "smooth"})
    }

    const sorting = (sort) => {
        setFiltering(sort)
        localStorage.setItem('sorting', sort)
        setClick(false)
    }
    
    return (
        <Fragment>
            {userpost.length === 0 
            ?   
                <Fragment>
                { loading ? 
                <div className="_center">Loading...</div> 
                : 
                <div className="no-content-user-products-page">
                    <li><h1>This Shop has no Product Listed!</h1></li>
                    <li><Link to="/"><FaHome/> Return to HomePage?</Link><br/></li>
                    <li><Link to={`/userproducts/${match.params.id}?page=1`}><GiShop/> Return to user shop page?</Link></li>
                </div>
                }
               </Fragment>
            :   
                <Fragment>
                    <div className="user-title">
                        <h1><GiShop/> {userpost[0].user.shop}</h1>
                        <h3>Total Products Listed: {length} </h3>
                    </div>

                    <div className={`sort-container-userpost`}>
                    {!click ? 
                    <button className={userpost.length === 0 ? "hidden" : ""} onClick={() => setClick(!click)}><RiListSettingsLine/> Sort</button> 
                    :
                    <Fragment>
                        <div className="sort-dropdown">
                        <div className="filtering-btn"><button onClick={() => setClick(!click)}><RiListSettingsLine/> Sort</button></div>
                        <button className={filtering === "high-price" ? "selected-sort" : ""} onClick={() => sorting("high-price")}><HiSortAscending/> Price</button>
                        <button className={filtering === "low-price" ? "selected-sort" : ""} onClick={() => sorting("low-price")}><HiSortDescending/> Price</button>
                        <button className={filtering === "high-rating" ? "selected-sort" : ""} onClick={() => sorting("high-rating")}><HiSortAscending/> Rating</button>
                        <button className={filtering === "low-rating" ? "selected-sort" : ""} onClick={() => sorting("low-rating")}><HiSortDescending/> Rating</button>
                        <button className={filtering === "high-num-review" ? "selected-sort" : ""} onClick={() => sorting("high-num-review")}><HiSortAscending/> Reviews</button>
                        <button className={filtering === "low-num-review"? "selected-sort" : ""} onClick={() => sorting("low-num-review")}><HiSortDescending/> Reviews</button>
                        <button className={filtering === "high-quantity" ? "selected-sort" : ""} onClick={() => sorting("high-quantity")}><HiSortAscending/> Quantity</button>
                        <button className={filtering === "low-quantity"? "selected-sort" : ""} onClick={() => sorting("low-quantity")}><HiSortDescending/> Quantity</button>
                        <button className={filtering === "new" ? "selected-sort" : ""} onClick={() => sorting("new")}><GoCalendar/> Newest</button>
                        <button className={filtering === "old" ? "selected-sort" : ""} onClick={() => sorting("old")}><GoCalendar/> Oldest</button>
                        <button className={filtering === "high-view" ? "selected-sort" : ""} onClick={() => sorting("high-view")}><FaCrown/> Most Views</button>
                        </div>
                    </Fragment>
                    }
                    </div>


                    <div className="user-product-container">
                    <ProductLayout posts={userpost} shop={"true"}/>
                    </div>

                    {userpost.length === 0 ? "" :
                        <div className={`pagination-bottom-userpost`}>
                            <li><button onClick={() => decrement(1)}><TiArrowLeftThick /></button></li>
                            <li><p>Current Page: {pageNumber}</p></li>
                            {userpost.length >= limit ? 
                            <li><button onClick={() => increment(1)}><TiArrowRightThick /></button></li>
                            : "" }
                        </div>
                    }

                </Fragment>
            }
        </Fragment>
    )
}

UserProducts.propTypes = {
    getUserProducts: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    product: state.productReducers,
})

export default connect(mapStateToProps, {getUserProducts})(UserProducts)
