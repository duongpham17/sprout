import React, {Fragment} from 'react';
import {filterAndCategory} from '../../../actions/productActions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ProductLayout from '../../template/ProductLayout';
import SortAndPagination from './SortAndPagination';

//NOTE IF YOU CHANGE THE APP path=name make sure ot change lcoation.pathname.slice(10, 1000). This will find the item name

const Category = ({filterAndCategory, location, product: {posts, loading}, auth:{user} }) => {

    return (
    <Fragment>

    <ProductLayout posts={posts} loading={loading} title={location.pathname.slice(10, 1000).toUpperCase()} admin={user.role === "admin" ? "true" : "false"} />

    <SortAndPagination 
    posts={posts} getDataRequest={filterAndCategory} limit={10} path={location.pathname.slice(10, 1000)} 
    sort={"true"} region={"true"} noContent={"true"}
    />

    </Fragment>
    )
}

Category.propTypes = {
    filterAndCategory: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    product: state.productReducers,
    auth: state.authReducers
})

export default connect(mapStateToProps, {filterAndCategory})(Category)
