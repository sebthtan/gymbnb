import GoogleMapReact from 'google-map-react'
import LocationPin from './LocationPin'
import './Map.css'
import { useSelector } from 'react-redux'

const MapSection = ({ locations, zoom }) => {
    const [data] = useSelector(state => state.listings.geocodingData.data.flat())

    let center
    if (locations.length) {
        center = { lat: locations[0].latitude, lng: locations[0].longitude }
    }

    return (
        <>
            { data && (
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
            )}
        </>
    )
}


export default MapSection
