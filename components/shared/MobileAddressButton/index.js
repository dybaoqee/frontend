import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { isMobile } from 'lib/mobile'
import {
  Container,
  MobileAddressTextContainer,
  MobileAddressText
} from './styles'

class MobileAddressButton extends PureComponent {
  render() {
    const { address, onClick } = this.props

    return (
      <Container
        fluid
        height={isMobile() ? 'tall' : 'medium'}
        onClick={onClick}>
        <MobileAddressTextContainer>
          <MobileAddressText
            inline
            hasAddress={address !== null}
          >
            {address ? address : 'Endereço e número*'}
          </MobileAddressText>
        </MobileAddressTextContainer>
      </Container>
    )
  }
}

MobileAddressButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  address: PropTypes.string
}

export default MobileAddressButton
