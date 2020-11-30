import './GetUserProducts.scss';
import React, {Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {getUserProducts, deleteUser} from '../../actions/adminAction';
import {storage} from '../../firebase';
import {setAlert} from '../../actions/alertActions';
import {MdContentCopy} from 'react-icons/md';
import {RiRocket2Line, RiSunFoggyFill} from 'react-icons/ri';

const GetUserProducts = ({getUserProducts, deleteUser, setAlert, admin:{User} }) => {
    const [userId, setUserId] = useState(!User || User.length === 0 ? "" : User[0].user)
    const [sure, setSure] = useState("")
    const [productInfo, setProductInfo] = useState({
        imageUrl: "",
        length: ""
    })
    const {imageUrl, length} = productInfo

    useEffect(() => {
        setProductInfo({
            imageUrl: !User ? "" : Array.prototype.concat(...User.map(el => el.image)),
            length: !User ? "" : Array.prototype.concat(...User.map(el => el.image)).length
        })
    }, [setProductInfo, User])

    const SendUserToTheSun = () => {
        if(sure === "delete"){
        let i;
            for(i = 0; i < length; i++){
                const desertRef = storage.refFromURL(imageUrl[i].url)
                desertRef.delete()
            }
            if(i === length){
                deleteUser(userId)
            }
        }
    }

    const copy = (data) => {    
        navigator.clipboard.writeText(data)
        setAlert("Copied!", 'primary')
    }

    return (
        <Fragment>
        <div className="get-information">
            <button onClick={() => getUserProducts(userId)}> Request With User ID</button>
            <input placeholder="Enter User ID" type="text" value={userId} onChange={(e) => setUserId(e.target.value) } />
        </div>

        {!User ?  <div>{sure === "delete" ? "Sent To The Sun. Est Arrival Time 1Hour!": "Empty"}</div> : 
        <div className="gotten-user-products">
            <div className="options">
                <li>Total Products: {User.length}</li>
                <li><input type="text" placeholder="< delete >" onChange={(e) => setSure(e.target.value)} /></li>
                <li><button className={sure === "delete" ? "delete" : ""} onClick={() => SendUserToTheSun()}><RiRocket2Line/> {sure === "delete" ? "Send To The Sun" : "Delete User"} <RiSunFoggyFill/></button></li>
            </div>

            {User.map((el,index) => 
            <div className="products" key={index}>
                <button onClick={() => copy(el._id)}><MdContentCopy/> Product ID: {el._id}</button><br/>
                {el.image.map((a, i) => 
                    <li key={i}> {a.url.slice(90, 110)} </li>
                )}
            </div>
            )}
        </div>
        } 

        </Fragment>
    )
}

const mapStateToProps = state => ({
    admin: state.adminReducers
})

export default connect(mapStateToProps, {getUserProducts, deleteUser, setAlert})(GetUserProducts)
