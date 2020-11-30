import './TicketBin.scss';
import React, {useEffect, Fragment} from 'react';
import {getBuyerTicketBin, deleteBuyerTicketBin} from '../../../../actions/ticketActions';
import {connect} from 'react-redux';
import moment from 'moment'
import TicketLayoutStatus from '../TicketLayoutStatus';
import {setAlert} from '../../../../actions/alertActions';

const TicketBinBuyer = ({ticket:{buyerbin}, setAlert, getBuyerTicketBin, deleteBuyerTicketBin }) => {

    useEffect(() => {
        getBuyerTicketBin()
    }, [getBuyerTicketBin])

    return (
        <Fragment>
            {!buyerbin ? <div className="no_content">You have nothing inside the bin</div> : 
            <Fragment>
                <h1 className="bin-header">Buyer's Bin ( {buyerbin.ticketsBuyer.length} )</h1>
                <div className="bin-container">
                    {buyerbin.ticketsBuyer.map((el, index) => 
                        <div className="status-card" key={index}>
                            <TicketLayoutStatus el={el} setAlert={setAlert} contactSeller={"true"} paymentReceipt={"true"}/>
                            
                            <div className="date-to-delete">
                            <p className="date"><span>Available To Delete On:</span> <br/> {moment(el.deleteDate).format("lll").split(" ").slice(0, 5).join(" ")} <br/>
                                {Date.now() > (parseInt(Date.parse(el.deleteDate))) ? <button onClick={() => deleteBuyerTicketBin(el._id)}>Delete</button> : ""}
                            </p>
                            </div>  
                        </div>
                    )}
                </div>
            </Fragment> 
            }
        </Fragment>
    )
}

const mapStateToProps = state => ({
    ticket: state.ticketReducers
})

export default connect(mapStateToProps, {deleteBuyerTicketBin, setAlert, getBuyerTicketBin})(TicketBinBuyer)

/*
return (
    <Fragment>
        {!buyerbin ? <div className="no_content">You have nothing inside the bin</div> : 
        <Fragment>
            <h1 className="bin-header">Buyer's Bin ( {buyerbin.ticketsBuyer.length} )</h1>
            <div className="bin-container">
                {buyerbin.ticketsBuyer.map((el, index) => 
                    <div className="bin-card" key={index}>
                        <p>{moment(el.createdAt).format("lll").split(" ").slice(0, 5).join(" ")}</p>
                        <p><span>Ticket ID:</span> {el._id}</p>
                        <p><span>Seller ID:</span> {el.seller}</p>
                        <p><span>Price:</span> £{el.price}</p>
                        <p><span>Quantity:</span> {el.quantity}</p>
                        <p><span>Total Price:</span> £{el.quantity * el.price}</p>
                        <p className="bin-description"><span>Description:</span> {el.description}</p>
                        <p className="date"><span>Available To Delete On:</span> <br /> {moment(el.deleteDate).format("lll").split(" ").slice(0, 5).join(" ")} <br />
                            {Date.now() < (parseInt(Date.parse(el.deleteDate))) ? "" : <button onClick={() => deleteBuyerTicketBin(el._id)}>Delete</button>}
                        </p>
                    </div>
                )}
            </div>
        </Fragment> 
        }
    </Fragment>
    )
*/