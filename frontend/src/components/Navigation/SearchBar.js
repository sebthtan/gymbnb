import DatePicker from 'react-date-picker';
import React, { useState } from 'react'

const SearchBar = () => {
    const [date, setDate] = useState(new Date())

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Location
                    <input type='text'>
                    </input>
                </label>
            </div>
            <div>
                <DatePicker
                    onChange={setDate}
                    value={date}
                />
            </div>
            <div>
                <DatePicker
                    onChange={setDate}
                    value={date}
                />
            </div>
            <button type='submit'>Search</button>
        </form>
    )
}

export default SearchBar
