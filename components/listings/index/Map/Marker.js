import {Marker} from 'react-gmaps'

const ICON_URL = 'https://maps.gstatic.com/mapfiles/api-3/images'

const getSize = (scale) => ({
  width: 27 * scale,
  height: 43 * scale
})

export default function ListingsMarker({relevance, size, ...props}) {
  const scale = relevance + Math.abs((relevance - 1) * 0.5)
  return (
    <Marker
      icon={{
        scaledSize: getSize(scale),
        url: `${ICON_URL}/spotlight-poi2.png`
      }}
      {...props}
    />
  )
}

ListingsMarker.defaultProps = {
  size: 90
}
