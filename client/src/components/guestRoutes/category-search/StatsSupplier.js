import './Stats.scss';
import React, {Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {getTopSuppliers, getTrendingSuppliers} from '../../../actions/statsActions';
import ProductLayout from '../../template/ProductLayout';
import {GoLocation} from 'react-icons/go';
import {FaExchangeAlt} from 'react-icons/fa';

const StatsSupplier = ({getTopSuppliers, getTrendingSuppliers, stats:{supplier}, auth:{user}, location}) => {

    const [area, setArea] = useState(!localStorage.getItem('location-area') ? "london" : localStorage.getItem('location-area') )

    const limit = 100

    useEffect(() => {
        if(location.pathname.slice(11, 100) === "top product"){
            getTopSuppliers(limit, area, "-view")
        }
        if(location.pathname.slice(11, 100) === "top rating"){
            getTopSuppliers(limit, area, "-ratingsAverage")
        }
        if(location.pathname.slice(11, 100) === "most review"){
            getTopSuppliers(limit, area, "-ratingsAverage")
        }
        if(location.pathname.slice(11, 100) === "trending today"){
            getTrendingSuppliers(limit, area, "-view", 1)
        }
        if(location.pathname.slice(11, 100) === "trending this week"){
            getTrendingSuppliers(limit, area, "-view", 7)
        }
        if(location.pathname.slice(11, 100) === "trending this month"){
            getTrendingSuppliers(limit, area, "-view", 30)
        }

    }, [getTopSuppliers, getTrendingSuppliers, location, area, limit])

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

        {area === "none" ? 
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
        <ProductLayout posts={supplier} stats={"true"} title={location.pathname.slice(11, 100).toUpperCase()} statsEmpty={"true"} admin={user.role === "admin" ? "true" : "false"} />
        </div>
        }
    </Fragment>
    )
}

const mapStateToProps = state => ({
    stats: state.statsReducers,
    auth: state.authReducers
})

export default connect(mapStateToProps, {getTopSuppliers, getTrendingSuppliers})(StatsSupplier)
