import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import theme from '@emcasa/ui'
import {
  StyledToggleButton,
  ArrowIcon
} from './styles'

class ToggleButton extends PureComponent {
  render() {
    return (
      <StyledToggleButton onClick={this.props.onClick}>
        <ArrowIcon name={this.props.expanded ? "chevron-up" : "chevron-down"} color={theme.colors.dark} size={16} />
      </StyledToggleButton>
    )
  }
}

ToggleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired
}

export default ToggleButton
