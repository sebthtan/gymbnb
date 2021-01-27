import GoogleMapReact from 'google-map-react'
import LocationPin from './LocationPin'
import './Map.css'

const MapSection = ({ locations, zoom }) => {

    let center = { lat: 39.715956, lng: -96.999668 }
    if (!locations) {
        locations = [{ latitude: 39.715956, longitude: -96.999668 }]
    }
    if (locations.length) {
        center = { lat: locations[0].latitude, lng: locations[0].longitude }
    }

    return (
        <div className='google-map'>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyAt_6tRBdyxJgkTbCnc0ih4EcJ-CAvLG1E' }}
                defaultCenter={center}
                defaultZoom={zoom}
                key={`${center.lat}-${center.lng}`}
            >
                {locations.map((location) => {
                    if (!location) {
                        return <></>
                    }
                    return <LocationPin key={locations.indexOf(location)} lat={location.latitude} lng={location.longitude} text={location.label} />
                })}
            </GoogleMapReact>
        </div>
    )
}


export default MapSection
