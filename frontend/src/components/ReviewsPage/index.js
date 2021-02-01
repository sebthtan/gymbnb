import './ReviewsPage.css'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import Modal from 'react-modal'

Modal.setAppElement('#root')


const ReviewsPage = ({ reviews }) => {
    let reviewsPreview = []
    const user = useSelector(state => state.session.user)
    const [modalOpen, setModalOpen] = useState(false)

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            height: '50vh',
            width: '50vw',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '1rem',
        }
    };

    const openModal = () => {
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
    }

    if (reviews.length >= 4) {
        for (let i = 0; i < 4; i++) {
            reviewsPreview.push(reviews[i])
        }
    }
    if (reviews.length < 4 && reviews.length >= 1) {
        for (let i = 0; i < reviews.length; i++) {
            reviewsPreview.push(reviews[i])
        }
    }

    useEffect(() => {
        if (modalOpen) {
            document.body.classList.add('overflow')
        } else {
            document.body.classList.remove('overflow')
        }
    }, [modalOpen])

    return (
        <div className='reviews-section-container'>
            <h3 className='reviews-section-header'>
                Reviews
                {user && (
                    <Link to={`/listings/${reviews[0].listingId}/reviews/add`}>
                        <button
                            className='show-reviews-button'
                            style={{ float: 'right' }}
                        >
                            Add a review
                    </button>
                    </Link>
                )}
                {!user && (
                    <Link to='/login'>
                        <button
                            className='show-reviews-button'
                            style={{ float: 'right' }}
                        >
                            Log in to add a review
                    </button>
                    </Link>
                )}
            </h3>
            <ul>
                {reviewsPreview.length >= 1 && (
                    <>
                        {reviewsPreview.map(review =>
                            <div key={`${reviewsPreview.indexOf(review)}`}>
                                <li>
                                    <h4 style={{ color: '#FF385C' }}>
                                        {review.User.username}
                                        <span style={{ color: 'black' }}>
                                            {review.createdAt.split('T')[0]}
                                        </span>
                                        <ReactStars {...{ size: 15, value: review.starsRating, edit: false }} />
                                    </h4>
                                    <p>
                                        {review.content}
                                    </p>
                                </li>
                            </div>
                        )}
                        {reviews.length > 4 && (
                            <>
                                <div className='show-reviews-button-container'>
                                    <button
                                        className='show-reviews-button'
                                        onClick={openModal}
                                    >
                                        {`Show all ${reviews.length} reviews`}
                                    </button>
                                </div>
                                <Modal
                                    isOpen={modalOpen}
                                    onRequestClose={closeModal}
                                    style={customStyles}
                                    contentLabel='modal'
                                >
                                    <div style={{ borderBottom: '1px solid lightgray' }}>
                                        <h2 style={{ paddingLeft: '1rem', fontWeight: '500' }}>Reviews</h2>
                                    </div>
                                    <div style={{ overflowY: 'auto', }}>
                                        {reviews.map(review =>
                                            <div style={{ padding: '1rem' }} key={`${reviews.indexOf(review)}`}>
                                                <li>
                                                    <h4 style={{ color: '#FF385C' }}>
                                                        {review.User.username}
                                                        <span style={{ color: 'black' }}>
                                                            {review.createdAt.split('T')[0]}
                                                        </span>
                                                        <ReactStars {...{ size: 15, value: review.starsRating, edit: false }} />
                                                    </h4>
                                                    <p>
                                                        {review.content}
                                                    </p>
                                                </li>
                                            </div>
                                        )}
                                    </div>
                                </Modal>

                            </>
                        )}
                    </>
                )}
                {reviewsPreview.length === 0 && (
                    <div>
                        <li>
                            <p>
                                No reviews yet
                            </p>
                        </li>
                    </div>
                )}
            </ul>
        </div >

    )
}


export default ReviewsPage
