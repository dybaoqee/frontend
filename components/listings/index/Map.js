import {Marker} from 'react-gmaps'

import Map from 'components/shared/Map'

export default function ListingsMap({children, ...props}) {
  return (
    <Map {...props}>
      {Array.from(children).map(([pageNum, listings]) =>
        listings.map((listing) => (
          <Marker
            key={listing.id}
            lat={listing.address.lat}
            lng={listing.address.lng}
          />
        ))
      )}
    </Map>
  )
}
