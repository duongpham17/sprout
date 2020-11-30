const nodemailer = require('nodemailer');

/* HTML AREA******************************************/
const html_style = `
    <head>
        <style>
            div{
                text-align: center;
                min-height: 50rem;
            }
            p{
                margin-top: 1rem;
            }
            .reset{ 
                color: #4fd680;
                text-decoration: none;
                padding: 0.5rem 1rem; 
            }
            .reset:hover{
                color: white;
                background: black;
            }
            img{
                min-width:70px;
                max-width: 300px;
            }
            footer{
                position: absolute;
                padding: 0.1rem;
                font-size: 13px;
                background-color: #4fd680;
                bottom: 0
            }
        </style>
    </head>
`

const header = (link) =>{ return `
    <a href="${link}"><img src="https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Fgreys_logo.png?alt=media&token=18426f5c-485a-4a3a-aa4b-cf6cb6a0dc6e"/></a>
`}

const footer = `
    <footer>
        <p>Sprout 2020, was created by T.D.P in order to help the many, by building a free open food market based on trust. This website does not spam users with email unless they have requested an email to be sent to them. So please do not reply to any email you have clearly not sent. </p>
    </footer>
`

/* HTML AREA******************************************/


const emailInfo = () => nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    }
})

exports.sendForgotPasswordEmail = async options => {
    //1) create transporter
    const transporter = emailInfo()

    //2) Define The email options
    const mailOptions = {
        from: 'Sprout <sprout.real@hotmail.com>',
        to: options.email,
        subject: options.subject,
        html: `
        <html>
        ${html_style}
        <body>
            <div class="center">
                ${header(options.websiteLink)}
                <p><a class="reset" href="${options.url}">Click me to reset your password</a></p>
                <p>If you did not request a password reset or was sent this email from our servers, Please change your password.</p>
                ${footer}
            </div>
        </body>
        </html>
        `
    }
    //3) Send email
    await transporter.sendMail(mailOptions)
}

exports.contactMe = async options => {
    const transporter = emailInfo()

    const mailOptions = {
        from: 'Sprout <sprout.real@hotmail.com>',
        to: options.email,
        subject: options.subject,
        html: `
        <html>
        ${html_style}
        <body>
            <div class="center">
                ${header(options.websiteLink)}
                <p>${options.message}</p>
                ${footer}
            </div>
        </body>
        </html>
        `
    }
    await transporter.sendMail(mailOptions)
}
