import './Layout.scss';
import React, {Fragment, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../actions/authActions';
import {getUserTicketLength} from '../../actions/ticketActions';
import SearchBar from './SearchBar';

import {FaTrash, FaStar, FaShoppingCart} from 'react-icons/fa';
import {MdRateReview} from 'react-icons/md';
import {IoIosCreate} from 'react-icons/io';
import {TiLocationArrow} from 'react-icons/ti';
import {RiFolderHistoryFill, RiLogoutBoxRFill, RiEditBoxLine, RiUserFill} from 'react-icons/ri';
import {SiCodechef} from 'react-icons/si';
import {AiFillShop} from 'react-icons/ai';

const Navbar = ({logout, auth:{loggedOn}, user:{user}, ticket:{length}, getUserTicketLength}) => {
    
    useEffect(() => {
        if(loggedOn === true){
            getUserTicketLength()
        }
    }, [getUserTicketLength, loggedOn])

    return (
        <Fragment>
            <nav className='navbar'>
                {loggedOn ? 
                <div className="auth_nav_profile">
                    {!user ? "" : 
                    <Fragment>

                        {user.role === "user" ? 
                        <Fragment>
                        <div className="following-content">
                        {!length ? "" : <li><Link to='/ticket/seller'><SiCodechef className="icon_s"/> Seller({length.ticketsSeller.length})</Link></li> }
                        {!length ? "" : <li><Link to='/ticket/buyer'><FaShoppingCart className="icon_s"/> Buyer({length.ticketsBuyer.length})</Link></li> }
                        <li><Link to='/latest'><AiFillShop className="icon_s"/> Latest</Link></li>
                        </div>
                        <div className="dropdown">
                        <button className="dropbtn"><img className="avatar-img" src={user.avatar} alt="avatar"/></button>
                           <div className="dropdown-content">
                           <li><Link to='/following'>Follow <TiLocationArrow className="icon_s"/></Link></li>
                           <li><Link to='/me'>Me <RiUserFill className="icon_s"/></Link></li>
                           <li><Link to='/create'>Create <IoIosCreate className="icon_s"/></Link></li>
                           <li><Link to='/my product'>Edit <RiEditBoxLine className="icon_s"/></Link></li>
                           <li><Link to='/favourite'>Favourites <FaStar className="icon_s"/></Link></li>
                           <li><Link to='/my review'>Reviews <MdRateReview className="icon_s"/></Link></li>
                           <li><Link to='/ticket/bin'> Ticket Bin <FaTrash className="icon_s"/></Link></li>
                           <li><Link to='/ticket/history'> Ticket History <RiFolderHistoryFill className="icon_s"/></Link></li>
                           <li><Link to='/' className="logout" onClick={() => logout()}> Logout <RiLogoutBoxRFill className="icon_s"/></Link></li>
                           </div>
                        </div>
                       </Fragment>
                        : ""}

                        {user.role === "admin" ? 
                        <Fragment>
                        <div className="following-content">
                            <li><Link to='/control-panel'>Control-Panel</Link></li>
                            {!length ? <li><Link to='/ticket/seller'>Seller(0) <SiCodechef className="icon_s"/></Link></li> : <li><Link to='/ticket/seller'>Seller({length.ticketsSeller.length}) <SiCodechef className="icon_s"/></Link></li> }
                            {!length ? <li><Link to='/ticket/buyer'>Buyer(0) <FaShoppingCart className="icon_s"/></Link></li> : <li><Link to='/ticket/buyer'>Buyer({length.ticketsBuyer.length}) <FaShoppingCart className="icon_s"/> </Link></li> }
                        </div>
                        <div className="dropdown">
                            <button className="dropbtn"><img className="avatar-img" src={user.avatar} alt="avatar"/></button>
                            <div className="dropdown-content">
                                <li><Link to='/me'>Me <RiUserFill className="icon_s"/></Link></li>
                                <li><Link to='/create'>Create <IoIosCreate className="icon_s"/></Link></li>
                                <li><Link to='/my product'>Edit <RiEditBoxLine className="icon_s"/></Link></li>
                                <li><Link to='/my review'>Reviews <MdRateReview className="icon_s"/></Link></li>
                                <li><Link to='/favourite'>Favourites <FaStar className="icon_s"/></Link></li>
                                <li><Link to='/following'>Follow <TiLocationArrow className="icon_s"/></Link></li>
                                <li><Link to='/latest'> Latest <AiFillShop className="icon_s"/></Link></li>
                                <li><Link to='/ticket/bin'> Ticket Bin <FaTrash className="icon_s"/></Link></li>
                                <li><Link to='/ticket/history'> Ticket History <RiFolderHistoryFill className="icon_s"/></Link></li>
                                <li><Link to='/' className="logout" onClick={e => logout()}> Logout <RiLogoutBoxRFill className="icon_s"/></Link></li>
                           </div>
                        </div>
                       </Fragment>
                        : ""}

                    </Fragment>
                    }
                </div>
                :
                <div className="guest_nav_login_signup">
                        <li><Link to='/signup seller'>Sign up</Link></li>
                        <li><Link to='/login'>Login</Link></li>
                </div>
                }
            </nav>

            <SearchBar />

        </Fragment>
    )
}

const mapStateToProps = state => ({
    auth: state.authReducers,
    ticket: state.ticketReducers,
    product: state.productReducers,
    user: state.userReducers
})

export default connect(mapStateToProps, {logout, getUserTicketLength})(Navbar)