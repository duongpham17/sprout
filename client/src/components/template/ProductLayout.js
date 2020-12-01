import './ProductLayout.scss';
import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import moment from 'moment';

import {FiThumbsUp, FiThumbsDown} from 'react-icons/fi';
import {MdContentCopy, MdReport} from 'react-icons/md';
import {FaStar} from 'react-icons/fa';
import {AiOutlineShop} from 'react-icons/ai'
import defaultImage from '../img/default.jpg';

import {updateViews} from '../../actions/productActions';
import {favourite, report} from '../../actions/userActions';
import {Follow} from '../../actions/followActions';
import {setAlert} from '../../actions/alertActions';

const ProductLayout = (props) => {

    const copy = (data) => {    
        navigator.clipboard.writeText(data)
        props.setAlert("Copied!", 'primary')
    }

    return (
        <Fragment>
        {props.posts.length === 0 ? 

        <Fragment>
        {props.statsEmpty === "true" ?
        <div className="no_content3">Nothing Found In This Region</div> 
        : ""}
        </Fragment>
        : 
        <Fragment>
        <section className="product_section">
        <h1>{props.title}</h1>
        <div className="card_container">
            {props.posts.map((el, index )=> 
            <Fragment key={index}>
                <div className="card" key={index}>

                    {props.stats === "true" ? 
                        <div className="stats">
                            <h2>{index + 1}</h2>
                        </div>
                    : "" }

                    <div className="fav-container">
                        <button className="fav-btn" onClick={() => props.favourite(el._id)}><FaStar/></button>
                        <button className="copy-btn" onClick={() => copy(`${process.env.REACT_APP_WEBSITE_URL}/product/${el._id}`)}><MdContentCopy/></button>
                        <button className="follow-btn" onClick={() => props.Follow(el.user._id) }><AiOutlineShop size="1.5rem"/></button>
                    </div>
                    
                    <div className="shop-name">
                    {props.shop === "true" ? <p>.</p> :
                    <Link to={`/userproducts/${el.user._id}`}>{el.user.shop.split(" ").length > 5 ? `${el.user.shop.split(" ").slice(0, 5).join(" ")}...` : el.user.shop }</Link>
                    }
                    </div>

                    <div className="report">
                        <button onClick={() => props.report(el._id, el.user._id)}><MdReport/></button>
                    </div>

                    <div className="picture">
                    <button onClick={() => props.updateViews(el._id, (el.view + 1))}><Link to={`/product/${el._id}`}>
                    <img src={el.image.length === 0 ? defaultImage : el.image[0].url} alt="Bad URL" />
                    </Link>
                    </button>
                    </div>

                    {props.admin === "true" ? 
                        <div className="admin">
                            <button onClick={() => copy(el.id)}><MdContentCopy/> Product: {el.id}</button><br/>
                            <button onClick={() => copy(el.user._id)}><MdContentCopy/> User: {el.user._id}</button>
                        </div>
                    : ""}

                    {el.supplier === "yes" ? 
                    <div className="supplier">
                        <p>Supplier</p>
                    </div>
                    : "" }

                    <div className="thumbs">
                        <li>{moment(el.createdAt).format("lll").split(" ").slice(0, 3).join(" ")}</li> <br/>
                        <li>Views: {el.view}</li>
                        <li><FiThumbsUp /><span>{el.user.good >= 10000 ? `${Math.round(el.user.good / 1000)}K` : el.user.good }</span></li>
                        <li><FiThumbsDown /><span> {el.user.bad >= 10000 ? `${Math.round(el.user.bad / 1000)}K` : el.user.bad }</span></li>
                    </div>

                    <div className="price">
                        <li>£: {el.price}</li>
                        <li>{el.quantity === null ? "out of stock" : `Quantity: ${ el.quantity}` }</li>
                    </div>

                    <div className="description">
                        <li>{el.description_title.split(" ").length >= 10 ? `${el.description_title.split(" ").slice(0, 10).join(" ")}...` : `${el.description_title}`}</li>
                    </div>

                    <div className="review">
                        <li>Reviews: {el.ratingsQuantity}</li>
                        <li>Rating {el.ratingsAverage} / 5 <FaStar className="star"/> </li>
                    </div>

                    <div className="delivery">
                        {el.delivery === "yes" && el.collect === "yes" ? 
                        <Fragment>
                        <li>Delivery £{el.cost_delivery}</li>
                        <li>Est. {el.est_delivery === "none" ? "?" : el.est_delivery} Days</li>
                        <li>Collect Available</li>
                        </Fragment>
                        : ""}

                        {el.delivery === "yes" && el.collect === "no" ? 
                        <Fragment>
                        <li>Delivery £{el.cost_delivery}</li>
                        <li>Est. {el.est_delivery === "none" ? "?" : el.est_delivery} Days</li>
                        </Fragment>
                        : ""}

                    
                        {el.collect === "yes" && el.delivery === "no" ? 
                        <li>Only Collect</li>
                        : ""}
                    </div>
                </div>
                </Fragment>
                )}
            </div>
            </section>
            </Fragment>}
        </Fragment>
    )
}

export default connect(null, {report, favourite, updateViews, Follow, setAlert})(ProductLayout)


/* 

* props.posts === The Data fetched from the Api /url/Endpoint 

* props.title === The title for the product container

* props.admin === only admin will see

* props.stats === The product position out of top 100 category, top products, top ratings etc....

* props.statsEmpty === Show a message saying nothing was found when searching through stats
*/