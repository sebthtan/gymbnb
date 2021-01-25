import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

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

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        <div>
            <button onClick={openMenu} id='dropdown-menu-button'>
                <i className="fas fa-user-circle" style={{ fontSize: '2rem' }} />
            </button>
            {showMenu && (
                <ul className="dropdown-menu popout">
                    <li className='dropdown-item'>{user.username}</li>
                    <li className='dropdown-item'>{user.email}</li>
                    {/* <li className='dropdown-item logout__div'> */}
                    <button onClick={logout} className='logout dropdown-item'>Log Out</button>
                    {/* </li> */}
                </ul>
            )}
        </div>
    );
}

export default ProfileButton;
