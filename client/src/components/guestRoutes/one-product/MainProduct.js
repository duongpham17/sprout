import './MainProduct.scss';
import React, {Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';

import {GiTreeBranch, GiWoodenCrate} from 'react-icons/gi';
import {RiArrowLeftRightLine} from 'react-icons/ri';
import {BsFillHeartFill} from 'react-icons/bs';
import {MdPayment} from 'react-icons/md';
import {GoLocation} from 'react-icons/go';

import {getOneProduct} from '../../../actions/productActions';
import {setAlert} from '../../../actions/alertActions';

import Stats from './Stats';
import Product from './Product';
import Gallery from './Gallery';
import Similar from './Similar';
import Reviews from './Reviews';
import Description from './Description';

import Allergens from './content-information/Allergens';
import Supplier from './content-information/Supplier';
import Socials from './content-information/Socials';
import ContactsAndBusiness from './content-information/ContactsAndBusiness';
import Payments from './content-information/Payments';
import ReturnPolicy from './content-information/ReturnPolicy';

const OneProduct = ({setAlert, match, getOneProduct, product:{post, similar}, auth:{loggedOn}, review:{review}}) => {
    const [dropdown, setDropDown] = useState("none")

    useEffect(() => {
        getOneProduct(match.params.id)
    }, [getOneProduct, match])

    /* For Setting Similar Products Recommendation */
    const [same, setSame] = useState({type: "" })
    const {type} = same

    /* 1/2 set the state to category and type from initial data */
    useEffect(() => {
        setSame({
            type: !post ? "" : post.type
        })
    }, [setSame, post])


    return (
    <Fragment>
        {!post ? <div className="no_content">Loading... If it takes longer than 10seconds Please reload...</div> : 
        <Fragment>
        <div className="product-container">

            {/* Stats Content */}
            <div className="contentStats">
            <Stats post={post} user={post.user} />
            </div>

            {/* Gallery Content */}
            <div className="contentGallery">
            <Gallery post={post} />
            </div>

            {/* Product Content */}
            <div className="contentProduct">
            <Product post={post} setAlert={setAlert} match={match.params.id} user={post.user} />
            </div>  

            {/* Allergens Content */}
            <div className="contentInformation">

                <div className="contentInformation-btn">
                    <div className="scroll-btn">
                    <button className={dropdown === "allergen" ? "open" : ""} onClick={() => setDropDown(dropdown === "allergen" ? "none" : "allergen")}><GiTreeBranch size="1.2rem" /><br/> Allergens</button>
                    {post.supplier === "yes" ?
                    <button className={dropdown === "supplier" ? "open" : ""} onClick={() => setDropDown(dropdown === "supplier" ? "none" : "supplier")}><GiWoodenCrate size="1.2rem"/><br/>Supplier</button>
                    : "" }
                    {post.user.business.show === "yes" ?
                    <button className={dropdown === "contactsAndBusiness" ? "open" : ""} onClick={() => setDropDown(dropdown === "contactsAndBusiness" ? "none" : "contactsAndBusiness")}><GoLocation size="1.2rem"/><br/>Business</button>
                    : "" }
                    <button className={dropdown === "return" ? "open" : ""} onClick={() => setDropDown(dropdown === "return" ? "none" : "return")}><RiArrowLeftRightLine size="1.2rem"/><br/>Return Policy</button>
                    <button className={dropdown === "payment" ? "open" : ""} onClick={() => setDropDown(dropdown === "payment" ? "none" : "payment")}><MdPayment size="1.2rem"/><br/>Payment</button>
                    <button className={dropdown === "social" ? "open" : ""} onClick={() => setDropDown(dropdown === "social" ? "none" : "social")}><BsFillHeartFill size="1.2rem"/><br/>My Socials</button>
                    </div>
                </div>

                {dropdown === "allergen" ?
                <Allergens post={post} />
                : "" }

                {dropdown === "supplier" ?
                <Supplier Icon={GoLocation} />
                : "" }

                {dropdown === "social" ?
                <Socials post={post} />
                : "" }

                {dropdown === "contactsAndBusiness" ?
                <ContactsAndBusiness post={post} setAlert={setAlert} />
                : "" }

                {dropdown === "payment" ?
                <Payments user={post.user} />
                : "" }

                {dropdown === "return" ?
                <ReturnPolicy post={post} />
                : "" }
            </div>

            {/* Description Content */}
            <Description post={post}/>

            {/* Review-Content */}
            <div className="contentReview">
            <Reviews post={post} review={review} match={match.params.id} loggedOn={loggedOn} user={post.user}/>
            </div>

            {/* Similar */}
            <div className="contentSimilar">
            <Similar post={post} similar={similar} type={type}/>
            </div>

        </div>
        </Fragment>
        }
        </Fragment>
    )
}

const mapStateToProps = state => ({
    product: state.productReducers,
    auth: state.authReducers,
    review: state.reviewReducers
})

export default connect(mapStateToProps, {setAlert, getOneProduct})(OneProduct)