import {Component} from 'react'
import PropTypes from 'prop-types'
import Container from './styles'

export default class MapMarker extends Component {
  render() {
    const {id, lat, lng, text, onSelect, highlight} = this.props

    return (
      <Container
        onClick={() => onSelect && onSelect(id)}
        onMouseEnter={() => onSelect && onSelect(id, {lat, lng})}
        onMouseLeave={() => onSelect && onSelect(id, {})}
        lat={lat}
        lng={lng}
        highlight={highlight}
        text={text}
      >
        {text}
      </Container>
    )
  }
}

MapMarker.propTypes = {
  id: PropTypes.number,
  lat: PropTypes.string,
  lng: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onSelect: PropTypes.func,
  highlight: PropTypes.bool
}
