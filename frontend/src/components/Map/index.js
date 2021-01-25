// import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'
import GoogleMapReact from 'google-map-react'
import LocationPin from './LocationPin'
import './Map.css'

const MapSection = ({ location = {
    address: '1600 Amphitheatre Parkway, Mountain View, california.',
    lat: 37.42216,
    lng: -122.08427,
}, zoom }) => {
    return (
        <div className='map'>
            <div className='google-map'>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyAt_6tRBdyxJgkTbCnc0ih4EcJ-CAvLG1E' }}
                    defaultCenter={location}
                    defaultZoom={zoom}
                >
                    <LocationPin
                        lat={location.lat}
                        lng={location.lng}
                        text={location.address}
                    />
                </GoogleMapReact>
            </div>
        </div>
    )
}


export default MapSection
