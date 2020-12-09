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
                        {!length ? "" : <li><Link to='/ticket/seller'><SiCodechef size="1.3rem"/> Seller({length.ticketsSeller.length})</Link></li> }
                        {!length ? "" : <li><Link to='/ticket/buyer'><FaShoppingCart size="1.3rem"/> Buyer({length.ticketsBuyer.length})</Link></li> }
                        <li><Link to='/latest'><AiFillShop size="1.3rem"/> Latest</Link></li>
                        </div>
                        <div className="dropdown">
                        <button className="dropbtn"><img className="avatar-img" src={user.avatar} alt="avatar"/></button>
                           <div className="dropdown-content">
                           <li><Link to='/following'>Follow <TiLocationArrow size="1.3rem"/></Link></li>
                           <li><Link to='/me'>Me <RiUserFill size="1.3rem"/></Link></li>
                           <li><Link to='/create'>Create <IoIosCreate size="1.3rem"/></Link></li>
                           <li><Link to='/my product'>Edit <RiEditBoxLine size="1.3rem"/></Link></li>
                           <li><Link to='/favourite'>Favourites <FaStar size="1.3rem"/></Link></li>
                           <li><Link to='/my review'>Reviews <MdRateReview size="1.3rem"/></Link></li>
                           <li><Link to='/ticket/bin'> Ticket Bin <FaTrash size="1.3rem"/></Link></li>
                           <li><Link to='/ticket/history'> Ticket History <RiFolderHistoryFill size="1.3rem"/></Link></li>
                           <li><Link to='/' className="logout" onClick={() => logout()}> Logout <RiLogoutBoxRFill size="1.3rem"/></Link></li>
                           </div>
                        </div>
                       </Fragment>
                        : ""}

                        {user.role === "admin" ? 
                        <Fragment>
                        <div className="following-content">
                            <li><Link to='/control-panel'>Control-Panel</Link></li>
                            {!length ? <li><Link to='/ticket/seller'>Seller(0) <SiCodechef size="1.3rem"/></Link></li> : <li><Link to='/ticket/seller'>Seller({length.ticketsSeller.length}) <SiCodechef size="1.3rem"/></Link></li> }
                            {!length ? <li><Link to='/ticket/buyer'>Buyer(0) <FaShoppingCart size="1.3rem"/></Link></li> : <li><Link to='/ticket/buyer'>Buyer({length.ticketsBuyer.length}) <FaShoppingCart size="1.3rem"/> </Link></li> }
                        </div>
                        <div className="dropdown">
                            <button className="dropbtn"><img className="avatar-img" src={user.avatar} alt="avatar"/></button>
                            <div className="dropdown-content">
                                <li><Link to='/me'>Me <RiUserFill size="1.3rem"/></Link></li>
                                <li><Link to='/create'>Create <IoIosCreate size="1.3rem"/></Link></li>
                                <li><Link to='/my product'>Edit <RiEditBoxLine size="1.3rem"/></Link></li>
                                <li><Link to='/my review'>Reviews <MdRateReview size="1.3rem"/></Link></li>
                                <li><Link to='/favourite'>Favourites <FaStar size="1.3rem"/></Link></li>
                                <li><Link to='/following'>Follow <TiLocationArrow size="1.3rem"/></Link></li>
                                <li><Link to='/latest'> Latest <AiFillShop size="1.3rem"/></Link></li>
                                <li><Link to='/ticket/bin'> Ticket Bin <FaTrash size="1.3rem"/></Link></li>
                                <li><Link to='/ticket/history'> Ticket History <RiFolderHistoryFill size="1.3rem"/></Link></li>
                                <li><Link to='/' className="logout" onClick={e => logout()}> Logout <RiLogoutBoxRFill size="1.3rem"/></Link></li>
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