import './Pagination.scss';
import React,{Fragment, useState, useEffect} from 'react';
import {Link, useLocation, useHistory} from 'react-router-dom';

import {GoLocation, GoCalendar} from 'react-icons/go';
import {FaExchangeAlt, FaCrown, FaHome} from 'react-icons/fa';
import {HiSortAscending, HiSortDescending} from 'react-icons/hi';
import {TiArrowRightThick, TiArrowLeftThick} from 'react-icons/ti';
import {RiListSettingsLine} from 'react-icons/ri';

const Pagination = (props) => {
    const location = useLocation()
    const history = useHistory()

    const limit = props.limit;
    const getDataRequest = props.getDataRequest

    const [click, setClick] = useState(false)

    const [pageNumber, setPageNumber] = useState(1)
    const [filtering, setFiltering] = useState(!localStorage.getItem('sorting') ? "normal" : localStorage.getItem('sorting') )
    const [area, setArea] = useState(!localStorage.getItem('location-area') ? "london" : localStorage.getItem('location-area') )

    //To create query param
    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const pages = parseInt(params.get('page'))
        setPageNumber(pages ? pages : pageNumber)

        if(filtering === "normal"){
            getDataRequest(pageNumber, "-createdAt", limit, area)
        } else if (filtering === "high-price") {
            getDataRequest(pageNumber,  "-price", limit, area)
        } else if (filtering === "low-price") {
            getDataRequest(pageNumber, "price", limit, area)
        } else if (filtering === "new"){
            getDataRequest(pageNumber, "-createdAt", limit, area)
        } else if (filtering === "old"){
            getDataRequest(pageNumber, "createdAt", limit, area)
        } else if (filtering === "high-view"){
            getDataRequest(pageNumber, "-view", limit, area)
        } else if (filtering === "high-rating"){
            getDataRequest(pageNumber, "-ratingsAverage", limit, area)
        } else if (filtering === "low-rating"){
            getDataRequest(pageNumber, "ratingsAverage", limit, area)
        } else if (filtering === "high-num-review"){
            getDataRequest(pageNumber, "-ratingsQuantity", limit, area)
        } else if (filtering === "low-num-review"){
            getDataRequest(pageNumber, "ratingsQuantity", limit, area)
        } else if (filtering === "low-quantity"){
            getDataRequest(pageNumber, "quantity", limit, area)
        } else if (filtering === "high-quantity"){
            getDataRequest(pageNumber, "-quantity", limit, area)
        }

    }, [pageNumber, location, filtering, getDataRequest, area, limit])

    const increment = (num) => {
        setPageNumber(pageNumber + num)
        history.push(`?page=${(pageNumber + num)}&sort=${filtering}&region=${area}`)
        window.scrollTo({top: 120, "behavior": "smooth"})
    }
    
    const decrement = (num) => {
        if(pageNumber > 1){
        setPageNumber(pageNumber - num)
        history.push(`?page=${(pageNumber - num)}&sort=${filtering}&region=${area}`)
        } else {
        return 1
        }
        window.scrollTo({top: 50, "behavior": "smooth"})
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
                        : "" }
                    </Fragment>
                    : "" }

                    {props.sort === "true" ? 
                        <div className={`sort-container ${props.editsort}`}>
                        <Fragment>
                            {click ? 
                            <div className="sort-dropdown">
                            <button className={filtering === "high-price" ? "selected-sort" : ""} onClick={() => sorting("high-price")}><HiSortAscending/> Price</button>
                            <button className={filtering === "low-price" ? "selected-sort" : ""} onClick={() => sorting("low-price")}><HiSortDescending/> Price</button>
                            <button className={filtering === "high-rating" ? "selected-sort" : ""} onClick={() => sorting("high-rating")}><HiSortAscending/> Rating</button>
                            <button className={filtering === "low-rating" ? "selected-sort" : ""} onClick={() => sorting("low-rating")}><HiSortDescending/> Rating</button>
                            <button className={filtering === "high-num-review" ? "selected-sort" : ""} onClick={() => sorting("high-num-review")}><HiSortAscending/> Reviews</button>
                            <button className={filtering === "low-num-review"? "selected-sort" : ""} onClick={() => sorting("low-num-review")}><HiSortDescending/> Reviews</button>
                            <button className={filtering === "high-quantity" ? "selected-sort" : ""} onClick={() => sorting("high-quantity")}><HiSortAscending/> Quantity</button>
                            <button className={filtering === "low-quantity"? "selected-sort" : ""} onClick={() => sorting("low-quantity")}><HiSortDescending/> Quantity</button>
                            <button className={filtering === "new" ? "selected-sort" : ""} onClick={() => sorting("new")}><GoCalendar/> Newest</button>
                            <button className={filtering === "old" ? "selected-sort" : ""} onClick={() => sorting("old")}><GoCalendar/> Oldest</button>
                            <button className={filtering === "high-view" ? "selected-sort" : ""} onClick={() => sorting("high-view")}><FaCrown/> Most Views</button>
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
                            <li><h2>No Content on This Page. <br/></h2></li>
                            <li><button onClick={() => localStorageItAndSetState("none")}><GoLocation/> Try Changing location</button></li><br/>
                            <li><Link to="/"><FaHome /> Go Back To Home Page?</Link></li>
                            </div> 
                        }
                        </Fragment>
                    : ""}
                    </Fragment>
                : ""}
                
                {area === "none" || props.posts.length === 0 ? "" :
                    <div className={`pagination_bottom_ ${props.classname2}`}>
                        <li><button onClick={() => decrement(1)}><TiArrowLeftThick /></button></li>
                        <li><p>Current Page: {pageNumber}</p></li>
                        {props.posts.length >= limit ? 
                        <li><button onClick={() => increment(1)}><TiArrowRightThick /></button></li>
                        : "" }
                    </div>
                }

            </Fragment>

        }</Fragment>
    )
}

export default (Pagination)


/*

* props.getDataRequest === The /url/endpoint for grabbing the data.

* props.limit          === The amount of document fetched from the database E.g 10 means only 10 document per page.

* props.posts          === The api data that has been fetched from getDataRequest fetched 

* props.region         === if you want to let users pick location, in the bar

* props.sort           === if you want to let users sort / filter product.

* props.noContent      === if there is no content then a page will be displayed saying there is no content and some links.

*/


