import { fetch } from './csrf'

const LOAD_LISTINGS = 'listings/LOAD_LISTINGS'
const GET_SUGGESTIONS = 'listings/GET_SUGGESTIONS'
const GET_COORDINATES = 'listings/GET_COORDINATES'
const LOAD_ADDRESSES = 'listings/LOAD_ADDRESSES'

const load = (list) => ({
    type: LOAD_LISTINGS,
    list
})

const suggest = (payload) => ({
    type: GET_SUGGESTIONS,
    payload
})

const coords = (data) => ({
    type: GET_COORDINATES,
    data
})

const addresses = (addresses, filtered) => ({
    type: LOAD_ADDRESSES,
    addresses,
    filtered
})

export const search = (location, listings) => async dispatch => {
    const filtered = listings.filter((listing) => listing.City.name.toLowerCase() === location.toLowerCase() || listing.City.State.name.toLowerCase() === location.toLowerCase())
    const normalized = filtered.map((listing) => {
        const concatCityState = listing.City.name.concat(' ', listing.City.State.name)
        const fullAddress = listing.address.concat(', ', concatCityState)
        return encodeURI(fullAddress)
    })

    dispatch(addresses(normalized, filtered))
}

export const getListings = () => async dispatch => {
    const res = await fetch(`/api/listings`)
    dispatch(load(res.data))
}

export const getOneListing = (listingId) => async dispatch => {
    const res = await fetch(`/api/listings/${listingId}`)
    dispatch(load(res.data))
}

export const getSuggestions = (term) => async dispatch => {
    const res = await fetch(`/api/listings/search?q=${term}`)
    dispatch(suggest(res.data))
}

export const getCoordinates = (normalizedAddresses) => async dispatch => {
    normalizedAddresses.forEach(async (address) => {
        let res = await fetch(
            `http://api.positionstack.com/v1/forward?access_key=e1ac713dd54a8159282741fbb2a38c74&query=${address}`
        )
        dispatch(coords(res.data))
    })
}


let initialState = {
    list: [],
    geocodingData: {
        data: []
    },
    addresses: [],
}

const listingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_LISTINGS: {
            return { ...state, list: action.list }
        }
        case GET_SUGGESTIONS: {
            return { ...state, suggested: action.payload }
        }
        case GET_COORDINATES: {
            return { ...state, geocodingData: action.data }
        }
        case LOAD_ADDRESSES: {
            return { ...state, addresses: action.addresses, filtered: action.filtered }
        }
        default:
            return state;
    }
}

export default listingsReducer
