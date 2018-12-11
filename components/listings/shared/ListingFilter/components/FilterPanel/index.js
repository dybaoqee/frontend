import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
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
        <Row>
          <Col width={1}>
            {this.props.children}
          </Col>
        </Row>
        <Row justifyContent="flex-end">
          <Button link onClick={this.props.close}>Aplicar</Button>
        </Row>
      </Container>
    )
  }
}

FilterPanel.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  panelPosition: PropTypes.object.isRequired
}

export default FilterPanel
