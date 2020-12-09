import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {getTopSuppliers, getTrendingSuppliers} from '../../../actions/statsActions';

import StatesLayout from './StatsLayout';

const StatsSupplier = ({getTopSuppliers, getTrendingSuppliers, stats:{supplier, loading}, auth:{user}, location}) => {

    return (
    <Fragment>
            <StatesLayout getTop={getTopSuppliers} getTrending={getTrendingSuppliers} product={supplier} loading={loading} user={user} region={location.pathname.slice(11, 100)}  />
    </Fragment>
    )
}

const mapStateToProps = state => ({
    stats: state.statsReducers,
    auth: state.authReducers
})

export default connect(mapStateToProps, {getTopSuppliers, getTrendingSuppliers})(StatsSupplier)
