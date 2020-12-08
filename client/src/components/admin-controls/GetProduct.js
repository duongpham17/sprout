import './GetProduct.scss';
import React, {useState, useEffect, Fragment} from 'react';
import {connect} from 'react-redux';
import {getProductWithId, deleteProduct, deleteProductReviews, clearProductsReports} from '../../actions/adminAction';
import {setAlert} from '../../actions/alertActions';
import {storage} from '../../firebase';
import {MdContentCopy, MdDelete} from 'react-icons/md';
import {FaTrash} from 'react-icons/fa';

const GetProduct = ({clearProductsReports, getProductWithId, deleteProduct, deleteProductReviews, setAlert, admin:{product}} ) => {

    const [productId, setProductId] = useState(!product ? "" : product._id)
    const [sure, setSure] = useState("")

    //image url
    const [imageUrl, setImageUrl] = useState({
        url: []
    })

    //storing review id, used for search bar
    const [reviewId, setReviewId] = useState({
        id: "",
        product_id: "",
    })
    const [searchReviewId, setSearchReviewId] = useState()
    const {id} = reviewId

    //for deleteing image
    useEffect(() => {
        setImageUrl({
            url: !product ? "" : product.image.map(el => el.url)
        })
    }, [setImageUrl, product])

    const deleteImageUrlFromFirebase = (length, id) => {
        if(sure === "delete"){
            let i;
            for(i = 0; i < length; i++){
                const desertRef = storage.refFromURL(imageUrl.url[i])
                desertRef.delete()
            }
            if(i === length){
                deleteProduct(id)
            }
        } else {
            setAlert("Enter Delete", 'primary')
        }
    }

    //for searching ticket
    useEffect(() => {
        setReviewId({
        id : !product ? "" : product.reviews.map(el => el._id )
        })
    }, [setReviewId, product])

    const filterId = !id? "" :  id.filter(el => el.includes(searchReviewId))

    const copy = (data) => {    
        navigator.clipboard.writeText(data)
        setAlert("Copied!", 'primary')
    }
    const calcDays = (created) => {
        const date = Date.now() - Date.parse(created) 
        const days = date / (1 * 24 * 60 * 60 * 1000)
        return days.toFixed(1)
    }

    return (
        <Fragment>
        <div className="get-information">
            <button onClick={() => getProductWithId(productId)}>Request With Product ID</button>
            <input placeholder="Enter Product ID" type="text" value={productId} onChange={(e) => setProductId(e.target.value) } />
        </div>

        <div className="product-information">
            {!product ? <div>Empty</div> : 
            <div>
                <div className="delete-product">
                    <input className={sure === "delete" ? "delete" : ""} type="text" placeholder="< delete >" onChange={e => setSure(e.target.value)} />
                    <button className={sure === "delete" ? "sure" : "hidden"}  onClick={() => deleteImageUrlFromFirebase(product.image.length, productId)}><FaTrash/> Delete Product</button>
                </div>

                <div className="product-images">
                {product.image.length === 0 ? <div>No Images</div> : product.image.map((el, index) =>
                    <img key={index} src={el.url} alt="" />
                )}
                </div>

                <div className="product-stats">
                    <li>Days Since Creation: <span>{calcDays(product.createdAt)}</span></li>
                    <li>Reported: {product.reported}</li>
                    <li>View: {product.view}</li>
                    <li>Avg.Rating: {product.ratingsAverage}</li>
                    <li>Num.Review: {product.ratingsQuantity}</li><br/>
                    <li>Description: {product.description_title}</li><br/>
                    <button onClick={() => setSure("clear")}>Clear Reports?</button>
                    {sure === "clear" ? 
                    <button onClick={() => clearProductsReports(productId)}><FaTrash/> Confirm Clear Product Reports</button>
                    : "" }
                </div>
                
                <div className="product-review">
                    <input type="text" placeholder="Search Review By ID" onChange={(e) => setSearchReviewId(e.target.value)} />
                </div>
                
                {!reviewId ? "" :
                <div className="search-result">
                    {!filterId ? ""
                    : 
                    <Fragment>
                        {!searchReviewId ?
                            <div>
                            {product.reviews.slice(0, 20).map((i, inx) => 
                            <Fragment>
                                <li key={inx}>
                                    <button className="delete" onClick={() => deleteProductReviews(i._id ,productId)}><MdDelete/></button>
                                    <button onClick={() => copy(i._id)}><MdContentCopy/> {i._id}</button>
                                </li>
                                <li>
                                    <p>Description: {i.review}</p>
                                </li>
                            </Fragment>
                            )}
                            </div>
                        :
                            <div>
                            {filterId.slice(0, 10).map((el, index) => 
                                <li key={index}>
                                    <button className="delete" onClick={() => deleteProductReviews(el,productId)}><MdDelete/></button>
                                    <button onClick={() => copy(el)}><MdContentCopy/> {el}</button> 
                                </li>

                            )}
                            </div>
                        }
                    </Fragment>
                    }
                </div>
                }
                
            </div>
            }
        </div>

        </Fragment>
    )
}

const mapStateToProps = state => ({
    admin: state.adminReducers
})

export default connect(mapStateToProps, {clearProductsReports, deleteProductReviews, getProductWithId, deleteProduct, setAlert})(GetProduct)
