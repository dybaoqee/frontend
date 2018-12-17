import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Row from '@emcasa/ui-dom/components/Row'
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
          <div onClick={(e) => {
            e.stopPropagation()
            this.props.onRemoveFilter()
          }}>
            {this.props.showRemoveButton && <RemoveIcon name="times-circle" color="white" />}
          </div>
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
