import React from 'react';
import {Link} from 'react-router-dom';
import {AiFillHome} from 'react-icons/ai'
import './NotFound.scss';

const NotFound = props => {
    return (
        <section className="no_context">
            <div className="no_content">
                <Link to='/'>Page does not exist. Please return to <AiFillHome/> Home page</Link>
            </div>
        </section>
    )
}
export default NotFound
