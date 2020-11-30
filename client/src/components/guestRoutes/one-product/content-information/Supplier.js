import './Supplier.scss';
import React from 'react';

const Supplier = props => {
    return (
        <div className="supplier">
            <p>Trying to find a local supplier, bulk buying or in need to find reliable suppliers of the products you need?</p> <br/>
            <p>Seeing "Supplier" means these certain products are available for these request.</p> <br/>
            <p>Get in touch with the seller via the <props.Icon /> Business button, if it is there. Otherwise the supplier maybe doing buisness and has turned it off.</p>
        </div>
    )
}


export default Supplier
