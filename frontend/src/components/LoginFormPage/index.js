import React, { useState } from 'react'
import * as sessionActions from '../../store/session'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import './LoginForm.css'

const LoginFormPage = () => {
    const history = useHistory()
    const [credential, setCredential] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)

    if (sessionUser) return <Redirect to={history.go(-1)} />

    const handleSubmit = (e) => {
        e.preventDefault()
        return dispatch(sessionActions.login({ credential, password }))
            .catch((res) => {
                if (res.data && res.data.errors) setErrors(res.data.errors)
            })
    }

    return (
        <div className='content login-form'>
            <form onSubmit={handleSubmit} className='login-page-form'>
                <div className='errors-div'>
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                </div>
                <div className='fields-div'>
                    <div className='header'>
                        <h2>Log in</h2>
                    </div>
                    <div className='username-password-div'>
                        <div className='username-div'>
                            <label>
                                Username or E-mail
                        </label>
                            <div className='input-div'>
                                <input
                                    type='text'
                                    value={credential}
                                    required
                                    onChange={(e) => setCredential(e.target.value)}
                                >
                                </input>
                            </div>
                        </div>
                        <div className='password-div'>
                            <label>
                                Password
                            </label>
                            <div className='input-div'>
                                <input
                                    type='password'
                                    value={password}
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                >
                                </input>
                            </div>
                        </div>
                    </div>
                    <div className='button-div'>
                        <button className='submit' type='submit'>Log in</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LoginFormPage
