import React, {Component } from 'react'
import NoSSR from 'react-no-ssr'
import Container from './styles'
import GMap from 'components/listings/show/Map'
import CloseButton from 'components/shared/CloseButton'

class MapPopup extends Component {
  render() {
    const {
      streetView,
      listing,
      isMapPopupVisible,
      closeMapPopup
    } = this.props

    return (
      <NoSSR>
        <Container open={isMapPopupVisible}>
          <CloseButton onClick={closeMapPopup} />
          <GMap isVisible={isMapPopupVisible} listing={listing} streetView={streetView} />
        </Container>
      </NoSSR>
    )
  }
}

export default MapPopup
