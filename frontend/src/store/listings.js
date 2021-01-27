import { fetch } from './csrf'

const LOAD_LISTINGS = 'listings/LOAD_LISTINGS'
const SEARCH_LISTINGS = 'listings/SEARCH_LISTINGS'
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

const addresses = (addresses) => ({
    type: LOAD_ADDRESSES,
    addresses
})

export const search = (input) => ({
    type: SEARCH_LISTINGS,
    input
})

export const getListings = () => async dispatch => {
    const res = await fetch(`/api/listings`)
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
        console.log(res)
        dispatch(coords(res.data))
    })
}

export const loadAddresses = (listings) => async dispatch => {
    const normalized = listings.map((listing) => {
        const concatCityState = listing.City.name.concat(' ', listing.City.State.name)
        const fullAddress = listing.address.concat(', ', concatCityState)
        return encodeURI(fullAddress)
    })

    dispatch(addresses(normalized))
}

let initialState = {
    list: [],
    searchTerm: '',
    geocodingData: {
        data: []
    },
    addresses: []
}

const listingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_LISTINGS: {
            return { ...state, list: action.list }
        }
        case SEARCH_LISTINGS: {
            return {
                ...state, searchTerm: action.input
            }
        }
        case GET_SUGGESTIONS: {
            return { ...state, suggested: action.payload }
        }
        case GET_COORDINATES: {
            return { ...state, geocodingData: action.data }
        }
        case LOAD_ADDRESSES: {
            return { ...state, addresses: action.addresses }
        }
        default:
            return state;
    }
}

export default listingsReducer
