import React, {Fragment} from 'react';
import {searchBarClick} from '../../../actions/productActions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import ProductLayout from '../../template/ProductLayout';
import SortAndPagination from './SortAndPagination';

//NOTE IF YOU CHANGE THE APP path=name make sure ot change lcoation.pathname.slice(10, 1000). This will find the item name

const SearchBar = ({searchBarClick, location, product: {posts}, auth:{user} }) => {

    return (
    <Fragment>

    <ProductLayout posts={posts} title={location.pathname.slice(8, 1000).toUpperCase()} admin={user.role === "admin" ? "true" : "false"} />

    <SortAndPagination 
    posts={posts} getDataRequest={searchBarClick} limit={10} path={location.pathname.slice(8, 1000)} 
    sort={"true"} region={"true"} noContent={"true"}
    />
    
    </Fragment>
    )
}

SearchBar.propTypes = {
    product: PropTypes.object.isRequired,
    searchBarClick: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    product: state.productReducers,
    auth: state.authReducers
})

export default connect(mapStateToProps, {searchBarClick})(SearchBar)
