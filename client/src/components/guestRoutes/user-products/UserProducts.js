import './UserProducts.scss';
import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {GiShop} from 'react-icons/gi';

import {getUserProducts} from '../../../actions/productActions';
import ProductLayout from '../../template/ProductLayout';
import Pagination from '../../template/Pagination';

const UserProducts = ({ getUserProducts, product:{userpost, length, loading}, match,}) => {

    return (
        <Fragment>
            <div className="user-shop-container">
                <h1><GiShop/> {match.params.id}</h1>
                <h1>Total Listing : {length}</h1>
            </div>

            <div className="user-shop-product-container">
            <ProductLayout posts={userpost} shop={"true"} loading={loading}/>
            </div>

            <Pagination route={"user-shop"} posts={userpost} getDataRequest={getUserProducts} limit={20} totalProducts={length} match={match.params.id}
                sort={"true"} noContent={"true"}
            />
        </Fragment>
    )
}

UserProducts.propTypes = {
    getUserProducts: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    product: state.productReducers,
})

export default connect(mapStateToProps, {getUserProducts})(UserProducts)
