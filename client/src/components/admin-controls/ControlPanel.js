import './ControlPanel.scss';
import React,{useState} from 'react';
import {connect} from 'react-redux';

import {getReportedProducts} from '../../actions/adminAction';

import GetUser from './GetUser';
import GetProduct from './GetProduct';
import GetUserProducts from './GetUserProducts';
import CreateUser from './CreateUser';
import GetTicket from './GetTicket';

import GetSuggestion from './GetSuggestion';
import GetReports from './GetReports';

const ControlPanel = () => {

    const [select, setSelect] = useState("none")

    return (
        <div className="control-container">
            <div className="control-panel">

                <div className="controls">
                <li><button onClick={() => setSelect("create-user")}>Create User</button></li>
                <li><button onClick={() => setSelect("get-ticket")}>Find Ticket</button></li>
                <li><button onClick={() => setSelect("get-user")}>Find User</button></li>
                <li><button onClick={() => setSelect("get-product")}>Find Product </button></li>
                <li><button onClick={() => setSelect("delete-user")}>Delete User</button></li>
                </div>

                <div className="data">

                {select === "get-ticket" ? 
                    <GetTicket />
                : ""}
                
                {select === "create-user" ? 
                    <CreateUser />
                : ""}

                {select === "get-user" ? 
                    <GetUser />
                : ""}

                {select === "get-product" ? 
                    <GetProduct/>
                : ""}

                {select === "delete-user" ? 
                    <GetUserProducts />
                : ""}
                </div>

            </div>

            <div className="second-controlpanel">
                <div className="suggestion-area">
                    <GetSuggestion/>
                </div>

                <div className="reported-area">
                    <GetReports/>
                </div>
            </div>

        </div>
    )
}

const mapStateToProps = state => ({
    admin: state.adminReducers
})

export default connect(mapStateToProps, { getReportedProducts})(ControlPanel)
