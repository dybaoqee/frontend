import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format'
import theme from '@emcasa/ui'
import Text from '@emcasa/ui-dom/components/Text'

import {
  Wrapper,
  Container
} from './styles'

class PriceBar extends Component {
  render() {
    return (
      <Wrapper>
        <Container>
          <Text fontSize={[1, null, null, 2]}>
            {`${this.props.type} à venda por `}
            <Text inline color="pink" fontSize={[1, null, null, 2]}>
              <NumberFormat
                value={this.props.price}
                displayType={'text'}
                thousandSeparator={'.'}
                prefix={'R$'}
                decimalSeparator={','}
              />
            </Text>
          </Text>
        </Container>
      </Wrapper>
    )
  }
}

PriceBar.propTypes = {
  type: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
}

export default PriceBar
