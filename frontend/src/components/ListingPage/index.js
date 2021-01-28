import './ListingPage.css'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Fade } from 'react-slideshow-image'
import "react-slideshow-image/dist/styles.css";

const ListingPage = () => {
    const { listingId } = useParams()
    const listing = useSelector(state => state.listings.list.find(listing => Number(listing.id) === Number(listingId)))
    let photos = listing?.Photos

    if (!listing) return (
        <div className='content'>
            <h2>Gym not found.</h2>
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
                    </div>
                    <div className='slide-container'>
                        <Fade>
                            {photos.map((photo) =>
                                <div key={photo.url} className='each-fade'>
                                    <div>
                                        <img className='fade-img' alt='fade-img' src={photo.url} />
                                    </div>
                                </div>
                            )}
                        </Fade>
                        <div className='description'>
                            <div>
                                <h2>
                                    {`Entire gym hosted by ${listing.Host.User.username}`}
                                    <span>{`Posted ${listing.createdAt.split('T')[0]}`}</span>
                                </h2>
                                <p>
                                    {listing.description}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>

            )}
        </>
    )
}


export default ListingPage
