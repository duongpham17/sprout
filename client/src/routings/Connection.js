import './NotFound.scss';
import React, {Fragment} from 'react';
import {RiWifiOffLine} from 'react-icons/ri';

const Connection = props => {

    const online = window.navigator.onLine

    return (
        <Fragment>
            {online === false ? 
            <div className="Offline">
                <h2>No Internet Connection. Please Check Your Internet. <br/><RiWifiOffLine size="2.5rem"/></h2>
            </div>
            : ""}
        </Fragment>
    )
}

export default Connection
