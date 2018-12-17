import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Row from '@emcasa/ui-dom/components/Row'
import Icon from '@emcasa/ui-dom/components/Icon'
import {
  StyledFilterButton,
  RemoveIcon
} from './styles'

class FilterButton extends PureComponent {
  render() {
    return (
      <StyledFilterButton
        mr={2}
        mb={2}
        px={[2, 3]}
        active={this.props.active}
        value={this.props.value}
        onClick={this.props.onClick}
      >
        <Row>
          {this.props.children}
          {this.props.showRemoveButton && <RemoveIcon name="times-circle" color="white" onClick={this.props.onRemoveFilter} />}
        </Row>
      </StyledFilterButton>
    )
  }
}

FilterButton.propTypes = {
  value: PropTypes.any.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onRemoveFilter: PropTypes.func.isRequired,
  showRemoveButton: PropTypes.bool.isRequired
}

export default FilterButton
