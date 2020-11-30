import React from 'react'

const Cookie = props => {
    return (
        <div className="aboutWebsite">
            <h1>What is this Cookie?</h1>
            <li><p>
            Each user that logs in will get a cookie, this cookie will be encoded or given a JSON Web Token also known as JWT, which has many letters and numbers unique to every user. 
            <br/>
            The use for this JWT is everytime you log in, this cookie will give you a secret code which only you can use to remain logged in and access secret / private routes, which is
            exclusive to logged in users only. This cookie can be deleted by simply logging out and the browser will eat this cookie. If you want another cookie, simply just log in.
            </p></li>

            <h1>Cookie</h1>
            <li><p>
            This website uses cookies to keep users logged in. This cookie will expire after 7 days where you must log in again to get a new cookie. 
            This cookie does not store any information that is important. The cookie expire date may change in the future.
            It’s main purpose is to just keep you log in so you don't have to log in every time you close or refresh the website.
            </p></li>

            <h1>Future Development / Update </h1>
            <li><p>
            The future is unpredictable. Therefore, this page will help you keep up to date with the latest implementation that has been added to the cookie.
            <br/>
            Any updates will be listed below before being added to the above, this is for clarity on why we implemented the cookie.
            </p></li>

        </div>
    )
}


export default Cookie
