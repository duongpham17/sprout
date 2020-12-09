import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {getTopProducts, getTrendingProducts} from '../../../actions/statsActions';

import StatesLayout from './StatsLayout';

const StatsProduct = ({getTopProducts, getTrendingProducts, stats:{product, loading}, auth:{user}, location}) => {

    return (
        <Fragment>
            <StatesLayout getTop={getTopProducts} getTrending={getTrendingProducts} product={product} loading={loading} user={user} region={location.pathname.slice(10, 100)}  />
        </Fragment>
    )
}

const mapStateToProps = state => ({
    stats: state.statsReducers,
    auth: state.authReducers
})

export default connect(mapStateToProps, {getTopProducts, getTrendingProducts})(StatsProduct)
