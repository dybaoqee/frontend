import {InfoWindow} from 'react-gmaps'

import Map from 'components/shared/Map'
import Container from './styles'

export default function ListingsMap({children, onSelect, ...props}) {
  return (
    <Map {...props}>
      {Array.from(children).map(([pageNum, listings]) =>
        listings.map((listing) => (
          <InfoWindow
            key={listing.id}
            lat={listing.address.lat}
            lng={listing.address.lng}
            content={'yo'}
            onCloseClick={false}
            onClick={() => onSelect(listing.id)}
          />
        ))
      )}
    </Map>
  )
}
