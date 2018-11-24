import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Text from '@emcasa/ui-dom/components/Text'
import Row from '@emcasa/ui-dom/components/Row'

import {
  Container,
  Tour,
  Photos
} from './styles'

const IMAGES = {
  tour: <Tour />,
  camera: <Photos />
}

class SelectCard extends Component {
  render() {
    const { text, image } = this.props
    return (
      <Container>
        <Row justifyContent="center" alignItems="center" style={{height: '50%'}}>
          {IMAGES[image]}
        </Row>
        <Row justifyContent="center">
          <Text inline>{text}</Text>
        </Row>
      </Container>
    )
  }
}

SelectCard.propTypes = {
  text: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
}

SelectCard.defaultProps = {
  text: null,
  image: 'tour'
}

export default SelectCard
