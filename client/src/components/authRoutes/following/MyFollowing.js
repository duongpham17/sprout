import './MyFollowing.scss'
import React, {Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {AiOutlineCloseCircle} from 'react-icons/ai';

import {getMyFollowings, Follow, unFollow, searchBarForShopname} from '../../../actions/followActions';

const MyFollowing = ({ getMyFollowings, Follow, unFollow, searchBarForShopname, follow:{follow, search, loading} }) => {

    const [clickDelete, setClickDelete] = useState(false)

    //get data for the area for shops that user is following
    useEffect(() => {
        getMyFollowings()
    }, [getMyFollowings])

    //setting input data so when it changes it updates into formData
    const [formData, setFormData] = useState({
        shop: ""
    })
    //deconstruct so we can just use shop, shop = formData.shop basically.
    const {shop} = formData

    //Use another useeffect to re-render everytime a user puts in a word e.g t will then go to the back end and find any shop name that has a letter t.
    //Made it 4 letters long to ensure less request to the server.
    useEffect(() => {
            if(shop.length >= 4){
                searchBarForShopname(shop)
            }
    }, [searchBarForShopname, shop])

    const UnFollowShop = (id) => {
        unFollow(id)
        setClickDelete(true)
        setTimeout(function(){
            setClickDelete(false)
        }, 1000)
    }

    //update formData based on the name === value
    const onChange = (e) => {setFormData({...formData, [e.target.name]: e.target.value })}

    return (
        <Fragment>
            {!follow || loading ? <div className="_center">Loading....</div> : 
            <Fragment>
            <div className="follow-shop">

            <div className="followers"><h3>Followers: {!follow ? "" : follow.followerNum} </h3></div>

            <div className="search-bar-for-shop"> 
                <input maxLength="21" autoComplete="off" type='text' placeholder="Search Shop Name... Case Sensitive" name="shop" value={shop} onChange={e => onChange(e)}  />
                <button className={shop.length >= 1 ? "close" : "hidden"} onClick={() => setFormData({shop: ""})}><AiOutlineCloseCircle/></button>
                {!search ? "" : 
                <Fragment>
                    {shop.length >= 1 ?
                    <Fragment>
                        <div className="search-bar-shop">
                            {search.map((el, index) => 
                                <div className="shop-result" key={index}>
                                    <button onClick={() => Follow(el._id)}>Follow | </button>
                                    <Link to={`/userproducts/${el._id}`}>{el.shop.split(" ").length >= 7 ? `${el.shop.split(" ").slice(0, 7).join(" ")}...}` : el.shop }</Link>
                                </div>
                            )}
                        </div>
                    </Fragment>
                    : ""}
                </Fragment>
                }
            </div> 

            <div className="following-shops-container">
                <h3>Following : {follow.followingNum} </h3>
                {follow.followings.map((el, index) => 
                    <div className="shops" key={index}> 
                        <li><Link to={`/userproducts/${el.follow_user._id}`}><img className="picture" src={el.follow_user.avatar} alt="" /></Link></li>
                        <li><p>{el.follow_user.shop}</p></li>
                        {clickDelete === true ? "" : <li><button onClick={() => UnFollowShop(el._id)}>UnFollow</button></li> }
                    </div>
                )}
            </div>

            </div> 
        
            </Fragment>       
            }
        </Fragment>
    )
}

MyFollowing.propTypes = {
    follow: PropTypes.object.isRequired,
    getMyFollowings: PropTypes.func.isRequired,
    unFollow: PropTypes.func.isRequired,
    searchBarForShopname: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    follow: state.followReducers
})

export default connect(mapStateToProps, {getMyFollowings, Follow, unFollow, searchBarForShopname})(MyFollowing)
