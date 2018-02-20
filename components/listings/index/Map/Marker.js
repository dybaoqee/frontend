import {Marker} from 'react-gmaps'

const ICON_URL = 'http://maps.google.com/mapfiles/ms/micons/'

const getSize = (num) => ({width: num, height: num})

export default function ListingsMarker({relevance, size, ...props}) {
  return (
    <Marker
      icon={{
        size: getSize(relevance * size),
        url: `${ICON_URL}/red.png`
      }}
      {...props}
    />
  )
}

ListingsMarker.defaultProps = {
  size: 40
}
