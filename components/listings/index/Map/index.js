import Map from 'components/shared/Map'
import Marker from './Marker'

const relevance = (a, b) => a / (b * 1.5) * -1

const diff = (a, b) => Math.abs(a - b)

export default function ListingsMap({children, range, currentPage, ...props}) {
  const pages = Array.from(children)
  const index = pages.findIndex(([num]) => num === currentPage)
  const visiblePages = pages.slice(index - range, index + range + 1)
  return (
    <Map {...props}>
      {visiblePages.map(([page, listings]) => (
        listings.map((listing) => (
          <Marker
            key={listing.id}
            relevance={relevance(diff(page, currentPage), range)}
            lat={listing.address.lat}
            lng={listing.address.lng}
          />
        ))
      ))}
    </Map>
  )
}

ListingsMap.defaultProps = {
  range: 3
}
