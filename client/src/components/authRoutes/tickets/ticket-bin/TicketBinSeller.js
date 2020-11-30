import './TicketBin.scss';
import React, {useEffect, Fragment} from 'react';
import {getSellerTicketBin, deleteSellerTicketBin} from '../../../../actions/ticketActions';
import {connect} from 'react-redux';
import moment from 'moment'
import TicketLayoutStatus from '../TicketLayoutStatus';
import {setAlert} from '../../../../actions/alertActions';

const TicketBinBuyer = ({ticket:{sellerbin}, setAlert, getSellerTicketBin, deleteSellerTicketBin }) => {

    useEffect(() => {
        getSellerTicketBin()
    }, [getSellerTicketBin])

    return (
        <Fragment>
            {!sellerbin ? <div className="no_content">You have nothing inside the bin</div> : 
            <Fragment>
                <h1 className="bin-header">Seller's Bin ( {sellerbin.ticketsSeller.length} )</h1>
                <div className="bin-container">
                    {sellerbin.ticketsSeller.map((el, index) => 
                        <div className="status-card" key={index}>
                            <TicketLayoutStatus el={el} setAlert={setAlert} contactBuyer={"true"} paymentReceipt={"true"}/>

                            <div className="date-to-delete">
                            <p className="date"><span>Available To Delete On:</span> <br /> {moment(el.deleteDate).format("lll").split(" ").slice(0, 5).join(" ")} <br />
                                {Date.now() > (parseInt(Date.parse(el.deleteDate))) ? <button onClick={() => deleteSellerTicketBin(el._id)}>Delete</button> : ""}
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

export default connect(mapStateToProps, {deleteSellerTicketBin, setAlert, getSellerTicketBin})(TicketBinBuyer)
