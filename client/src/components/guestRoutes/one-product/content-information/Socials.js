import './Socials.scss';
import React from 'react';

import facebook from '../../../img/facebook.png';
import instagram from '../../../img/instagram.png';
import pinterest from '../../../img/pinterest.png';
import twitter from '../../../img/twitter.png';
import youtube from '../../../img/youtube.png';
import mywebsite from '../../../img/mywebsite.png';
import etsy from '../../../img/etsy.png';

const Socials = props => {
    return (
    <div className="social-icons-product">
        {props.post.user.social.length === 0 ? "None" : props.post.user.social.map((el, index) => 
            <div className="social-map" key={index}>
                {el.app.split(" ")[0] === "youtube" ? <li><a href={el.app.split(" ")[1]}><img src={youtube} alt="social"/></a></li> : ""}
                {el.app.split(" ")[0] === "twitter" ? <li><a href={el.app.split(" ")[1]}><img src={twitter} alt="social"/></a></li> : ""}
                {el.app.split(" ")[0] === "pinterest" ? <li><a href={el.app.split(" ")[1]}><img src={pinterest} alt="social"/></a></li> : ""}
                {el.app.split(" ")[0] === "facebook" ? <li><a href={el.app.split(" ")[1]}><img src={facebook} alt="social"/></a></li> : ""}
                {el.app.split(" ")[0] === "instagram" ? <li><a href={el.app.split(" ")[1]}><img src={instagram} alt="social"/></a></li> : ""}
                {el.app.split(" ")[0] === "etsy" ? <li><a href={el.app.split(" ")[1]}><img src={etsy} alt="social"/></a></li> : ""}
                {el.app.split(" ")[0] === "mywebsite" ? <li><a href={el.app.split(" ")[1]}><img src={mywebsite} alt="social"/></a></li> : ""}
            </div>
        )}
    </div>
    )
}


export default Socials
