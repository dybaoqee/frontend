var abbreviate = require('number-abbreviate')
import Map from 'components/shared/Map'

export default function ListingsMap({listings, ...props}) {
  const markers = listings.map((listing) => {
    const {id, price} = listing
    const {lat, lng} = listing.address
    const abbreviatedPrice = abbreviate(price).toUpperCase()
    return {id, lat, lng, text: abbreviatedPrice}
  })

  return <Map zoom={13} markers={markers} {...props} />
}
