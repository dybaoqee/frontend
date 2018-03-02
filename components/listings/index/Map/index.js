import {InfoWindow} from 'react-gmaps'

import Map from 'components/shared/Map'

export default function ListingsMap({children, onSelect, ...props}) {
  return (
    <Map {...props}>
      {Array.from(children).map(([pageNum, listings]) =>
        <div>Replace this</div>
      )}
    </Map>
  )
}
