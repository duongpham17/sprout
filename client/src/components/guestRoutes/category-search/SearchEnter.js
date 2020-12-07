import React, {Fragment} from 'react';
import {searchBarEnter} from '../../../actions/productActions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import ProductLayout from '../../template/ProductLayout';
import SortAndPagination from './SortAndPagination';

const SearchEnter = ({searchBarEnter, location, product: {posts, loading}, auth:{user}}) => {

    return (
    <Fragment>

    <ProductLayout posts={posts} loading={loading} title={location.pathname.slice(7, 1000).toUpperCase()} admin={user.role === "admin" ? "true" : "false"} />

    <SortAndPagination 
    posts={posts} getDataRequest={searchBarEnter} limit={10} path={location.pathname.slice(7, 1000)} 
    sort={"true"} region={"true"} noContent={"true"}
    />
    
    </Fragment>
    )
}

SearchEnter.propTypes = {
    product: PropTypes.object.isRequired,
    searchBarEnter: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    product: state.productReducers,
    auth: state.authReducers
})

export default connect(mapStateToProps, {searchBarEnter})(SearchEnter)
