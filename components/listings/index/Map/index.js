import Map from 'components/shared/Map'

export default function ListingsMap({listings, onSelect, ...props}) {
  const markers = listings.map((listing) => {
    const {lat, lng, price} = listing
    return {lat: lat, lng: lng, text: price}
  })

  return <Map zoom={13} markers={markers} {...props} />
}
