import './Pagination.scss';
import React,{Fragment, useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Link, useLocation, useHistory} from 'react-router-dom';

import {GoLocation, GoCalendar} from 'react-icons/go';
import {FaExchangeAlt, FaCrown, FaHome} from 'react-icons/fa';
import {HiSortAscending, HiSortDescending} from 'react-icons/hi';
import {TiArrowRightThick, TiArrowLeftThick} from 'react-icons/ti';
import {RiListSettingsLine} from 'react-icons/ri';

const Pagination = (props) => {
    const location = useLocation()
    const history = useHistory()

    const stats = useSelector(state => state.statsReducers) 
    const {total} = stats
    const locationName = ['London', 'South-West', 'South East', 'East of England', 'West Midlands', 'East Midlands', 'North West', 'North East', 'Yorkshire and the Humber' ]

    const route = !props.route ? "normal" : props.route;
    const path = props.path;
    const match = props.match;
    const limit = props.limit;
    const getDataRequest = props.getDataRequest;
    
    const sort = localStorage.getItem('sorting');
    const [click, setClick] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [filtering, setFiltering] = useState(!localStorage.getItem('sorting') ? "-createdAt" : localStorage.getItem('sorting') );
    const [area, setArea] = useState(!localStorage.getItem('location-area') ? "london" : localStorage.getItem('location-area') );

    //To create query param
    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const pages = parseInt(params.get('page'))
        setPageNumber(pages ? pages : pageNumber)

        if(route === "normal"){
            getDataRequest(pageNumber, filtering, limit, area)
        }

        if(route === "my-product"){
            getDataRequest(pageNumber, filtering, limit)
        }

        if(route === "category"){
            getDataRequest(pageNumber, path, sort, limit, area);
        }

        if(route === "user-shop"){
            getDataRequest(match, pageNumber, filtering, limit)
        }

        if(route === "review"){
            getDataRequest(pageNumber, limit)
        }

    }, [route, match, pageNumber, location, filtering, getDataRequest, sort, area, limit, path])

    const increment = (num) => {
        setPageNumber(pageNumber + num)
        history.push(`?page=${(pageNumber + num)}&sort=${filtering}${route === "normal" || route === "category" ? `&region=${area}` : ""}`)
        window.scrollTo({top: 10, "behavior": "smooth"})
    }
    
    const decrement = (num) => {
        if(pageNumber > 1){
        setPageNumber(pageNumber - num)
        history.push(`?page=${(pageNumber - num)}&sort=${filtering}${route === "normal" || route === "category" ? `&region=${area}` : ""}`)
        } else {
        return 1
        }
        window.scrollTo({top: 10, "behavior": "smooth"})
    }

    const localStorageItAndSetState = (loc) => {
        history.push('?page=1')
        setArea(loc)
        localStorage.setItem('location-area', loc)
    }

    const sorting = (sort) => {
        setFiltering(sort)
        localStorage.setItem('sorting', sort)
        setClick(false)
    }

    return (
        <Fragment>
            {!props.posts ? <div className="_center">Loading...</div>
                :   
                <Fragment>

                    <div className="filter-btn">
                        {props.region === "true" ?
                        <li>
                            <GoLocation/> {area === "london" ? "London" : localStorage.getItem('location-area')}
                            <button className={area === "none" ? "open" : ""} onClick={() => localStorageItAndSetState("none")}> <span>	<FaExchangeAlt/> </span> Change Location </button>
                        </li>
                        : "" }

                        {props.sort === "true" ?
                        <li>
                            <button className={area === "none" || props.posts.length === 0 ? "hidden" : "sort-btn"} onClick={() => setClick(!click)}><span className={click ? "open" : ""}><RiListSettingsLine/> Sort</span></button> 
                        </li>
                        : "" } 
                    </div>

                    {props.region === "true" ?
                    <Fragment>
                        {area === "none" ? 
                        <div className="location-container">
                            <h1>Please Select A UK Region</h1><br/>
                            <h2>Number represents total products in each region</h2>
                            <div className="filtering">
                            {!total ? "" : total.map((el, index) => 
                                <button key={index} onClick={() => localStorageItAndSetState(el.location)}>{locationName[index]} <br/> {el.total}</button>
                            )}
                            </div> 
                        </div> 
                        : "" }
                    </Fragment>
                    : "" }

                    {props.sort === "true" ? 
                        <div className={`sort-container ${props.editsort}`}>
                        <Fragment>
                            {click ? 
                            <div className="sort-dropdown">
                            <button className={filtering === "-price" ? "selected-sort" : ""}           onClick={() => sorting("-price")}><HiSortAscending/> Price</button>
                            <button className={filtering === "price" ? "selected-sort" : ""}            onClick={() => sorting("price")}><HiSortDescending/> Price</button>
                            <button className={filtering === "-ratingsAverage" ? "selected-sort" : ""}  onClick={() => sorting("-ratingsAverage")}><HiSortAscending/> Rating</button>
                            <button className={filtering === "ratingsAverage" ? "selected-sort" : ""}   onClick={() => sorting("ratingsAverage")}><HiSortDescending/> Rating</button>
                            <button className={filtering === "-ratingsQuantity" ? "selected-sort" : ""} onClick={() => sorting("-ratingsQuantity")}><HiSortAscending/> Reviews</button>
                            <button className={filtering === "ratingsQuantity"? "selected-sort" : ""}   onClick={() => sorting("ratingsQuantity")}><HiSortDescending/> Reviews</button>
                            <button className={filtering === "-quantity" ? "selected-sort" : ""}        onClick={() => sorting("-quantity")}><HiSortAscending/> Quantity</button>
                            <button className={filtering === "quantity"? "selected-sort" : ""}          onClick={() => sorting("quantity")}><HiSortDescending/> Quantity</button>
                            <button className={filtering === "-createdAt" ? "selected-sort" : ""}       onClick={() => sorting("-createdAt")}><GoCalendar/> Newest</button>
                            <button className={filtering === "createdAt" ? "selected-sort" : ""}        onClick={() => sorting("createdAt")}><GoCalendar/> Oldest</button>
                            <button className={filtering === "-view" ? "selected-sort" : ""}            onClick={() => sorting("-view")}><FaCrown/> Most Views</button>
                            </div>
                            : "" }
                        </Fragment>
                        </div>
                    : ""}  
                    

                    {props.noContent === "true" ? 
                        <Fragment>
                        {props.posts.length === 0 ? 
                            <Fragment>
                            {area === "none" ? "" :
                                <div className="no_content3">
                                <li><h2>No Product on This Page. <br/></h2></li>
                                <li><button onClick={() => localStorageItAndSetState("none")}><GoLocation/> Try Changing location</button></li><br/>
                                <li><Link to="/"><FaHome /> Go Back To Home Page?</Link></li>
                                </div> 
                            }
                            </Fragment>
                        : ""}
                        </Fragment>
                    : ""}

                    {area === "none" || props.totalProducts <= limit ? "" :
                        <div className={`pagination_bottom`}>
                            <li><button onClick={() => decrement(1)}><TiArrowLeftThick /></button></li>
                        <li><p>Current Page: {pageNumber}</p></li>
                            {props.posts.length >= limit ? 
                            <li><button onClick={() => increment(1)}><TiArrowRightThick /></button></li>
                            : "" }
                        </div>
                    }

                </Fragment>
            }
        </Fragment>
    )
}

export default (Pagination)


/*

* props.getDataRequest === The /url/endpoint for grabbing the data.

* props.path           === uses the url/pathname to put in the getDataRequest /url/endpoint?query=pathname...

* props.limit          === The amount of document fetched from the database E.g 10 means only 10 document per page.

* props.totalProducts  === total length must be larger than limit in order for the < > pagination to appear

* props.posts          === The api data that has been fetched from getDataRequest fetched 

* props.region         === set true. If you want to let users pick location, in the bar

* props.sort           === set true. If you want to let users sort / filter product.

* props.noContent      === set true. If there is no content then a page will be displayed saying there is no content and some links.


*/


