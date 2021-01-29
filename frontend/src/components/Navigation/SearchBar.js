import React, { useState, } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { search } from '../../store/listings'

const SearchBar = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const listings = useSelector(state => state.listings.list)

    const [searchTerm, setSearchTerm] = useState('')

    const handleChange = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleClick = (e) => {
        history.push(`/search`)
        dispatch(search(searchTerm, listings))
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleClick()
        }
    }


    return (
        <div className='prevform'>
            <label>
                <div style={{ textAlign: 'center' }}>
                    Location
                </div>
                <input
                    type='search'
                    id='searchbar'
                    value={searchTerm}
                    placeholder={'Enter city or state'}
                    onChange={handleChange}
                    onKeyUp={handleKeyPress}
                >
                </input>
            </label>
            <button
                className='submit'
                onClick={handleClick}
            >
                Search
            </button>
        </div>
    )
}

export default SearchBar
