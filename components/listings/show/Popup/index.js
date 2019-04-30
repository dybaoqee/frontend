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
  componentDidMount() {
    this.keyListener = window.addEventListener('keyup', (event) => {
      if (event.defaultPrevented) {
        return
      }

      switch (event.keyCode) {
        case 27:
          this.props.closePopup()
          break
      }
    })
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.keyListener)
  }

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
        <Background onClick={closePopup} />
      </Container>
    )
  }
}

export default Popup
