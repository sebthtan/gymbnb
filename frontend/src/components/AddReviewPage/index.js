import { useState } from 'react'
import { useParams, useHistory, } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createReview } from '../../store/reviews'
import ReactStars from 'react-rating-stars-component'


const AddReviewPage = () => {
    const { listingId } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const [starsRating, setStarsRating] = useState(0)
    const [content, setContent] = useState('')
    const [errors, setErrors] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (content.length === 0) {
            return setErrors(['Review must have content.'])
        }
        if (starsRating === 0) {
            return setErrors(['Please rate your experience at this gym.'])
        }
        dispatch(createReview({ listingId, starsRating, content }))
        history.push(`/listings/${listingId}`)
    }

    return (
        <div className='content'>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <form onSubmit={handleSubmit}>
                <ReactStars
                    count={5}
                    value={starsRating}
                    onChange={e => setStarsRating(e)}
                    size={20}
                    activeColor='#ffd700'
                />
                <label>
                    Content
                    <input
                        type='text'
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    >
                    </input>
                </label>
                <button
                    type='submit'
                >
                    Post review
                    </button>
            </form>
        </div>

    )
}

export default AddReviewPage
