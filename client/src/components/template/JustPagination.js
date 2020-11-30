import './JustPagination.scss';
import React, {Fragment, useEffect, useState} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import {TiArrowRightThick, TiArrowLeftThick} from 'react-icons/ti';


const JustPagination = props => {

    const location = useLocation()
    const history = useHistory()

    const limit = props.limit
    const getDataRequest = props.getDataRequest

    const [pageNumber, setPageNumber] = useState(1)

    useEffect(() => { 
        const params = new URLSearchParams(location.search)
        const pages = parseInt(params.get('page'))
        setPageNumber(pages ? pages : pageNumber)

        getDataRequest(limit, pageNumber)

    }, [getDataRequest, location, pageNumber, limit])

    const increment = (num) => {
        setPageNumber(pageNumber + num)
        history.push(`?page=${(pageNumber + num)}`)
        window.scrollTo({top: 120, "behavior": "smooth"})
    }
    
    const decrement = (num) => {
        if(pageNumber > 1){
        setPageNumber(pageNumber - num)
        history.push(`?page=${(pageNumber - num)}`)
        } else {
        return 1
        }
        window.scrollTo({top: 50, "behavior": "smooth"})
    }
    return (
        <Fragment>
            {!props.posts || props.posts.length === 0 ? <div className="no_content">{props.noContent}</div> : 
            <Fragment>

            <div className={`just-pagination-bottom`}>
                {props.posts.length === 0 ? "" : <Fragment>
                <li><button onClick={() => decrement(1)}> <TiArrowLeftThick /> </button></li>
                <li><p>Current Page: {pageNumber}</p></li>
                </Fragment>
                }
                {props.posts.length >= limit ? 
                <li><button onClick={() =>  increment(1)}> <TiArrowRightThick /> </button></li>
                : "" }
            </div>
            </Fragment>
            }
        </Fragment>
    )
}

/*

* props.limit === Limit amount of reviews per page

* props.getDataRequest === Fetch document data from the endpoint name

* props.posts === data we get back from above ^, which i stored as posts

* props.noContent === In the case there is no more reviews page will display custom message

*/


export default JustPagination
