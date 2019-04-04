import React, {Component } from 'react'
import theme from 'config/theme'
import Button from '@emcasa/ui-dom/components/Button'
import Container from './styles'
import GMap from 'components/listings/show/Map'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes'

class StreetViewPopup extends Component {
  render() {
    const {
      listing,
      isStreetViewPopupVisible,
      closeStreetViewPopup
    } = this.props

    return (
      <Container open={isStreetViewPopupVisible}>
        <Button onClick={closeStreetViewPopup}><FontAwesomeIcon icon={faTimes} /></Button>
        <GMap listing={listing} streetView />
      </Container>
    )
  }
}

export default StreetViewPopup
