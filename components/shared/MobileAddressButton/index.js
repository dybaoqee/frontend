import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  MobileAddressTextContainer,
  MobileAddressText
} from './styles'

class MobileAddressButton extends PureComponent {
  render() {
    const { height, address, onClick } = this.props
    return (
      <Container
        fluid
        height={height || 'tall'}
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
