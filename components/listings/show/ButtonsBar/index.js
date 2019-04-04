import React, { Component } from 'react'
import theme from 'config/theme'
import View from '@emcasa/ui-dom/components/View'
import Button from '@emcasa/ui-dom/components/Button'
import Text from '@emcasa/ui-dom/components/Text'
import LikeButton from './LikeButton'

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
