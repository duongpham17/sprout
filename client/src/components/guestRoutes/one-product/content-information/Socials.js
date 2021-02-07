import './Socials.scss';
import React from 'react';

const Socials = props => {
    return (
    <div className="social-icons-product">
        {props.post.user.social.length === 0 ? "None" : props.post.user.social.map((el, index) => 
            <div className="social-map" key={index}>
                {el.app.split(" ")[0] === "youtube" ? <li><a href={el.app.split(" ")[1]} target="_blank" rel="noopener noreferrer" ><img src="https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/sprout%2Fyoutube.png?alt=media&token=073226f1-377f-44a2-9c90-57fdaee7e4b8" alt="social"/></a></li> : ""}
                {el.app.split(" ")[0] === "twitter" ? <li><a href={el.app.split(" ")[1]} target="_blank" rel="noopener noreferrer"><img src="https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/sprout%2Ftwitter.png?alt=media&token=87bc4deb-2b7b-4136-9b6e-b5bc25e30fa5" alt="social"/></a></li> : ""}
                {el.app.split(" ")[0] === "pinterest" ? <li><a href={el.app.split(" ")[1]} target="_blank" rel="noopener noreferrer" ><img src="https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/sprout%2Fpinterest.png?alt=media&token=a2ad6164-c362-4ac1-8b76-87f9ebb0c34a" alt="social"/></a></li> : ""}
                {el.app.split(" ")[0] === "facebook" ? <li><a href={el.app.split(" ")[1]} target="_blank" rel="noopener noreferrer"><img src="https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/sprout%2Ffacebook.png?alt=media&token=e29287e5-b6c6-48ab-9094-18827ac89a30" alt="social"/></a></li> : ""}
                {el.app.split(" ")[0] === "instagram" ? <li><a href={el.app.split(" ")[1]} target="_blank" rel="noopener noreferrer"><img src="https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/sprout%2Finstagram.png?alt=media&token=4792f0c3-bfe8-40c5-92b4-44cbaacd0814" alt="social"/></a></li> : ""}
                {el.app.split(" ")[0] === "etsy" ? <li><a href={el.app.split(" ")[1]} target="_blank" rel="noopener noreferrer"><img src="https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/sprout%2Fetsy.png?alt=media&token=08e850f4-d033-462d-bb17-13f008ddaefd" alt="social"/></a></li> : ""}
                {el.app.split(" ")[0] === "mywebsite" ? <li><a href={el.app.split(" ")[1]} target="_blank" rel="noopener noreferrer"><img src="https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/sprout%2Fmywebsite.png?alt=media&token=33b51bb7-6230-4322-a3ec-6ea0415777df" alt="social"/></a></li> : ""}
            </div>
        )}
    </div>
    )
}


export default Socials
