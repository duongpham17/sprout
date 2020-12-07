import './Stats.scss';
import React, {Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {getTopProducts, getTrendingProducts} from '../../../actions/statsActions';
import {GoLocation} from 'react-icons/go';
import {FaExchangeAlt} from 'react-icons/fa';

import ProductLayout from '../../template/ProductLayout';

const StatsProduct = ({getTopProducts, getTrendingProducts, stats:{product, loading}, auth:{user}, location}) => {

    const [area, setArea] = useState(!localStorage.getItem('location-area') ? "london" : localStorage.getItem('location-area') )

    const limit = 100

    useEffect(() => {
        if(location.pathname.slice(10, 100) === "top product"){
            getTopProducts(limit, area, "-view")
        }
        if(location.pathname.slice(10, 100) === "top rating"){
            getTopProducts(limit, area, "-ratingsAverage")
        }
        if(location.pathname.slice(10, 100) === "most review"){
            getTopProducts(limit, area, "-ratingsAverage")
        }
        if(location.pathname.slice(10, 100) === "trending today"){
            getTrendingProducts(limit, area, "-view", 1)
        }
        if(location.pathname.slice(10, 100) === "trending this week"){
            getTrendingProducts(limit, area, "-view", 7)
        }
        if(location.pathname.slice(10, 100) === "trending this month"){
            getTrendingProducts(limit, area, "-view", 30)
        }
    }, [getTopProducts, getTrendingProducts, location, area, limit])

    const localStorageItAndSetState = (loc) => {
        setArea(loc)
        localStorage.setItem('location-area', loc)
    }

    return (
        <Fragment>
            <div className="stats-location">
                <GoLocation size="1.5rem"/> {area === "london" ? "London" : localStorage.getItem('location-area')}
                <button className={area === "none" ? "open" : ""} onClick={() => localStorageItAndSetState("none")}> <span> <FaExchangeAlt/> </span> Change Location </button>
            </div>

            {product.length === 0 ? 
            <div className="location-container">
                <h1>Please Select A UK Region</h1>
                <div className="filtering">
                <button onClick={() => localStorageItAndSetState("london")}>London</button>
                <button onClick={() => localStorageItAndSetState("south-west") }>South West</button>
                <button onClick={() => localStorageItAndSetState("south-east")}>South East</button>
                <button onClick={() => localStorageItAndSetState("east-of-england") }>East of England</button>
                <button onClick={() => localStorageItAndSetState("north-west")}>North West</button>
                <button onClick={() => localStorageItAndSetState("north-east")}>North East</button>
                <button onClick={() => localStorageItAndSetState("west-midlands")}>West Midlands</button>
                <button onClick={() => localStorageItAndSetState("east-midlands") }>East Midlands</button>
                <button onClick={() => localStorageItAndSetState("yorkshire")}>Yorkshire and the Humber</button>
                </div>
            </div> 
            : 
            <div className="product-stats-container">
                <ProductLayout posts={product} loading={loading} stats={"true"} title={location.pathname.slice(10, 100).toUpperCase()} statsEmpty={"true"} admin={user.role === "admin" ? "true" : "false"} />
            </div>
            }
        </Fragment>
    )
}

const mapStateToProps = state => ({
    stats: state.statsReducers,
    auth: state.authReducers
})

export default connect(mapStateToProps, {getTopProducts, getTrendingProducts})(StatsProduct)
