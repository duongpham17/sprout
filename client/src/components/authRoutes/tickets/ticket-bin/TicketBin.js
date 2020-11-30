import React from 'react';
import {MdDelete} from 'react-icons/md';
import {Link} from 'react-router-dom';

const TicketBin = props => {
    return (
        <div className="select-bin">
            <div className="buyer-bin">
                <Link to="/buyerbin"> Buyer's Ticket Bin <br/> <MdDelete size="4rem" /></Link>
            </div>

            <div className="select-bin">
                <Link to="/sellerbin">Seller's Ticket Bin <br/> <MdDelete size="4rem" /></Link>
            </div>
        </div>
    )
}

export default TicketBin
