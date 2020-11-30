import './Suggestion.scss';
import React, {Fragment, useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {suggestion} from '../../actions/userActions';
import {AiFillHome} from 'react-icons/ai';

const Suggestion = ({suggestion}) => {
    const [data, setData] = useState({
        message: ""
    })

    const [sent, setSent] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        suggestion(data)
        setSent(true)
    }

    return (
        <div className="suggestion-container">
            {sent ? 
            <div className="sent">
                <h1>Thank You.</h1>
                <br/>
                <Link to="/"><AiFillHome size="2rem"/> Back To Home</Link>
            </div>
            :
            <Fragment>
            <h2>If i have left out any category or you want a certain feature. Please feel free to send me a message down below and maybe it will be added!</h2>
            <form onSubmit={(e) => onSubmit(e)}>
                <textarea placeholder="Enter your request" type="text" maxLength="300" onChange={e => setData({message: e.target.value})} /><br/>
                <button>Send</button>
            </form>
            </Fragment>
            }

        </div>
    )
}


export default connect(null, {suggestion})(Suggestion)
