import Map, {Marker} from 'components/shared/Map'

const relevance = (a, b) => a / b * -1

export default function ListingsMap({
  children,
  range,
  currentPage,
  size,
  ...props
}) {
  const pages = Array.from(children)
  const index = pages.findIndex(([num]) => num === currentPage)
  const visiblePages = pages.slice(index - range, index + range + 1)
  return (
    <Map {...props}>
      {visiblePages.map(([page, listings]) => (
        listings.map((listing) => (
          <Marker
            key={listing.id}
            lat={listing.address.lat}
            lng={listing.address.lng}
          />
        ))
      ))}
    </Map>
  )
}

ListingsMap.defaultProps = {
  range: 3,
  size: 40,
  minSize: 10
}
