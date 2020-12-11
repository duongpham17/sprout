import './GetReports.scss';
import React, {useState} from 'react';
import { connect } from 'react-redux';
import {getReportedProducts} from '../../actions/adminAction';
import {MdContentCopy} from 'react-icons/md';

const GetReports = ({getReportedProducts, admin:{report}}) => {

    const [num, setNum] = useState(10)

    const copy = (data) => {    
        navigator.clipboard.writeText(data)
    }

    const calcDays = (created) => {
        const date = Date.now() - Date.parse(created) 
        const days = date / (24 * 60 * 60 * 1000)
        return days.toFixed(1)
    }

    return (
        <div className="reported">
            <div className="fetch">
            <button className="report-btn" onClick={() => getReportedProducts(num)}><h1>Fetch Reported</h1></button>
            <input className="num" type="number" placeholder="Amount" onChange={e => setNum(e.target.value)} />
            </div>
            {!report ? "" : report.map((el, index) => 
                <div className="-reports" key={index}>
                    <li>Reported: <span>{el.reported}</span></li>
                    <li>Days Since Creation: <span>{calcDays(el.createdAt)}</span></li>
                    <li><button onClick={() => copy(el.user)}><MdContentCopy/> User ID: {el.user}</button></li>
                    <li><button onClick={() => copy(el._id)}><MdContentCopy/> Product ID: {el._id}</button></li>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = state => ({
    admin: state.adminReducers
})

export default connect(mapStateToProps, {getReportedProducts})(GetReports)
