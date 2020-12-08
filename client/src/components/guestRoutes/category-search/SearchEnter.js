import React, {Fragment} from 'react';
import {searchBarEnter} from '../../../actions/productActions';
import {connect} from 'react-redux';
import ProductLayout from '../../template/ProductLayout';
import Pagination from '../../template/Pagination';

//NOTE IF YOU CHANGE THE APP path=name make sure ot change lcoation.pathname.slice(10, 1000). This will find the item name

const SearchEnter = ({searchBarEnter, location, product: {posts, length, loading}, auth:{user}}) => {

    return (
    <Fragment>

    <ProductLayout posts={posts} loading={loading} title={location.pathname.slice(7, 1000).toUpperCase()} admin={user.role === "admin" ? "true" : "false"} />

    <Pagination route={"category"} posts={posts} getDataRequest={searchBarEnter} limit={10} path={location.pathname.slice(7, 1000)} totalProducts={length}
    sort={"true"} region={"true"} noContent={"true"} />
    
    </Fragment>
    )
}

const mapStateToProps = state => ({
    product: state.productReducers,
    auth: state.authReducers
})

export default connect(mapStateToProps, {searchBarEnter})(SearchEnter)
