import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './Navigation.css'
import ProfileButton from './ProfileButton'
import SearchBar from './SearchBar'

const Navigation = ({ isLoaded }) => {
    const sessionUser = useSelector(state => state.session.user)

    let sessionLinks
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} className='profile' />
        )
    } else {
        sessionLinks = (
            <>
                <li>
                    <NavLink to='/login' id='login'>Log In</NavLink>
                </li>
                <li>
                    <NavLink to='/signup' id='signup'>Sign Up</NavLink>
                </li>
            </>
        )
    }

    return (
        <nav>
            <ul className='menu'>
                <li>
                    <NavLink exact to='/' id='home'>Home</NavLink>
                </li>
                <li>
                    <SearchBar />
                </li>
                {isLoaded && sessionLinks}
            </ul>
        </nav>
    )
}

export default Navigation
