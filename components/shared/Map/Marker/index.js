import {Component} from 'react'

import Container from './styles'

export default class MapMarker extends Component {
  render() {
    const {lat, lng, text} = this.props

    return (
      <Container lat={lat} lng={lng}>
        {text}
      </Container>
    )
  }
}
