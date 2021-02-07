import './Similar.scss'
import React, {Fragment, useEffect} from 'react'
import {Link} from 'react-router-dom';
import {updateViews, getSimilarProducts} from '../../../actions/productActions';
import {connect} from 'react-redux';

const Similar = props => {
    const type = props.type
    const getSimilarProducts = props.getSimilarProducts
    const limit = window.innerWidth > 550 ? 4 : 7

    useEffect(() => {
        getSimilarProducts(type, limit)
    }, [getSimilarProducts, type, limit])

    const selectSimilar = (e, id, view) => {
        e.preventDefault()
        window.scroll({top: 0, behavior: "smooth"})
        props.updateViews(id, view)
    }

    return (
        <section className="similar">
        {!props.post ? <div className="_center">Loading... If it takes longer than 10seconds Please reload...</div> : 
        (<Fragment> 
            {!props.similar ? "" : 
            <Fragment>
                <div className="similar-items">
                    <h1>Similar Products</h1>
                    <div className="card-container-similar">
                    {props.similar.map((el, index) => 
                    <div className="card-similar" key={index}>
                        <button onClick={(e) => selectSimilar(e, el._id, (el.view + 1))}><Link to={`/product/${el._id}`}><img className="picture" src={el.image.length === 0 ? "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/sprout%2Fpexels-ylanite-koppens-776656.jpg?alt=media&token=811835ae-d552-4ba4-b2c1-cca408b3b02d" : el.image[0].url} alt="homeImg" /></Link></button>

                            <div className="information-similar">
                            <li>£{el.price}</li>
                            {el.view >= 10000  ? <li>`Views: ${el.view / 1000}K`</li> : <li>Views: {el.view}</li>} <br/>
                            <li>{el.description_title.split(" ").length >= 8 ? `${el.description_title.split(" ").slice(0, 8).join(" ")}...` : `${el.description_title}`}</li>
                            </div>
                        </div>
                        )}
                    </div>
                </div>
            </Fragment>
            }
        </Fragment>
        )}
        </section>
    )
}

export default connect(null, {updateViews, getSimilarProducts})(Similar)
