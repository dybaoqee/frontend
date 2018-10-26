import React, { Component } from 'react'
import { Formik, Field } from 'formik'

import Input from '@emcasa/ui-dom/components/Input'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import View from '@emcasa/ui-dom/components/View'
import Text from '@emcasa/ui-dom/components/Text'
import StaticMap from 'components/listings/new-listing/shared/StaticMap'
import NavButtons from 'components/listings/new-listing/shared/NavButtons'

class Pricing extends Component {
  constructor(props) {
    super(props)
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.updateStateFromProps = this.updateStateFromProps.bind(this)
  }

  state = {
    price: null
  }

  componentDidMount() {
    this.updateStateFromProps(this.props)
  }

  componentWillReceiveProps(props) {
    this.updateStateFromProps(props)
  }

  updateStateFromProps(props) {
    const { pricing } = props
    if (pricing) {
      this.setState({
        price: pricing.price
      })
    }
  }

  nextStep() {
    const { navigateTo, updatePricing } = this.props
    updatePricing(this.state)
  }

  previousStep() {
    const { navigateTo } = this.props
    navigateTo('personal')
  }

  priceSuggestion() {
    return (
      <>
        <Text>Seu imóvel foi avaliado por:</Text>
        <Text>Recomendamos anunciar por:</Text>
        <Text>Não gostou da nossa avaliação? Não tem problema. É só editar o valor do seu imóvel.</Text>
      </>
    )
  }

  noPriceSuggestion() {
    return (
      <>
        <Text>Seu imóvel será avaliado por um de nossos agentes, mas conte pra gente por quanto você gostaria de vender seu imóvel.</Text>
      </>
    )
  }

  render() {
    const { pricing, location } = this.props
    let price, addressData
    if (pricing && location) {
      price = pricing.price
      addressData = location.addressData
    }
    return (
      <div ref={this.props.hostRef}>
        <Row justifyContent="center">
          <Col width={[1, 1/2]}>
            <Formik
              initialValues={{
                price: price
              }}
              isInitialValid={() => {
                return true // TODO: validate initial pricing
              }}
              render={({isValid, setFieldTouched, setFieldValue, errors}) => (
                <>
                  <View body p={4}>
                    <Text
                      fontSize="large"
                      fontWeight="bold"
                      textAlign="center">
                      Qual o valor do seu imóvel?
                    </Text>
                    <Col>
                      <StaticMap addressData={addressData} />
                    </Col>
                  </View>
                  <View bottom p={4}>
                    <NavButtons
                      previousStep={this.previousStep}
                      nextStep={this.nextStep}
                      nextEnabled={isValid}
                    />
                  </View>
                </>
              )}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Pricing
