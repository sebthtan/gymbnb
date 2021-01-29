import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { Link } from 'react-router-dom'
import { Menu, MenuOpen } from '@material-ui/icons'

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    let sessionButtons
    if (user) {
        sessionButtons = (
            <ul className="dropdown-menu popout">
                <li className='dropdown-item'>{user.username}</li>
                <li className='dropdown-item'>{user.email}</li>
                <button onClick={logout} className='logout dropdown-item'>Log Out</button>
            </ul>
        )
    } else {
        sessionButtons = (
            <ul className="dropdown-menu popout">
                <Link to='/login'>
                    <li className='log dropdown-item'>Log in</li>
                </Link>
                <Link to='/signup'>
                    <li className='log dropdown-item'>Sign up</li>
                </Link>
            </ul>
        )
    }

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    if (showMenu) {
        return (
            <>
                <button onClick={openMenu} id='dropdown-menu-button'>
                    <MenuOpen style={{ marginRight: '0.5rem' }} />
                    <i className="fas fa-user-circle" style={{ fontSize: '2rem' }} />
                </button>
                {showMenu && sessionButtons}
            </>
        )
    } else {
        return (
            <>
                <button onClick={openMenu} id='dropdown-menu-button'>
                    <Menu style={{ marginRight: '0.5rem' }} />
                    <i className="fas fa-user-circle" style={{ fontSize: '2rem' }} />
                </button>
                {showMenu && sessionButtons}
            </>
        );
    }
}

export default ProfileButton;
