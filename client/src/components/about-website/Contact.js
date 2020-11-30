import './Contact.scss';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {contactMe} from '../../actions/userActions';

const Contact = ({contactMe}) => {

    const [sent, setSent] = useState(false)

    const [data, setData] = useState({
        message: "",
        email: "",
        subject : "",
    })
    const {message, email, subject} = data

    const onChange = (e) => setData({...data, [e.target.name] : e.target.value})

    const onSubmit = (e) => {
        e.preventDefault()
        contactMe(data)
        setSent(true)
    }

    return (
        <div className="contact-information">
            {sent === false ? 
            <div>
                <h1>Feel free to contact me if you have any questions.</h1>
                <form onSubmit={e => onSubmit(e)}>
                    <input minLength="5" maxLength="75" type="email" placeholder="Enter Your Email" name="email" value={email} onChange={e => onChange(e)} required/> <br/>
                    <input minLength="5" maxLength="30" type="text" placeholder="Subject" name="subject" value={subject} onChange={e => onChange(e)} required/> <br/>
                    <textarea minLength="20" maxLength="500" type="text" placeholder="Enter Your Message * max length 500 *" name="message" value={message} onChange={e => onChange(e)} required/><br/>

                    <button>Send Message</button>
                </form>
            </div>
            : 
            <div>
                <h2>Thank You. Please give me 3-5 workings days to reply.</h2><br/>
            </div>
            }
        </div>
    )
}

export default connect(null, {contactMe})(Contact)
