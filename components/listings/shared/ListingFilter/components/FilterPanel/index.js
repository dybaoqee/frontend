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
    let left = 0, top = 0
    const { show, panelPosition } = this.props
    if (panelPosition) {
      left = panelPosition.left
      top = panelPosition.top
    }
    return (
      <Container elevation={4} p={4} show={show} left={left} top={top}>
        {this.props.children}
      </Container>
    )
  }
}

FilterPanel.propTypes = {
  show: PropTypes.bool.isRequired,
  panelPosition: PropTypes.object.isRequired
}

export default FilterPanel
