import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'

const LocationPin = ({ text, key }) => (
    <div className="pin" key={key}>
        <Icon icon={locationIcon} key={key} className="pin-icon" />
        <p className="pin-text">{text}</p>
    </div>
)

export default LocationPin
