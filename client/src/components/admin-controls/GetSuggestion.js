import './GetSuggestion.scss';
import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {FaTrash} from 'react-icons/fa';
import {getSuggestion, cleanSuggestion} from '../../actions/adminAction';

const GetSuggestion = ({getSuggestion, cleanSuggestion, admin:{suggest}}) => {

    const [clean, setClean] = useState(false)

    const limit = 5

    const [page, setPage] = useState(limit)

    useEffect(() => {
        getSuggestion(page)
    }, [getSuggestion, page])

    const increment = () => {
        setPage(page + limit)
    }
    const decrement = () => {
        if(page === 0){
            setPage(limit)
        }else{
        setPage(page - limit)
        }
    }

    return (
        <div className="suggestion">
            <h1>Suggestions <button className="clean" onClick={() => setClean(!clean)}>Clear? </button> {clean ? <button className="clean" onClick={() => cleanSuggestion()}><FaTrash/> Confirm Clear!</button> : ""} </h1>

            {!suggest ? "" :
                <div className="user-suggest">
                    {suggest.map((el, index) => <li key={index}><span>{el.user.name}</span>: {el.message}</li>)}

                    {suggest.length === page ?
                    <button onClick={() => increment() }>+ More</button>
                    : ""}
                    <button onClick={() => decrement() }>- Less</button>
                </div>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    admin: state.adminReducers
})

export default connect(mapStateToProps, {getSuggestion, cleanSuggestion})(GetSuggestion)
