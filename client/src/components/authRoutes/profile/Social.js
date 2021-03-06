
import './Social.scss';
import React, { Fragment, useState} from 'react';
import {connect} from 'react-redux';
import {addSocial, deleteSocial} from '../../../actions/userActions';
import {IoMdAddCircleOutline} from 'react-icons/io';

const Social =({user:{user, loading}, addSocial, deleteSocial}) => {

    const [open, setOpen] = useState(false)

    const [click, setClick] = useState(false)

    const [formData, setFormData] = useState({
        app: '',
    })
    const [socialUrl, setSocialUrl] = useState("")

    const {app} = formData;

    const addSocialApp = (e) => {
        e.preventDefault()
        if(socialUrl === "instagram") {
            addSocial(`${socialUrl} https://www.instagram.com/${app}`) 
            setClick(true)
        } 
        else if (socialUrl === "twitter") {
            addSocial(`${socialUrl} https://www.twitter.com/${app}`) 
            setClick(true)
        }
        else {
            addSocial(socialUrl+" "+app)
            setClick(true)
        }
    }

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const settingSocial = (social) => {
        setSocialUrl(social)
        setClick(false)
    }

    console.log(formData)

    return (
        <Fragment>
            <div className="social-links">
                <button className={open ? "open" : ""} onClick={() => setOpen(!open)}><IoMdAddCircleOutline/> Add Social Links</button>
            </div>

            {open ?
            <Fragment>
            <div className="social-container">
            <div className="social">
                <button className={socialUrl === "facebook" ? "facebook"  : ""} onClick={() => settingSocial("facebook") }> +Facebook  </button>
                <button className={socialUrl === "youtube"  ? "youtube"   : ""} onClick={() => settingSocial("youtube")  }> +Youtube   </button>
                <button className={socialUrl === "twitter"  ? "twitter"   : ""} onClick={() => settingSocial("twitter")  }> +Twitter   </button>
                <button className={socialUrl === "instagram"? "instagram" : ""} onClick={() => settingSocial("instagram")}> +Instagram </button>
                <button className={socialUrl === "pinterest"? "pinterest" : ""} onClick={() => settingSocial("pinterest")}> +Pinterest </button>
                <button className={socialUrl === "etsy"     ? "etsy"      : ""} onClick={() => settingSocial("etsy")     }> +Etsy      </button>
                <button className={socialUrl === "mywebsite"? "mywebsite" : ""} onClick={() => settingSocial("mywebsite")}> +MyWebsite </button>
            </div>

            {click === true ? "" : 
            <div className="social_form_container">
                <form className="social_form" onSubmit={e => addSocialApp(e)}>

                {socialUrl === "youtube" ? 
                    <input type="text" placeholder="Enter Your Youtube URL" name="app" value={app} onChange={e => onChange(e) } required />
                : "" }

                {socialUrl === "twitter" ? 
                    <input type="text" placeholder="Enter Your Twitter Username" name="app" value={app} onChange={e => onChange(e)} required  />
                : "" }

                {socialUrl === "facebook" ? 
                    <input type="text" placeholder="Enter Your Facebook URL" name="app" value={app} onChange={e => onChange(e)} required />
                : "" }

                {socialUrl === "instagram" ? 
                    <input type="text" placeholder="Enter Your Instagram Username" name="app" value={app} onChange={e => onChange(e)} required />
                : "" }

                {socialUrl === "pinterest" ? 
                    <input type="text" placeholder="Enter Your Pinterest URL" name="app" value={app} onChange={e => onChange(e)} required />
                : "" }

                {socialUrl === "etsy" ? 
                    <input type="text" placeholder="Enter Your Etsy URL" name="app" value={app} onChange={e => onChange(e)} required />
                : "" }

                {socialUrl === "mywebsite" ? 
                    <input type="text" placeholder="Enter Your Website URL" name="app" value={app} onChange={e => onChange(e)} required  />
                : "" }

                <div className="social-btn">
                {socialUrl === "youtube" || socialUrl === "twitter" || socialUrl === "facebook" || socialUrl === "instagram" || socialUrl === "pinterest" || socialUrl === "mywebsite" || socialUrl === "etsy" ? 
                <input type="submit" value={loading ? 'loading...' : 'Add'}/>
                : "" }
                </div>
            </form>
            </div>
            }
            
            <Fragment>
                {!user ?  <div className="_center">Loading...</div> : 
                <div className="social-icons-container">
                    {user.social.map((el, index) => <div className="social-map" key={index}>
                    {el.app.split(" ")[0] === "youtube" ? <li><a href={el.app.split(" ")[1]} target="_blank" rel="noopener noreferrer" ><img src="https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/sprout%2Fyoutube.png?alt=media&token=073226f1-377f-44a2-9c90-57fdaee7e4b8" alt="social"/></a></li> : ""}
                    {el.app.split(" ")[0] === "twitter" ? <li><a href={el.app.split(" ")[1]} target="_blank" rel="noopener noreferrer"><img src="https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/sprout%2Ftwitter.png?alt=media&token=87bc4deb-2b7b-4136-9b6e-b5bc25e30fa5" alt="social"/></a></li> : ""}
                    {el.app.split(" ")[0] === "pinterest" ? <li><a href={el.app.split(" ")[1]} target="_blank" rel="noopener noreferrer" ><img src="https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/sprout%2Fpinterest.png?alt=media&token=a2ad6164-c362-4ac1-8b76-87f9ebb0c34a" alt="social"/></a></li> : ""}
                    {el.app.split(" ")[0] === "facebook" ? <li><a href={el.app.split(" ")[1]} target="_blank" rel="noopener noreferrer"><img src="https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/sprout%2Ffacebook.png?alt=media&token=e29287e5-b6c6-48ab-9094-18827ac89a30" alt="social"/></a></li> : ""}
                    {el.app.split(" ")[0] === "instagram" ? <li><a href={el.app.split(" ")[1]} target="_blank" rel="noopener noreferrer"><img src="https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/sprout%2Finstagram.png?alt=media&token=4792f0c3-bfe8-40c5-92b4-44cbaacd0814" alt="social"/></a></li> : ""}
                    {el.app.split(" ")[0] === "etsy" ? <li><a href={el.app.split(" ")[1]} target="_blank" rel="noopener noreferrer"><img src="https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/sprout%2Fetsy.png?alt=media&token=08e850f4-d033-462d-bb17-13f008ddaefd" alt="social"/></a></li> : ""}
                    {el.app.split(" ")[0] === "mywebsite" ? <li><a href={el.app.split(" ")[1]} target="_blank" rel="noopener noreferrer"><img src="https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/sprout%2Fmywebsite.png?alt=media&token=33b51bb7-6230-4322-a3ec-6ea0415777df" alt="social"/></a></li> : ""}
                    <button className={`${click ? "not-hidden" : "hidden" }`} onClick={() => deleteSocial(el._id)}>Delete</button>
                    </div>
                )}
                    {user.social.length === 0 ? "" : 
                    <div className="edit-social-btn">
                        <button className={`${click ? "open" : "closed" }`} onClick={() => setClick(!click)}>Delete Social Links</button>
                    </div>
                    }
                </div>
                }
            </Fragment>

            </div>
            </Fragment> 
        : ""}

        </Fragment>
    )
}

const mapStateToProps = state => ({
    user: state.userReducers
})

export default connect(mapStateToProps, {addSocial, deleteSocial})(Social)
