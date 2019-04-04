import React, {Component } from 'react'
import theme from 'config/theme'
import Button from '@emcasa/ui-dom/components/Button'
import Container from './styles'
import GMap from 'components/listings/show/Map'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes'

class MapPopup extends Component {
  render() {
    const {
      listing,
      isMapPopupVisible,
      closeMapPopup
    } = this.props

    return (
      <Container open={isMapPopupVisible}>
        <Button onClick={closeMapPopup}><FontAwesomeIcon icon={faTimes} /></Button>
        <GMap listing={listing} />
      </Container>
    )
  }
}

export default MapPopup
