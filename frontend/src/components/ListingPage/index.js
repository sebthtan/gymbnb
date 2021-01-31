import './ListingPage.css'
import { useSelector, connect } from 'react-redux'
import { useState, useEffect, useRef } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import { Fade } from 'react-slideshow-image'
import "react-slideshow-image/dist/styles.css";
import { Wifi, Pool, FitnessCenter, DirectionsBike, Lock, Bathtub } from '@material-ui/icons'
import { DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { addDays } from 'date-fns'
import ReactStars from 'react-rating-stars-component'
import ReviewsPage from '../ReviewsPage'



const ListingPage = () => {
    const { listingId } = useParams()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)
    const listing = useSelector(state => state.listings.list.find(listing => Number(listing.id) === Number(listingId)))
    let photos = listing?.Photos

    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ])

    const numberWithCommas = (num) => {
        return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

    const averageStars = (reviews) => {
        const allStars = reviews.map((review) => Number(review.starsRating))
        let sum = 0
        if (allStars.length) {
            for (let i = 0; i < allStars.length; i++) {
                sum += allStars[i]
            }
            return Number(sum) / Number(allStars.length)
        } else {
            return sum
        }
    }

    const myRef = useRef(null)
    const executeScroll = () => {
        return myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    let totalStars
    if (listing) {
        if (averageStars(listing.Reviews) === 0) {
            totalStars = 'No reviews yet'
        } else {
            totalStars = averageStars(listing.Reviews).toFixed(2)
        }
    }

    const [dateRangeObj] = dateRange
    const totalNights = Number(Math.abs((dateRangeObj.endDate - dateRangeObj.startDate) / 86400000))

    let subtotal
    if (listing) {
        subtotal = (Number(listing.pricePer) * totalNights).toFixed(0)
    }

    const serviceFee = (subtotal * 0.08).toFixed(0)
    const cleaningFee = (subtotal * 0.09).toFixed(0)

    let total
    if (subtotal) {
        total = Number(subtotal) + Number(serviceFee) + Number(cleaningFee)
    }

    useEffect(() => {
        history.push(`/listings/${listingId}`)
    }, [history, listingId])


    let sessionLinks
    if (sessionUser) {
        sessionLinks = (
            <button
                className='submit'
                type='submit'
            >
                Reserve
            </button>
        )
    } else {
        sessionLinks = (
            <Link to='/login'>
                <div className='redirect'>
                    <h2 className='redirect-anchor'>
                        Log in to reserve
                    </h2>
                </div>
            </Link>
        )
    }

    const handleChange = (ranges) => {
        setDateRange([ranges.selection])
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(dateRange)
    }

    if (!listing) return (
        <div className='content'>
            <h2>Loading...</h2>
        </div>
    )

    return (
        <>
            {listing && (
                <div className='content'>
                    <div className='title-holder'>
                        <h1 className='listing-info'>
                            {listing.title}
                        </h1>
                        <p className='listing-location'>{`${listing.City.name}, ${listing.City.State.name}`}</p>
                        <div style={{ cursor: 'pointer', width: '10%' }} onClick={executeScroll}>
                            <ReactStars {...{ size: 15, value: averageStars(listing.Reviews), edit: false }} />
                            <div >
                                <span className='stars-reviews-count' style={{ fontWeight: '700' }}>{totalStars}</span>
                                <span className='stars-reviews-count'>({listing.Reviews.map(review => review.starsRating).length})</span>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div className='slide-container'>
                            <div className='form-container'>
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <h3>
                                            {`$${listing.pricePer} / night`}
                                        </h3>
                                        <DateRangePicker
                                            ranges={dateRange}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className='button-container'>
                                        {sessionLinks}
                                    </div>
                                    <div className='math-container'>
                                        <div>
                                            <div>
                                                <h4>
                                                    {`$${listing.pricePer} x ${totalNights} night(s)`}
                                                </h4>
                                                <h4>
                                                    Cleaning Fee
                                        </h4>
                                                <h4>
                                                    Service Fee
                                        </h4>
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <h4 className='total-price'>
                                                    {`$${numberWithCommas(subtotal)}`}
                                                </h4>
                                                <h4 className='total-price'>
                                                    {`$${numberWithCommas(cleaningFee)}`}
                                                </h4>
                                                <h4 className='total-price'>
                                                    {`$${numberWithCommas(serviceFee)}`}
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='math-container' style={{ borderTop: '1px solid lightgray' }}>
                                        <div>
                                            <h3 style={{ padding: '1rem', margin: '0' }}>
                                                Total
                                            </h3>
                                        </div>
                                        <div>
                                            <h3 className='total-price' style={{ padding: '1rem', margin: '0' }}>
                                                {`$${numberWithCommas(total)}`}
                                            </h3>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <Fade>
                                {photos.map((photo) =>
                                    <div key={photo.caption} className='each-fade'>
                                        <div key={photo.caption}>
                                            <img className='fade-img' alt='fade-img' src={photo.url} key={photo.caption} />
                                        </div>
                                    </div>
                                )}
                            </Fade>
                        </div>
                    </div>
                    <div >
                        <div className='description'>
                            <div>
                                <h2 style={{ padding: '1rem' }}>
                                    {`Entire gym hosted by ${listing.Host.User.username}`}
                                    <span className='span-right'>{`Posted ${listing.createdAt.split('T')[0]}`}</span>
                                </h2>
                                <p>
                                    {listing.description}
                                </p>
                                <div>
                                    <h3 >Amenities</h3>
                                    {listing.wifi && (
                                        <p>
                                            <Wifi />
                                            {`Free wifi`}
                                        </p>
                                    )}
                                    {listing.freeWeights && (
                                        <p>
                                            <FitnessCenter />
                                            {` Free weights section`}
                                        </p>
                                    )}
                                    {listing.machineWeights && (
                                        <p>
                                            <FitnessCenter />
                                            {` Machine weights section`}
                                        </p>
                                    )}
                                    {listing.cardio && (
                                        <p>
                                            <DirectionsBike />
                                            {` Cardio equipment`}
                                        </p>
                                    )}
                                    {listing.pool && (
                                        <p>
                                            <Pool />
                                            {` Indoor or outdoor pool`}
                                        </p>
                                    )}
                                    {listing.lockerRoom && (
                                        <p>
                                            <Lock />
                                            {` Locker room`}
                                        </p>
                                    )}
                                    {listing.showers && (
                                        <p>
                                            <Bathtub />
                                            {` Showers`}
                                        </p>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                    <div ref={myRef}>
                        <ReviewsPage reviews={listing.Reviews} />
                    </div>
                </div>
            )}
        </>
    )
}

const mapStateToProps = (state) => {
    return { newReview: state.reviews.newReview }
}


export default connect(mapStateToProps)(ListingPage)
