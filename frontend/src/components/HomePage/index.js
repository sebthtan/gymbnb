import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import image from './gymsharkw3.jpg'
import { getListings } from '../../store/listings.js'
// import './HomePage.css'

const HomePage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getListings())
    }, [dispatch])

    return (
        <>
            <div className='top-half content' style={{ background: `url(${image}) center center no-repeat`, backgroundSize: `cover` }}>
                <h1 style={{ marginTop: '40rem' }}>
                </h1>
            </div>
            <div className='grid'>
                <div className='grid-units'>

                </div>
                <div className='grid-units'>

                </div>
                <div className='grid-units'>

                </div>
                <div className='grid-units'>

                </div>
                <div className='grid-units'>

                </div>
                <div className='grid-units'>

                </div>
            </div>
        </>
    )
}

export default HomePage
