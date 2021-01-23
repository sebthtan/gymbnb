import React, { useState } from 'react'
import * as sessionActions from '../../store/session'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import './LoginForm.css'

const LoginFormPage = () => {
    const [credential, setCredential] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)

    if (sessionUser) return <Redirect to='/' />

    const handleSubmit = (e) => {
        e.preventDefault()
        return dispatch(sessionActions.login({ credential, password }))
            .catch((res) => {
                if (res.data && res.data.errors) setErrors(res.data.errors)
            })
    }

    return (
        <form onSubmit={handleSubmit} className='content'>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <div>
                <label>
                    Username or E-mail
                    <input
                        type='text'
                        value={credential}
                        required
                        onChange={(e) => setCredential(e.target.value)}
                    >
                    </input>
                </label>
            </div>
            <div>
                <label>
                    Password
                    <input
                        type='password'
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </input>
                </label>
            </div>
            <button type='submit'>Log in</button>
        </form>
    )
}

export default LoginFormPage
