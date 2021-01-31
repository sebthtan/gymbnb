import { fetch } from './csrf'

const POST_REVIEW = 'reviews/POST_REVIEW'

const post = (review) => ({
    type: POST_REVIEW,
    review
})

export const createReview = (review) => async dispatch => {
    const { listingId, starsRating, content } = review
    const res = await fetch(`/api/listings/${listingId}/reviews/add`, {
        method: 'POST',
        body: JSON.stringify({
            listingId,
            starsRating,
            content
        })
    })
    dispatch(post(res.data))
    return res
}

const initialState = {
    newReview: {}
}

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_REVIEW: {
            return { ...state, newReview: action.review }
        }
        default: return state
    }
}

export default reviewsReducer
