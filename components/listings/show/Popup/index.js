import React, {Component } from 'react'
import Container, {Content, Background} from './styles'
import CloseButton from 'components/shared/CloseButton'

class Popup extends Component {
  render() {
    const {
      listing,
      isPopupVisible,
      closePopup
    } = this.props

    return (
      <Container open={isPopupVisible}>
        <CloseButton onClick={closePopup} />
        <Content>{this.props.children}</Content>
        <Background /> 
      </Container>
    )
  }
}

export default Popup
