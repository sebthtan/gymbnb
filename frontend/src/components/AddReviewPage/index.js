import { useState } from 'react'
import { useParams, useHistory, } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createReview } from '../../store/reviews'
import ReactStars from 'react-rating-stars-component'
import './AddReviewPage.css'


const AddReviewPage = () => {
    const { listingId } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const [starsRating, setStarsRating] = useState(0)
    const [content, setContent] = useState('')
    const [errors, setErrors] = useState([])
    const listing = useSelector(state => state.listings.list.find(listing => Number(listing.id) === Number(listingId)))

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (content.length === 0) {
            return setErrors(['Review must have content.'])
        }
        if (starsRating === 0) {
            return setErrors(['Please rate your experience at this gym.'])
        }
        dispatch(createReview({ listingId, starsRating, content }))
        history.push(`/listings/${listingId}`)
        window.location.reload()
    }

    return (
        <>
            { listing && (
                <div className='content'>
                    <div className='post-review-page'>
                        <form onSubmit={handleSubmit} className='post-review-form'>
                            <div className='errors-div'>
                                <ul>
                                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                                </ul>
                            </div>
                            <div className='fields-div'>
                                <div className='header'>
                                    <h2>{`${listing.title} Gym`}</h2>
                                </div>
                                <div className='rate-listing'>
                                    <ReactStars
                                        count={5}
                                        value={starsRating}
                                        onChange={e => setStarsRating(e)}
                                        size={30}
                                        activeColor='#ffd700'
                                    />
                                </div>
                                <div className='textarea-div'>
                                    <div className='input-div'>
                                        <textarea
                                            type='text'
                                            value={content}
                                            placeholder='Please tell us about your experience'
                                            onChange={e => setContent(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='button-div'>
                                    <button
                                        type='submit'
                                        className='submit'
                                    >
                                        Post review
                            </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default AddReviewPage
