import './MyReview.scss';
import React, {Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {FaStar} from 'react-icons/fa';
import {TiDelete} from 'react-icons/ti';
import moment from 'moment';
import {deleteMyReview, getMyReview, updateMyReview} from '../../../actions/reviewActions';
import defaultImage from '../../img/default.jpg';
import postdeleted from '../../img/postdeleted.png';
import Pagination from '../../template/Pagination';


const ReviewDescription = (props) => {  
    const el = props.el

    const [formData, setFormData] = useState({
        review: "",
    })

    const {review} = formData

    const onSubmit = (e, id) => {
        e.preventDefault()
        props.updateMyReview(id, review)
    }
    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        setFormData({
            review: !el ? "" : el.review
        })
    }, [setFormData, el])

    return(
        <Fragment>

        <div className="review-description">
            <textarea maxLength="140" minLength="4" type="text" name="review" value={review || ""} onChange={(e) => onChange(e)} />
            <button onClick={(e) => {onSubmit(e, el._id)}}>Save Changes</button>
        </div>

        <div className="delete-review">
            <button onClick={() => props.deleteMyReview(el._id)}><TiDelete/></button>
        </div>

        </Fragment>
    )
}

const MyReview = ({getMyReview, updateMyReview, deleteMyReview, review:{myreviews, length, loading}}) => {

    return (
        <Fragment>
        {!myreviews ? <div className="no_content3">{loading ? "Loading...." : "Please Reload..."}</div> :
        <Fragment>
                <div className="review-title">
                    <h1>My Reviews</h1>
                    <h2 className="total-reviews">Total Reviews: {length}</h2>
                </div>

            <section className='my-review-container'>
                {myreviews.map((el, index) => 
                <Fragment key={index}>
                    <div className="review-card-container">
                        <div className="picture">{
                            el.product === null ? 
                            <button onClick={() => deleteMyReview(el._id)}><img src={postdeleted} alt="review"/></button>
                            : 
                            <Link to={`/product/${el.product._id}`}><img src={el.product.image.length === 0 ? defaultImage : el.product.image[0].url } alt="review" /></Link> 
                        }</div>

                        <div className="review-rating">
                        {[...Array(Math.round(el.rating))].map((el, index) => <p className='star' key={index}><FaStar/></p> )}
                        <p className='date'>{moment(el.createdAt).format("lll").split(" ").slice(0, 3).join(" ")}</p>
                        </div>  
                    
                        <ReviewDescription el={el} deleteMyReview={deleteMyReview} updateMyReview={updateMyReview} />

                    </div>
                </Fragment>
                )}
            </section>
        </Fragment>
        }
        <Pagination route={"review"} getDataRequest={getMyReview} posts={myreviews} limit={20} noContent={"true"} totalProducts={length} />
        
        </Fragment>
    )
}

const mapStateToProps = state => ({
    review: state.reviewReducers
})

export default connect(mapStateToProps, {getMyReview, updateMyReview, deleteMyReview})(MyReview)
