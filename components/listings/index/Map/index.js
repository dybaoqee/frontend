import Map from 'components/shared/Map'

export default function ListingsMap({listings, onSelect, ...props}) {
  const markers = listings.map((listing) => {
    const {price} = listing
    const {lat, lng} = listing.address
    return {lat: lat, lng: lng, text: price}
  })

  return <Map zoom={13} markers={markers} {...props} />
}
