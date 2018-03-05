import {Component} from 'react'

import Container from './styles'

export default class MapMarker extends Component {
  render() {
    const {id, lat, lng, text, onSelect} = this.props

    return (
      <Container onClick={() => onSelect(id)} lat={lat} lng={lng}>
        {text}
      </Container>
    )
  }
}
