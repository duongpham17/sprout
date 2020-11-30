import React from 'react'
import {setAlert} from '../../actions/alertActions';
import {connect} from 'react-redux';
import {MdContentCopy} from 'react-icons/md';

const Donation = ({setAlert}) => {

    const copy = (data) => {    
        navigator.clipboard.writeText(data)
        setAlert("Copied!", 'primary')
    }

    return (
        <div className="Donation">
            <h2>Hello. If you are enjoying the service. Feel free to donate entirely up to you :D</h2> <br/>
            <h2>Want to donate with card? Please go and buy random stuff from sellers :D</h2> <br/>

            <h2>You can donate to my Bitcoin Address</h2><br/>
            <button className="copy-btn bitcoin" onClick={() => copy("35wRXucGPAFhubCqJHzJu7SJ82YDR4kF7U")}><MdContentCopy/> 35wRXucGPAFhubCqJHzJu7SJ82YDR4kF7U</button><br/>
            <img alt="" className="donation-qr"src="https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Fbitocin.png?alt=media&token=53f49c82-a6b5-4920-9367-cd627f5d3f29" />
            <br/><br/>
            <h2>Or</h2>
            <br/><br/>
            <h2>You can donate to my Cardano Address</h2><br/>
            <button className="copy-btn cardano" onClick={() => copy("addr1qxp6mvccjlvjeynny33429mrneykkycqg4avjmp8e2ss8ug36pe9jq3dczj8jaucdrtwpv7p5ye59gsk6v0kmdpm0zwqhvjm95")}><MdContentCopy/> addr1qxp6mvccjlvjeynny33429mrneykkycqg4avjmp8e2ss8ug36pe9jq3dczj8jaucdrtwpv7p5ye59gsk6v0kmdpm0zwqhvjm95</button><br/>
            <img alt="" className="donation-qr" src="https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Fcardano.png?alt=media&token=b8fcb5f2-952a-4f52-afe3-68e0d1c4cf64" />
        </div>
    )
}


export default connect(null, {setAlert})(Donation)

