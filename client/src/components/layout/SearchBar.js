import './SearchBar.scss'
import React, {Fragment, useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import {FaSearch} from 'react-icons/fa'
import {searchBar} from '../../actions/productActions';
import {GoLocation} from 'react-icons/go';
import Category from './Category';
import Logo from '../img/white_logo.png';

const SearchBar = ({searchBar, product:{search} }) => {
    const history = useHistory()

    const [menu, setMenu] = useState(false)
    const [formData, setFormData] = useState({
        description_title: ""
    })

    const {description_title} = formData

    useEffect(() => {
        if(description_title.length >= 3){
        searchBar(description_title.toLowerCase())
        }
    }, [searchBar, description_title])

    const onChange = (e) => {setFormData({...formData, [e.target.name] : e.target.value})}

    //if enter is pressed then redirect to senter page. where products characters will be matched E.g ca === cakes, cane, cat etc...
    const keyPress = (e) => {
        if(e.key === "Enter" ){
            history.push(`/enter/${description_title}`)
            reset()
        }
    }

    //close drops downs and clear input field when any action related to navigation is consumed.
    const reset = () => {
        setMenu(false)
        setFormData({description_title : ""})
    }
    
    return (
        <Fragment>
        <section>
        <nav className="search-bar-for-nav"> 
        <h1><Link to='/'><img src={Logo} alt=""/></Link></h1>
            <div className="category">
                <li><label><FaSearch/></label>
                <input maxLength="35"  autoComplete="off" type='text' placeholder="Search..." name="description_title" value={description_title} onKeyPress={e => keyPress(e)} onChange={e => onChange(e)} />
                </li>
                <li className="types"><button className={menu ? "open" : ""} onClick={() => setMenu(!menu)}>Explore</button></li>
            </div>
            
            {description_title.length >= 1 ? "" :
            <Category menu={menu} setMenu={setMenu} />
            }

            <Fragment>
                {description_title === "" ? "" :
                <div className="search-links">
                {!search ? "" : 
                    <div className="search-box">
                        {search.map((el, index) => 
                            <div key={index}>
                            <li>
                                <Link to={`/search/${el.description_title}?page=1`} onClick={() =>  reset()}>
                                {el.description_title.length >= 25 ? <Fragment> <GoLocation/> {el.region} || {el.description_title.slice(0, 25)}...</Fragment> : <Fragment> <GoLocation/> {el.region} || {el.description_title}</Fragment> }
                                </Link>
                            </li>
                            </div>
                        )}
                        <button onClick={() => setFormData({description_title : ""})}>Close</button>
                    </div>
                    }
                </div>
            }
            </Fragment>
        </nav>
        </section>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    product: state.productReducers
})

export default connect(mapStateToProps, {searchBar})(SearchBar)