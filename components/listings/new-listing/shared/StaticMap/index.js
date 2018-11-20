import {PureComponent} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {key} from 'services/google-maps-api'
import StyledImage from './styles'

const ZOOM = 15
const MAP_HEIGHT = 110
const MARKER_URL = 'https://s3.amazonaws.com/emcasa-ui/images/place-48x48px.png'

const AnimatedContainer = styled.div`
  max-height: ${(props) => (props.isLoaded ? MAP_HEIGHT : 0)}px;
  overflow: hidden;
  transition: max-height 0.3s ease-in;
`

class StaticMap extends PureComponent {
  static propTypes = {
    addressData: PropTypes.object,
    animated: PropTypes.bool
  }

  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.addressData !== this.props.addressData) {
      this.setState({loaded: false})
    }
  }

  render() {
    const {animated, addressData} = this.props
    const mapWidth = window.innerWidth
    const {geometry: {location: {lat, lng}}} = addressData || {geometry: {location: {lat: 0, lng: 0}}}
    const params = `zoom=${ZOOM}&size=${mapWidth}x${MAP_HEIGHT}&scale=2&maptype=roadmap&markers=scale:2|icon:${MARKER_URL}|${lat},${lng}&style=feature:water|color:0xa0d5ff&style=feature:`
    const endpoint = `https://maps.googleapis.com/maps/api/staticmap?${params}&key=${key}`
    return addressData ? (
      <AnimatedContainer isLoaded={!animated || this.state.loaded}>
        <StyledImage
          src={endpoint}
          onLoad={() => this.setState({loaded: true})}
        />
      </AnimatedContainer>
    ) : null
  }
}

export default StaticMap
