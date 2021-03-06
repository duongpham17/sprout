import './Gallery.scss';
import React, {Fragment, useState} from 'react';
import {connect} from 'react-redux';

const Gallery = (props) => {

    //clicked images, image url will be set as src.
    const [selectedImg, setSelectedImg] = useState("");

    return (
        <Fragment>
            {!props.post ? "" : 
            <Fragment>
                {props.post.image.length === 0 ? <img className="gallery-empty" src={props.post.image.length === 0 ? "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/sprout%2Fpexels-ylanite-koppens-776656.jpg?alt=media&token=811835ae-d552-4ba4-b2c1-cca408b3b02de" : props.post.image[0].url} alt="" /> 
                : 
                <section className="image_container">
                        <div className="image-selected">
                            <img src={selectedImg || props.post.image[0].url} alt='selected' className="selected" />
                        </div>

                        <div className='imgContainer'>
                            {props.post.image.map((el, index) => 
                                <div className="images" key={index} onMouseEnter={() => setSelectedImg(el.url)}> 
                                    <img src={el.url} alt='selectedimg' /> 
                                </div> 
                            )}
                        </div>

                    </section>
                }
            </Fragment>
            }
        </Fragment>
    )
}


const mapStateToProps = state => ({
    product: state.productReducers,
})

export default connect(mapStateToProps)(Gallery)
