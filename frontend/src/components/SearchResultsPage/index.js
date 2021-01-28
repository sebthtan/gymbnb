import './SearchResultsPage.css'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import MapSection from '../Map'
import { useEffect } from 'react'
import { getCoordinates } from '../../store/listings'

/*
 take search term and compare to state.city.name => all the ones that match
*/


const SearchResultsPage = () => {
    const filtered = useSelector(state => state.listings.filtered)
    const addresses = useSelector(state => state.listings.addresses)
    const geocodingData = useSelector(state => state.listings.geocodingData)
    const dispatch = useDispatch()

    let locations
    if (geocodingData) {
        locations = geocodingData.data
    }

    useEffect(() => {
        dispatch(getCoordinates(addresses))
    }, [addresses, dispatch])

    if (addresses.length) {
        return (
            <div className='content'>
                <div className='column'>
                    <ul>
                        {filtered.map((listing) =>
                            <div key={listing.id} className='listing'>
                                <li>
                                    <Link to={`/listings/${listing.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                        <div>
                                            <h2 className='listing-title'>
                                                {`${listing.title}`}
                                            </h2>
                                        </div>
                                        <div>
                                            <h3 className='listing-description'>
                                                {`${listing.description}`}
                                            </h3>
                                        </div>
                                        <div className='listing-price-container'>
                                            <h2 className='listing-price'>
                                                {`$${listing.pricePer} / day`}
                                            </h2>
                                        </div>
                                    </Link>
                                </li>
                            </div>
                        )}
                    </ul>
                </div>
                <MapSection locations={locations} zoom={10} />
            </div >
        )
    }
    return (
        <div className='content'>
            <h2>
                Search for a location.
            </h2>
        </div>
    )
}

export default SearchResultsPage
