import Map from 'components/shared/Map'

export default function ListingsMap({listings, ...props}) {
  const markers = listings.map((listing) => {
    const {id, price} = listing
    const {lat, lng} = listing.address
    return {id: id, lat: lat, lng: lng, text: price}
  })

  return <Map zoom={13} markers={markers} {...props} />
}
