import React, { Component } from 'react'
import PropTypes from 'prop-types'

import View from '@emcasa/ui-dom/components/View'
import Text from '@emcasa/ui-dom/components/Text'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'

import {
  Container,
  Bullet,
  CheckMark,
  Tour,
  Photos
} from './styles'

const IMAGES = {
  tour: <Tour />,
  camera: <Photos />
}

class SelectCard extends Component {
  render() {
    const { checked, text, image } = this.props
    return (
      <Container>
        {checked ?
          <CheckMark name="check-circle" color="pink" size={20} />
        :
          <Bullet />
        }
        <Row justifyContent="center" alignItems="center" style={{height: '50%'}}>
          {IMAGES[image]}
        </Row>
        <Row>
          <Text inline align="center">{text}</Text>
        </Row>
      </Container>
    )
  }
}

SelectCard.propTypes = {
  checked: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
}

SelectCard.defaultProps = {
  checked: false,
  text: null,
  image: 'tour'
}

export default SelectCard
