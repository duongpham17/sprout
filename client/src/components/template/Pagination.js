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
    const sort = localStorage.getItem('sorting')

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
        } else {
            getDataRequest(pageNumber, sort, limit, area)
        }

    }, [pageNumber, location, filtering, getDataRequest, sort, area, limit])

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
                            <button className={filtering === "view" ? "selected-sort" : ""}             onClick={() => sorting("view")}><FaCrown/> Most Views</button>
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
                
                {area === "none" ? "" :
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


