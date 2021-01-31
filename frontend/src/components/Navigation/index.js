import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './Navigation.css'
import logo from './logo.png'
import ProfileButton from './ProfileButton'
import SearchBar from './SearchBar'

const Navigation = ({ isLoaded }) => {
    const sessionUser = useSelector(state => state.session.user)

    let sessionLinks = <ProfileButton user={sessionUser} className='profile' />

    return (
        <nav>
            <div className='menu'>
                <div id='home'>
                    <NavLink exact to='/'>
                        <img src={logo} alt='logo' ></img>
                    </NavLink>
                </div>
                <div className='searchbar-container'>
                    <SearchBar />
                </div>
                <div style={{ height: '56px' }}>
                    {isLoaded && sessionLinks}
                </div>
            </div>
        </nav>
    )
}

export default Navigation
