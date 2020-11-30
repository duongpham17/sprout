import React from 'react'

const PrivacyPolicy = props => {
    return (
        <div className="aboutWebsite">
            <h1>Privacy Policy </h1>
            <li><p>
            On sign up you must provide a valid email and a secure password that only you know of. 
            This information is extremely important for your own security. 
            The website And myself will never have access to your account without your permission. 
            The password is encrypted so no one knows, even if a hacker tries hacking the database.
            <br/> <br/>
            The database used for this website is MongoDB. The technology used in this website is MongoDB, Express, React, Node.js.
            <br/> <br/>
            The email you provide will be used to verify you and getting in contact with other users. 
            Also the email will not be sent from this website. It will be sent on your own terms and means via a third party E.g gmail, icloud etc...
            <br/> <br/>
            This website uses cookies to keep users logged in. This cookie will expire after 7 days where you must log in again to get a new cookie. 
            This cookie does not store any information that is important. The cookie expire date may change in the future.
            It’s main purpose is to just keep you log in so you don't have to log in every time you close or refresh the website.
            <br/> <br/>
            The Local Storage of your Browser is used to store data that is used for sorting and region. 
            E.g region selecting London will result in seeing London products. 
            This data that is stored inside your Browser does not track your location. 
            Its main purpose is to allow you to navigate to different regions within the UK and check out products from other regions, 
            there are 9 regions which includes London, South-West, South-East, East-of-England, North-West, North-East, West-Midlands, East-Midlands, Yorkshire and the Humber. 
            There are other data that is stored in the Browser Local Storage for sorting. E.g high-to-low, low-to-high etc... 
            These data stored in the Local Storage can be deleted anytime by navigating to your browser setting / history. 
            These data that is stored has no real importance its sole purpose is to let you sort through products for a better experience.
            <br/> <br/>
            The address you provide will be used within checkout section and for scam scenario.
            For Seller the business address can be toggled on and off in the case they want to show it on the product page. Buyer can add address for quicker checkout, 
            these address is saved within the user data and can be deleted at any given time and will not be used any where else apart from checkout.
            <br/> <br/>
            Seller’s Payment options information is only used for checkout. 
            This is used at stage “2/4” when buyers can pick what they want to pay the seller with. 
            This information will then be saved from this stage onward to ensure there is no scamming between seller and buyer. 
            E.g if the seller decides to change the payment option to mislead or scam the buyer. 
            The payment options that the buyer sent to will be saved. The payment information seller’s can or not provide is all deposit so the biggest issue will be users depositing money and NOT withdrawing. 
            Buyers must make their own payment through third parties E.g Paypal and online banking. There is no payment processing on this website.
            <br/> <br/>
            Users full name will only be shown where necessary, otherwise the shop name will be the users identity.
            <br/> <br/> 
            The content you create through creating a product and its information you provide will not be used, sold or saved. you can always delete these information or content whenever you want to.
            <br/> <br/> 
            Every user has a good and bad score system, used to rank users trust. Data like Rating and Reviews to allow buyers to write reviews and let other memebers know the trust worthiness of the seller.
            </p></li>

            <h1>Updates On Privacy Policy</h1>
            <li><p>
            The future might require more data to improve user experience, any important data regarding the user information will be updated below here before being added to the above.
            </p></li>
        </div>
    )
}



export default PrivacyPolicy

