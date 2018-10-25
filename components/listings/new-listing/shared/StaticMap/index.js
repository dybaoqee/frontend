import React, { PureComponent } from 'react'
import theme from '@emcasa/ui'
import { key } from 'services/google-maps-api'
import StyledImage from './styles'

const ZOOM = 15
const HEIGHT_MOBILE = 110
const HEIGHT_DESKTOP = 220

class StaticMap extends PureComponent {
  render() {
    const { addressData } = this.props
    if (!addressData) {
      return null
    }
    const { breakpoints } = theme
    const mapWidth = window.innerWidth
    const mapHeight = mapWidth < parseInt(breakpoints) ? HEIGHT_MOBILE : HEIGHT_DESKTOP
    const { geometry: { location: { lat, lng }}} = addressData
    const params = `zoom=${ZOOM}&size=${mapWidth}x${mapHeight}&scale=2&maptype=roadmap&markers=color:red%7C${lat},${lng}&style=feature:water%7Ccolor:0xa0d5ff&style=feature:`
    const endpoint = `https://maps.googleapis.com/maps/api/staticmap?${params}&key=${key}`
    return <StyledImage src={endpoint} />
  }
}

export default StaticMap
