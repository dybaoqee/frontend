import React, {Component } from 'react'
import
  Container,
  {
    Wrapper,
    Content,
    Background
} from './styles'
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
        <Wrapper>
          <Content>{this.props.children}</Content>
        </Wrapper>
        <Background /> 
      </Container>
    )
  }
}

export default Popup
