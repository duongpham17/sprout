import './GetTicket.scss';
import React, {useState, Fragment} from 'react';
import {connect} from 'react-redux';
import {getTicket, updateTicket} from '../../actions/adminAction';
import moment from 'moment';

const GetTicket = ({admin:{ticket}, updateTicket, getTicket}) => {

    const [ticketId, setTicketId] = useState(!ticket ? "" : ticket._id)

    const [extendDate, setExtendDate] = useState()

    //5fbaceafbd3d730d75e02a2b
    
    return (
        <Fragment>
        <div className="get-information">
            <button onClick={() => getTicket(ticketId)}>Request With Ticket ID</button>
            <input placeholder="Enter Ticket ID" type="text" value={ticketId} onChange={(e) => setTicketId(e.target.value) } />
        </div>

        <div className="ticket-information">
            { !ticket ? <div>Empty</div> : 
            <Fragment>
                <div className="can-change">
                    <small>Delete Date once it enters the Bin, currently {moment(ticket.deleteDate).format("lll").split(" ").slice(0, 3).join(" ")}</small>
                    <input type="text" placeholder="Enter amount E.g 30 = 30 days" onChange={e => setExtendDate(e.target.value) } />
                    <button onClick={() => updateTicket(ticket._id, (extendDate * 24 * 60 * 60 * 1000))}>Extend</button>
                </div>

                <div className="cannot-change">
                    <li className="gap">Status: {ticket.status}</li>
                    
                    <li className="gap">Delivery Method: {ticket.delivery}</li>

                    <li className="gap">Quantity: <span className="quantity">{ticket.quantity}</span></li>
                    <li>Price: <span className="price">£{ticket.price}</span></li>
                    <li>Delivery Cost: <span className="delivery">{ticket.deliveryCost === 0 ? "FREE" : `£${ticket.deliveryCost}`}</span> </li>
                    <li>Total: <span className="total">£{(ticket.price * ticket.quantity) + ticket.deliveryCost}</span> </li>

                    <li className="gap">Description: {ticket.description}</li>
                </div>
            </Fragment>
            }
        </div>
        </Fragment>
    )

}

const mapStateToProps = state => ({
    admin: state.adminReducers
})
export default connect(mapStateToProps, {updateTicket, getTicket} )(GetTicket)
