import React, { PureComponent } from 'react'
import { key } from 'services/google-maps-api'

class StaticMap extends PureComponent {
  render() {
    const { addressData } = this.props
    if (!addressData) {
      return null
    }
    const mapWidth = window.innerWidth
    const { geometry: { location: { lat, lng }}} = addressData
    const params = `zoom=15&size=${mapWidth}x220&maptype=roadmap&markers=color:red%7C${lat},${lng}&style=feature:water%7Ccolor:0xa0d5ff&style=feature:`
    const endpoint = `https://maps.googleapis.com/maps/api/staticmap?${params}&key=${key}`
    return <img style={{width: '100%'}} src={endpoint} />
  }
}

export default StaticMap
