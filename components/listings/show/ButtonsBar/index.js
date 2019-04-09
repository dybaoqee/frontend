import React, { Component } from 'react'
import Button from '@emcasa/ui-dom/components/Button'
import LikeButton from 'components/shared/Common/Buttons/Like'

import {
  Wrapper,
  Container
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
          <Button active onClick={handleOpenInterestPopup}>Falar com especialista</Button>
        </Container>
      </Wrapper>
    )
  }
}

export default ButtonsBar
