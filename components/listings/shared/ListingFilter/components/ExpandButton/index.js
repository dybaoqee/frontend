import React, { PureComponent } from 'react'
import Icon from '@emcasa/ui-dom/components/Icon'
import {
  StyledExpandButton
} from './styles'

class ExpandButton extends PureComponent {
  render() {
    return (
      <StyledExpandButton>
        <Icon name="angle-down" />
      </StyledExpandButton>
    )
  }
}

export default ExpandButton
