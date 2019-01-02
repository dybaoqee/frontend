import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Icon from '@emcasa/ui-dom/components/Icon'
import {
  StyledExpandButton
} from './styles'

class ExpandButton extends PureComponent {
  render() {
    return (
      <StyledExpandButton onClick={this.props.onClick}>
        <Icon name="angle-down" />
      </StyledExpandButton>
    )
  }
}

ExpandButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default ExpandButton
