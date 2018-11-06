import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Icon from '@emcasa/ui-dom/components/Icon'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'

import {
  PageButton
} from './styles'

class Slider extends PureComponent {
  constructor(props) {
    super(props)
  }

  renderChild(child) {
    return (
      <Col>
        {child}
      </Col>
    )
  }

  render() {
    const { children } = this.props
    return (
      <Row
        width={1}
        alignItems="center"
        justifyContent="space-between">
        <Col>
          <PageButton>
            <Icon name="caret-left" />
          </PageButton>
        </Col>
        <Col>
          <Row justifyContent="space-between">
            {(typeof children === 'array') ? children.map((child) => {
              return this.renderChild(child)
            }) : this.renderChild(children)}
          </Row>
        </Col>
        <Col>
          <PageButton>
            <Icon name="caret-right" />
          </PageButton>
        </Col>
      </Row>
    )
  }
}

Slider.propTypes = {
  maxItemsToDisplay: PropTypes.number
}

Slider.defaultProps = {
  maxItemsToDisplay: 1
}

export default Slider
