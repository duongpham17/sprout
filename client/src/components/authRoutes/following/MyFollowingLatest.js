import './MyFollowingLatest.scss'
import React, {Fragment, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import moment from 'moment';
import {FiThumbsUp, FiThumbsDown} from 'react-icons/fi';
import {MdContentCopy} from 'react-icons/md';
import {FaStar} from 'react-icons/fa';
import {getLatestFollowProduct} from '../../../actions/followActions';
import {updateViews} from '../../../actions/productActions';
import {favourite} from '../../../actions/userActions';
import defaultImage from '../../img/default.jpg';
import {setAlert} from '../../../actions/alertActions';


const MyFollowingLatest = ({setAlert, getLatestFollowProduct, updateViews, favourite, follow:{follows, length}}) => {

    const [limitPage, setLimitPage] = useState(20)
    const [isBottom, setIsBottom] = useState(false);

    useEffect(() => {
        if (isBottom) {
            setTimeout(function(){
                setIsBottom(false);
                setLimitPage(limitPage + 20)
            }, 500)
        } else {
            getLatestFollowProduct(limitPage)
        }
    },[getLatestFollowProduct, setLimitPage, isBottom, limitPage]);

    useEffect(() => {
        if(length >= limitPage){
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
        }
    }, [length, limitPage]);

    function handleScroll() {
        const scrollTop = (document.documentElement
          && document.documentElement.scrollTop)
          || document.body.scrollTop;
        const scrollHeight = (document.documentElement
          && document.documentElement.scrollHeight)
          || document.body.scrollHeight;
        if (scrollTop + window.innerHeight + 1 >= scrollHeight){
          setIsBottom(true);
        }
    }   

    const copy = (data) => {    
        navigator.clipboard.writeText(data)
        setAlert("Copied!", 'primary')
    }

    return (
        <Fragment>
        {!follows ? <div className="no_content">Loading....</div> : 
            <Fragment>
                <div className="following-header"><h1>Latest Following Listing</h1></div>

                {length === 0 ? 
                <div className="no_content"> <Link to="/following">Follow more users for more latest listing</Link> </div>
                : ""}

                <div className="following-latest-container">
                    {follows.map((el, index) => 
                    <Fragment  key={index} >
                        <div className="following-latest-card">
                        <div className="fav-container">
                            <li><Link to={`/userproducts/${el.user._id}`}><img src={el.user.avatar} alt="" /></Link></li>
                            <button className="fav-btn" onClick={() => favourite(el._id)}><FaStar/></button>
                            <button className="copy-btn" onClick={() => copy(`${process.env.REACT_APP_WEBSITE_URL}/product/${el._id}`)}><MdContentCopy /></button>
                        </div>
                        <div className="shop-name">
                        <Link to={`/userproducts/${el.user._id}`}>{el.user.shop.split(" ").length > 5 ? `${el.user.shop.split(" ").slice(0, 5).join(" ")}...` : el.user.shop }</Link>
                        </div>

                        <div className="picture">
                        <button onClick={() => updateViews(el._id, (el.view + 1))}><Link to={`/product/${el._id}`}><img src={el.image.length === 0 ? defaultImage : el.image[0].url} alt="Bad URL" /></Link></button>
                        </div>

                        {el.supplier === "yes" ? 
                        <div className="supplier">
                            <p>Supplier</p>
                        </div>
                        : "" }

                        <div className="thumbs">
                            <li>{moment(el.createdAt).format("lll").split(" ").slice(0, 2).join(" ")} {moment(el.createdAt).format("lll").split(" ").slice(3, 5).join(" ")} </li><br/>
                            <li>Views: {el.view}</li>
                            <li><FiThumbsUp /> <span>{el.user.good > 10000 ? `${el.user.good / 10000}K` : el.user.good}</span></li>
                            <li><FiThumbsDown /> <span>{el.user.bad > 10000 ? `${el.user.good / 10000}K` : el.user.bad}</span></li>
                        </div>

                        <div className="price">
                            <li>£: {el.price}</li>
                            <li>Quantity: {el.quantity}</li>
                        </div>

                        <div className="description">
                            <li><span>{el.description_title.split(" ").length >= 10 ? `${el.description_title.split(" ").slice(0, 10).join(" ")}...` : `${el.description_title}`}</span></li>
                        </div>

                        <div className="review">
                            <li>Reviews: {el.ratingsQuantity}</li>
                            <li>Ratings: {el.ratingsAverage} / 5 <FaStar/></li>
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
                
                {length >= 20 ?
                <Fragment>
                <div className="to-top"><button onClick={() => {window.scrollTo({top: 0, behavior:"smooth"})} }>Top</button></div>
                <div className="load-more"> <div className={isBottom ? "isBottom" : ""}>{isBottom ? "Loading...." : `${length >= limitPage ? "More" : ""}` }</div></div>
                </Fragment>
                : "" }
            </Fragment>  
        }
        </Fragment>
        
    )
}

MyFollowingLatest.propTypes = {
    follow: PropTypes.object.isRequired,
    updateViews: PropTypes.func.isRequired,
    getLatestFollowProduct: PropTypes.func.isRequired,
    favourite: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    follow: state.followReducers
})

export default connect(mapStateToProps, {setAlert, getLatestFollowProduct, updateViews, favourite})(MyFollowingLatest)
