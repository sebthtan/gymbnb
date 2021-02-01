import React, { useState } from 'react'
import * as sessionActions from '../../store/session'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import './SignupForm.css'

const SignupFormPage = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)

    if (sessionUser) return <Redirect to='/' />

    const handleSubmit = (e) => {
        e.preventDefault()
        if (password === confirmPassword) {
            setErrors([])
            return dispatch(sessionActions.signupUser({ email, username, password }))
                .catch(res => {
                    if (res.data && res.data.errors) setErrors(res.data.errors)
                })
        }
        return setErrors(['Passwords do not match.'])
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
                        <h2>Sign up</h2>
                    </div>
                    <div className='username-password-div'>
                        <div className='username-div'>
                            <label>
                                Username
                        </label>
                            <div className='input-div'>
                                <input
                                    type='text'
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    required
                                >
                                </input>
                            </div>
                        </div>
                        <div className='username-div'>
                            <label>
                                E-mail
                    </label>
                            <div className='input-div'>
                                <input
                                    type='text'
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
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
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                >
                                </input>
                            </div>
                        </div>
                        <div className='password-div'>
                            <label>
                                Confirm Password
                    </label>
                            <div className='input-div'>
                                <input
                                    type='password'
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    required
                                >
                                </input>
                            </div>
                        </div>
                    </div>
                    <div className='button-div'>
                        <button className='submit' type='submit'>Sign Up</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignupFormPage
