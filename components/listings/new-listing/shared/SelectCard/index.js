import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Text from '@emcasa/ui-dom/components/Text'
import Row from '@emcasa/ui-dom/components/Row'

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
    const { checked, text, image, onClick } = this.props
    return (
      <Container onClick={onClick}>
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
  image: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

SelectCard.defaultProps = {
  checked: false,
  text: null,
  image: 'tour',
  onClick: null
}

export default SelectCard
