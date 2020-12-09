import './StatsLayout.scss';
import React, {Fragment, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {GoLocation} from 'react-icons/go';
import {FaExchangeAlt} from 'react-icons/fa';
import ProductLayout from '../../template/ProductLayout';

const StatsLayout = props => {
    const stats = useSelector(state => state.statsReducers)
    const {total} = stats
    const locationName = ['London', 'South-West', 'South East', 'East of England', 'West Midlands', 'East Midlands', 'North West', 'North East', 'Yorkshire and the Humber' ]

    const [area, setArea] = useState(!localStorage.getItem('location-area') ? "london" : localStorage.getItem('location-area') )

    const limit = 100;
    const region = props.region;
    const getTop = props.getTop;
    const getTrending = props.getTrending;
    const product = props.product;
    const loading = props.loading;
    const user = props.user

    useEffect(() => {
        if(region === "top product" || region === "top supplier"){
            getTop(limit, area, "-view")
        }
        if(region === "top rating"){
            getTop(limit, area, "-ratingsAverage")
        }
        if(region === "most review"){
            getTop(limit, area, "-ratingsAverage")
        }
        if(region === "trending today"){
            getTrending(limit, area, "-view", 1)
        }
        if(region === "trending this week"){
            getTrending(limit, area, "-view", 7)
        }
        if(region === "trending this month"){
            getTrending(limit, area, "-view", 30)
        }
    }, [getTop, getTrending, region, area, limit])

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
                <h2>No product found in current location.</h2>
                <div className="filtering">
                    {!total ? "" : total.map((el, index) => 
                    <button onClick={() => localStorageItAndSetState(el.location)}>{locationName[index]} <br/> {el.total}</button>
                    )}
                </div>
            </div> 
            : 
            <div className="product-stats-container">
                <ProductLayout posts={product} loading={loading} stats={"true"} title={region.toUpperCase()} statsEmpty={"true"} admin={user.role === "admin" ? "true" : "false"} />
            </div>
            }
        </Fragment>
    )
}


export default StatsLayout
