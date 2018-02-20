import Map from 'components/shared/Map'
import Marker from './Marker'

const diff = (a, c) => Math.abs(a - c)

const relevance = (d, c) => Math.abs(d / c - 1)

export default function ListingsMap({children, range, currentPage, ...props}) {
  const pages = Array.from(children)
  const index = pages.findIndex(([num]) => num === currentPage)
  const visiblePages = pages.slice(Math.max(0, index - range), index + range)
  const length = visiblePages.length
  return (
    <Map {...props}>
      {visiblePages.map(([pageNum, listings]) =>
        listings.map(listing => (
          <Marker
            key={listing.id}
            relevance={relevance(diff(pageNum, currentPage), length)}
            lat={listing.address.lat}
            lng={listing.address.lng}
          />
        ))
      )}
    </Map>
  )
}

ListingsMap.defaultProps = {
  range: 4
}
