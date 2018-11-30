import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import View from '@emcasa/ui-dom/components/View'
import Row from '@emcasa/ui-dom/components/Row'
import Button from '@emcasa/ui-dom/components/Button'

import {
  Container
} from './styles'

class FilterPanel extends PureComponent {
  render() {
    return (
      <Container elevation={4} p={4} show={this.props.show}>
        {this.props.children}
      </Container>
    )
  }
}

FilterPanel.propTypes = {
  show: PropTypes.bool.isRequired
}

export default FilterPanel
