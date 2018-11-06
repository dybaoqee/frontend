import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Text from '@emcasa/ui-dom/components/Text'
import Icon from '@emcasa/ui-dom/components/Icon'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'

import {
  PageButton,
  SliderButton
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
    const {
      children,
      previousDisabled,
      onPrevious,
      nextDisabled,
      onNext
    } = this.props
    return (
      <Row
        width={1}
        alignItems="center"
        justifyContent="space-between">
        <Col>
          <PageButton
            disabled={previousDisabled}
            onClick={onPrevious}
          >
            <Icon name="caret-left" color={previousDisabled ? 'grey' : 'dark'} />
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
          <PageButton
            disabled={nextDisabled}
            onClick={onNext}
          >
            <Icon name="caret-right" color={nextDisabled ? 'grey' : 'dark'} />
          </PageButton>
        </Col>
      </Row>
    )
  }
}

Slider.propTypes = {
  nextDisabled: PropTypes.bool.isRequired,
  previousDisabled: PropTypes.bool.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired
}

Slider.Button = ({day, dayOfWeek}) => {
  return (
    <SliderButton
      mx={1}
      height="extraTall"
    >
    <Row alignItems="center" justifyContent="center">
    <Col>
      <Text inline fontSize="large">{day}</Text>
      {' '}
      <Text inline>{dayOfWeek}</Text>
      </Col>
      </Row>
    </SliderButton>
  )
}

export default Slider
