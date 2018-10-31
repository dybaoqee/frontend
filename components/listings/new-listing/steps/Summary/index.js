import React, { PureComponent } from 'react'
import MaskedInput from 'react-text-mask'

import Button from '@emcasa/ui-dom/components/Button'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import View from '@emcasa/ui-dom/components/View'
import Text from '@emcasa/ui-dom/components/Text'
import StaticMap from 'components/listings/new-listing/shared/StaticMap'
import {
  currencyInputMask,
  currencyStyle
} from 'utils/text-utils'

class Summary extends PureComponent {
  constructor(props) {
    super(props)
    this.finish = this.finish.bind(this)
  }

  finish() {
    
  }

  getServicesText() {
    return (
      null
    )
  }

  render() {
    const { location, pricing, services } = this.props
    return (
      <div ref={this.props.hostRef}>
        <Row justifyContent="center">
          <Col width={[1, 1/2]}>
            <View body p={4}>
              <Text
                fontSize="large"
                fontWeight="bold"
                textAlign="center">
                Resumo do seu imóvel
              </Text>
              <Col>
                <StaticMap addressData={location.addressData} />
              </Col>
              {services.tour && this.getServicesText()}
            </View>
            <View bottom p={4}>
              <Button active>
                Vender meu imóvel
              </Button>
            </View>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Summary
