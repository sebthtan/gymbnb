import DatePicker from 'react-date-picker';
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
// import icon from './searchicon.png'
import { useDispatch, useSelector } from 'react-redux'
import { search, getSuggestions, loadAddresses } from '../../store/listings'

const SearchBar = () => {
    // const [date, setDate] = useState(new Date())
    const dispatch = useDispatch()
    const history = useHistory()

    const [searchTerm, setSearchTerm] = useState('')

    //

    //
    const handleChange = (e) => {
        setSearchTerm(e.target.value)

        // if (e.target.value.length >= 3) {
        //     setTimeout(dispatch(getSuggestions(searchTerm)), 1000)
        // }
    }

    const handleClick = (e) => {
        dispatch(search(searchTerm))
        history.push(`/search/${encodeURI(searchTerm)}`)

        // dispatch(updateMap())  --- START HERE TMRW
    }


    return (
        <div className='prevform'>
            <label>
                <div style={{ textAlign: 'center' }}>
                    Location
                </div>
                <input
                    type='text'
                    id='searchbar'
                    value={searchTerm}
                    placeholder={'Where are you training?'}
                    onChange={handleChange}
                >
                </input>
            </label>
            <button
                className='submit'
                onClick={handleClick}
            >
                Search
            </button>

            {/* <div>
                <DatePicker
                    onChange={(e) => setStartDate(e.target.value)}
                    value={startDate}
                />
            </div>
            <div>
                <DatePicker
                    onChange={(e) => setEndDate(e.target.value)}
                    value={endDate}
                />
            </div> */}
        </div>
    )
}

export default SearchBar
