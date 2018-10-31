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
    const { services: { tour, photos }} = this.props
    if (!tour && !photos) {
      return null
    }
    
    return (
      <>
        <Text></Text>
      </>
    )
  }

  render() {
    const { location, pricing } = this.props
    const { suggestedPrice, userPrice } = pricing

    const formattedSuggestedPrice = suggestedPrice ? suggestedPrice.toLocaleString('pt-BR', currencyStyle) : null
    const formattedUserPrice = userPrice.toLocaleString('pt-BR', currencyStyle)
    const address = location.addressData.name

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
              <Col>
                {suggestedPrice ?
                  <>
                    <Text color="grey">Seu imóvel da <Text inline fontWeight="bold" color="grey">{address}</Text> foi avaliado por:</Text>
                    <Text fontSize="large" fontWeight="bold" textAlign="center">{formattedSuggestedPrice}</Text>
                    <Text color="grey">Será anunciado por:</Text>
                    <Text fontSize="large" fontWeight="bold" textAlign="center">{formattedUserPrice}</Text>
                  </>
                :
                  <>
                    <Text color="grey">Seu imóvel da <Text inline fontWeight="bold" color="grey">{address}</Text> será anunciado por:</Text>
                    <Text fontSize="large" fontWeight="bold" textAlign="center">{formattedUserPrice}</Text>
                  </>
                }
                {this.getServicesText()}
              </Col>
            </View>
            <View bottom p={4}>
              <Button active fluid height="tall">
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
