import Map from 'components/shared/Map'
import Marker from './Marker'

/**
 * Get absolute difference between two numbers.
 * @param {Number} a
 * @param {Number} b
 */
const diff = (a, b) => Math.abs(a - b)

/**
 * Get relevance from 0 to 1 of an item in a list
 * @param {Number} pos    Position relative to the primary item in the list
 * @param {Number} length Length of the list
 */
const relevance = (pos, length) => Math.abs(pos / length - 1)

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
