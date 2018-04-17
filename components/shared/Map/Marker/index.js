import {Component} from 'react'

import Container from './styles'

export default class MapMarker extends Component {
  render() {
    const {id, lat, lng, text, onSelect, highlight} = this.props

    return (
      <Container
        onClick={() => onSelect(id)}
        onMouseEnter={() => onSelect(id, {lat, lng})}
        onMouseLeave={() => onSelect(id, {})}
        lat={lat}
        lng={lng}
        highlight={highlight}
      >
        {text}
      </Container>
    )
  }
}
