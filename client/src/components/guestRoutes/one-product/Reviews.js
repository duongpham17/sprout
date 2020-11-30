import './Reviews.scss';
import React, {Fragment, useState} from 'react'
import moment from 'moment';
import {createReview} from '../../../actions/productActions';
import {connect} from 'react-redux';
import {FaStar} from 'react-icons/fa';
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md';

const Reviews = props => {
    //store the  browser window width
    const resize = window.innerWidth

    /* For Review Pagination */
    const NumberOfReviewsShown = resize < 650 ? 10 : 6;
    const [reviewPerPage, setReviewPerPage] = useState(NumberOfReviewsShown);
    const [countReview, setCountReview] = useState(0);
    
    /* To Create Review for Product & Star hoverEffect */
    const [ratings, setRatings] = useState(null)
    const [hoverStar, setHoverStar] = useState(null)
    const [reviewData, setReviewData] = useState({review: ""})
    const {review} = reviewData

    const onSubmitReview = (e) => {
        e.preventDefault()
        props.createReview(review, ratings, props.match)
        props.setDropDown(0)
    }
    const onChangeReview = (e) => {
        setReviewData({...reviewData, [e.target.name]: e.target.value});
    }

    /* For switching Reviews *Pagination */
    const increaseReview = () => {
        setReviewPerPage(reviewPerPage + NumberOfReviewsShown)
        setCountReview(countReview + NumberOfReviewsShown)
    }
    
    const decreaseReview = () => {
        if(countReview > 0){
        setReviewPerPage(reviewPerPage - NumberOfReviewsShown)
        setCountReview(countReview - NumberOfReviewsShown)
        } else {
            setReviewPerPage(NumberOfReviewsShown)
            setCountReview(0)
        }
    }

    return (
        <section className="review-content">
        <Fragment>
        <div className="review-stats">
            <li>Total Reviews: {props.post.ratingsQuantity}</li>
            <li>Average Rating: {props.post.ratingsAverage}</li>
            <li>{[...Array(Math.round(props.post.ratingsAverage))].map((el, index) => <p key={index}><FaStar/></p> )}</li>
        </div>

        <div className="create-review">{ !props.loggedOn || props.post.reviews.map(el => el.user.id).includes(props.user._id) === true ? "" : 
            <Fragment>
                {props.dropdown === 5 ?
                    <div className="review-form"> 
                        <div className="review-btn"><button onClick={() => props.setDropDown(0)}>&#9998; Writing a Review</button></div>
                        <form onSubmit={e => onSubmitReview(e)}>
                            <div>
                            <textarea
                            minLength="4"
                            maxLength="140"
                            type="text"
                            placeholder="max 140 characters. :)"
                            name="review"
                            value={review}
                            onChange={e => onChangeReview(e)}
                            required
                            />
                            </div>

                        <div className="rating-stars">
                        {[...Array(5)].map((el, index) => {
                            const ratingValue = index + 1

                            return (
                                <label key={index}>
                                    <input type="radio" name="rating" value={ratingValue} onClick={() => setRatings(ratingValue)} required/>
                                    <div onMouseEnter={() => setHoverStar(ratingValue)} 
                                         onMouseLeave={() => setHoverStar(null)} 
                                         className={ratingValue <= (hoverStar || ratings) ? "star-gold" : "star-black"}><FaStar/>
                                    </div>
                                </label>
                                )
                            }
                        )}
                        </div>
                        <input type="submit" className="create-review-btn" value="Create" />
                        </form>
                    </div>
                : 
                    <div><button onClick={() => props.setDropDown(5)}>&#9998; Write a Review</button></div> 
                }
            </Fragment>
            }
        </div>            

        <div className="reviews-container">
        {props.post.reviews.slice(countReview, reviewPerPage).map((el, index) => 
        <Fragment key={index}>
            <div className="review-card">
                <li><a href={`/userproducts/${el.user._id}`}><img src={el.user.avatar} alt="avatar"/></a></li>
                <li className="star">
                    {el.user.name.split(" ")[0]}
                    {el.rating === 1 ? <p className="star"><FaStar/></p> : ""}
                    {el.rating === 2 ? <p className="star"><FaStar/><FaStar/></p> : ""}
                    {el.rating === 3 ? <p className="star"><FaStar/><FaStar/><FaStar/></p> : ""}
                    {el.rating === 4 ? <p className="star"><FaStar/><FaStar/><FaStar/><FaStar/></p> : ""}
                    {el.rating === 5 ? <p className="star"><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></p> : ""}
                    {moment(el.createdAt).format("lll").split(" ").slice(0, 3).join(" ")}
                </li>
                <li><p className="des">{el.review}</p></li>
            </div>
        </Fragment>
        )}
        </div>

        {props.post.reviews.length >= reviewPerPage ? 
        <Fragment> 
            <div className="review-arrows">
                <button onClick={() => decreaseReview()}><MdKeyboardArrowLeft/></button>
                <button onClick={() => increaseReview()}><MdKeyboardArrowRight/></button>
            </div>
        </Fragment> :  
            <div className="review-arrows">
                <button onClick={() => decreaseReview()}><MdKeyboardArrowLeft/></button>
            </div>
        }
    
        </Fragment>
    </section>
    )
}


export default connect(null, {createReview})(Reviews)
