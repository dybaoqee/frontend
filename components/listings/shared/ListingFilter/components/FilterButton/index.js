import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  StyledFilterButton,
  ChildrenWrapper
} from './styles'

class FilterButton extends PureComponent {
  render() {
    return (
      <StyledFilterButton
        mr={2}
        mb={2}
        px={[2, 3]}
        active={this.props.active}
        open={this.props.open}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </StyledFilterButton>
    )
  }
}

FilterButton.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func
}

export default FilterButton
