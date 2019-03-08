import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import theme from 'config/theme'
import {
  StyledExpandButton,
  ArrowIcon
} from './styles'

class ExpandButton extends PureComponent {
  render() {
    return (
      <StyledExpandButton onClick={this.props.onClick}>
        <ArrowIcon name={this.props.expanded ? "chevron-up" : "chevron-down"} color={theme.colors.dark} size={16} />
      </StyledExpandButton>
    )
  }
}

ExpandButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired
}

export default ExpandButton
