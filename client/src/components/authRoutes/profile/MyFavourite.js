import './MyFavourite.scss';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {favouriteDelete} from '../../../actions/userActions';

const Favourite = ({favouriteDelete, user:{user}}) => {
    
    const deleteFav = (e, id) => {
        e.preventDefault()
        favouriteDelete(id)
    }

    return (
        <Fragment>
        {!user ? <div className="loading" /> : <Fragment>
        <section className="favourite_section">
        <div className="favourite-length">Total Favourite: {user.favourite.length}</div>
        <div className="favourite-container" >
            {user.favourite.map((el, index) => 
                <div className="favourite-container-map" key={index}>

                    <div className="picture">
                    {el.product === null ?  
                    <img alt="Bad URL" src="https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/sprout%2Fpostdeleted.png?alt=media&token=1ee6bd49-3cef-470d-bd7b-1f5bb9e15093" />
                    :
                    <Link to={`/product/${el.product._id}`}>
                    <img alt="Bad URL" src={el.product.image.length === 0 ? "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/sprout%2Fpexels-ylanite-koppens-776656.jpg?alt=media&token=811835ae-d552-4ba4-b2c1-cca408b3b02d" : el.product.image[0].url} />
                    </Link>
                    }
                    </div>

                    <div className="fav-information">
                        <p>{el.product === null ? "" : `£${el.product.price}`}</p>
                        {el.product === null ? <p>This Product no longer exist. Please delete this :D </p> :
                        <Fragment>
                            {el.product.description_title.split(" ").length > 8 ?
                                <p>{el.product.description_title.split(" ").slice(0, 10).join(" ")}... </p> : 
                                <p>{el.product.description_title}</p>   
                            } 
                        </Fragment>
                        }
                    </div>
                    <div>
                        <button onClick={(e) => deleteFav(e, el._id)}>Delete</button>
                    </div>
                </div>
            )}
        </div>
        </section>
        </Fragment>
        } </Fragment>
    )
}

Favourite.propTypes = {
    user: PropTypes.object.isRequired,
    favouriteDelete: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    user : state.userReducers
})
export default connect(mapStateToProps, {favouriteDelete})(Favourite)
