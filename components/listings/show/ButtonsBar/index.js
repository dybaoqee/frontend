import React, { Component } from 'react'
import LikeButton from 'components/shared/Common/Buttons/Like'

import {
  Wrapper,
  Container,
  ContactButton
} from './styles'

class ButtonsBar extends Component {
  render() {
    const {listing, handleOpenInterestPopup, user, favorite} = this.props

    return (
      <Wrapper>
        <Container>
          <LikeButton
            textButton
            favorite={favorite}
            listing={listing}
            user={user}
          />
          <ContactButton active onClick={handleOpenInterestPopup}>Falar com especialista</ContactButton>
        </Container>
      </Wrapper>
    )
  }
}

export default ButtonsBar
