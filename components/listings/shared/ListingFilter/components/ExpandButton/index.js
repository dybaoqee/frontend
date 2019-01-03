import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  StyledExpandButton,
  ArrowIcon
} from './styles'

class ExpandButton extends PureComponent {
  render() {
    return (
      <StyledExpandButton onClick={this.props.onClick}>
        <ArrowIcon name={this.props.expanded ? "angle-up" : "angle-down"} />
      </StyledExpandButton>
    )
  }
}

ExpandButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired
}

export default ExpandButton
