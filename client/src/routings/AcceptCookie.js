import './AcceptCookie.scss';
import React, {useState, Fragment} from 'react';
import {BiCookie} from 'react-icons/bi';
import {Link} from 'react-router-dom';

const AcceptTerms = props => {

    const [terms, setTerms] = useState(!localStorage.getItem("terms") ? false : true)

    const accept = (e) => {
        e.preventDefault()
        localStorage.setItem("terms", true)
        setTerms(true)
    }

    return (
        <Fragment>
        {terms === true ? "" : 
        <div className="accept-terms">
            <div className="-terms">
            <h2><BiCookie size="1.5rem"/> We use Cookies!</h2>
            <p>Cookies help to run our services and to better your experience. For more information about the cookie read our <Link to="/cookie">Cookie Policy</Link> </p>
            <p>If your happy with this... </p>
            <button onClick={(e) => accept(e)}>I Accept</button>
            </div>
        </div>
        }
        </Fragment>
    )
}

export default AcceptTerms
