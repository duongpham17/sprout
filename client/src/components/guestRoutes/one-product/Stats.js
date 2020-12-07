import './Stats.scss';
import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {FiThumbsUp, FiThumbsDown} from 'react-icons/fi';
import {TiLocationArrow} from 'react-icons/ti';
import {GiShop} from 'react-icons/gi';
import {FaStar} from 'react-icons/fa';
import {MdReport} from 'react-icons/md';

import {Follow} from '../../../actions/followActions';
import {favourite, report} from '../../../actions/userActions';

const Stats = props => {
    return (
        <Fragment>
        <div className="stats-container">
                <div>
                <li><button className="views">Views: {props.post.view}</button> </li>
                </div>

                <li><button className="thumbs"><FiThumbsUp size="1.3rem"/>   <br/> {props.post.user.good}</button></li>
                <li><button className="thumbs"><FiThumbsDown size="1.3rem"/> <br/> {props.post.user.bad}</button></li>
                <li><button className="fav-btn" onClick={() => props.favourite(props.post._id)}><FaStar size="1.5rem"/> <br/>Favourite </button></li>
                <li><button className="explore-btn"><Link to={`/shop/${props.post.user.shop}`}><GiShop size="1.5rem"/><br/>{props.post.user.shop}</Link></button></li>
                <li><button className="follow-btn" onClick={() => props.Follow(props.post.user._id)}> <TiLocationArrow size="1.5rem"/>  <br/>Follow  </button></li>
                <li><button className="report-btn" onClick={() => props.report(props.post._id, props.post.user._id)}> <MdReport size="1.5rem"/>  <br/>Report  </button></li>
        </div>

        </Fragment>
    )
}


export default connect(null, {Follow, favourite, report})(Stats)
