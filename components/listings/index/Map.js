import Map, {Marker} from 'components/shared/Map'

export default function ListingsMap({children, ...props}) {
  return (
    <Map {...props}>
      {children &&
        children.map((listing) => (
          <Marker
            key={listing.id}
            lat={listing.address.lat}
            lng={listing.address.lng}
          />
        ))}
    </Map>
  )
}
