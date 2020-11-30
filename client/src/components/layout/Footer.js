import './Layout.scss';
import{ImArrowUp} from 'react-icons/im';
import {Link} from 'react-router-dom';
import {AiOutlineCopyrightCircle} from 'react-icons/ai';
import React from 'react';

const Footer = () => {

    const onClick = () => {
        window.scroll({top: 0, behavior: "smooth"})
    }

    return (
        <footer className="footer_container">
            <div className="top">
                <button onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}><ImArrowUp/></button>
            </div>
            <div><AiOutlineCopyrightCircle/> 2020, Sprout </div>
            <li><button onClick={() => onClick()}><Link to="/terms">Terms & Conditions</Link></button></li>
            <li><button onClick={() => onClick()}><Link to="/privacy">Privacy</Link></button></li>
            <li><button onClick={() => onClick()}><Link to="/cookie">Cookies</Link></button></li>
            <li><button onClick={() => onClick()}><Link to="/about">About</Link></button></li>
            <li><button onClick={() => onClick()}><Link to="/donation">Donation</Link></button></li>
            <li><button onClick={() => onClick()}><Link to="/suggestion">Suggestion</Link></button></li>
            <li><button onClick={() => onClick()}><Link to="/contact">Contact Me</Link></button></li>
        </footer>
    )
}

export default Footer
