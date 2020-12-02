const nodemailer = require('nodemailer');

const dotenv = require('dotenv')
dotenv.config({ path: "./config.env" });

const websiteLink = process.env.NODE_ENV === "development" ? process.env.FRONTEND_PORT : process.env.WEBSITE_URL 

/* HTML AREA******************************************/
const html_style = `
    <head>
        <style>
            table{
                margin: auto;
                max-width: 600px;
                min-height: 200px;
            }
            .main-image{
                width: 230px;
                height: 100px;
                object-fit: cover;
            }
            .main-image:hover{
                opacity: 0.8;
            }
            td{
                padding: 1rem 0.5rem;
            }
            .header{
                text-align: center;
            }
            .footer td{
                border-top: 4px solid #4fd680
            }
            .message td{
                padding-bottom: 15rem
            }
            .links a {
                text-decoration: none;
                color: black
            }
            .links a:hover {
                color: #4fd680
            }
        </style>
    </head>
`

const html_body = (message, link2, message2) => { return `
<body>
    <table>
        <tr class="header">
            <td><a href="${websiteLink}"><img class="main-image" src="https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Fgreys_logo.png?alt=media&token=18426f5c-485a-4a3a-aa4b-cf6cb6a0dc6e"/></a></td>
        </tr>
        <tr class="links">
            <td>
                <a href=${link2}>${message2}</a>
            </td>
        </tr>
        <tr class="message">
            <td>${message}</td>
        </tr>
        <tr><td></td></tr>
        <tr class="footer">
            <td>
            	&#169; Sprout 2020. The open food market. This website does not send users email unless they have requested an email to be sent to them. So please do not reply to any email you have not requested.
            </td>
        </tr>
    </table>
</body>
`}


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
                ${html_body("", options.url, "Click me to reset your password")}
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
                ${html_body(options.message, "", "")}
            </html>
        `
    }
    await transporter.sendMail(mailOptions)
}
