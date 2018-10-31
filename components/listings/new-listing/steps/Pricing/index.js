import React, { Component } from 'react'
import { Formik, Field } from 'formik'
import MaskedInput from 'react-text-mask'

import Icon from '@emcasa/ui-dom/components/Icon'
import Button from '@emcasa/ui-dom/components/Button'
import Input from '@emcasa/ui-dom/components/Input'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import View from '@emcasa/ui-dom/components/View'
import Text from '@emcasa/ui-dom/components/Text'
import StaticMap from 'components/listings/new-listing/shared/StaticMap'
import NavButtons from 'components/listings/new-listing/shared/NavButtons'
import {
  currencyInputMask,
  currencyStyle,
  PREFIX,
  THOUSANDS_SEPARATOR_SYMBOL
} from 'utils/text-utils'

class Pricing extends Component {
  constructor(props) {
    super(props)
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.updateStateFromProps = this.updateStateFromProps.bind(this)
    this.priceSuggestion = this.priceSuggestion.bind(this)
    this.noPriceSuggestion = this.noPriceSuggestion.bind(this)

    this.userPriceInput = null
  }

  state = {
    userPrice: null,
    suggestedPrice: null,
    editingPrice: false
  }

  componentDidMount() {
    this.updateStateFromProps(this.props)
    if (this.userPriceInput !== null) {
      this.userPriceInput.focus()
    }
  }

  componentWillReceiveProps(props) {
    this.updateStateFromProps(props)
  }

  updateStateFromProps(props) {
    const { pricing } = props
    if (pricing) {
      this.setState({
        userPrice: pricing.userPrice,
        suggestedPrice: pricing.suggestedPrice,
        editingPrice: pricing.editingPrice
      })
    }
  }

  parseUserPrice(userPrice) {
    const cleanUserPrice = userPrice.replace(PREFIX, '').replace(THOUSANDS_SEPARATOR_SYMBOL, '')
    return parseInt(cleanUserPrice)
  }

  nextStep() {
    const { navigateTo, updatePricing } = this.props
    const intUserPrice = this.parseUserPrice(this.state.userPrice)
    const intSuggestedPrice = parseInt(this.state.suggestedPrice)
    const newPricing = {
      userPrice: intUserPrice,
      suggestedPrice: intSuggestedPrice,
      editingPrice: this.state.editingPrice
    }
    updatePricing(newPricing)
    navigateTo('services')
  }

  previousStep() {
    const { navigateTo } = this.props
    navigateTo('personal')
  }

  currencyInput(errors, setFieldValue, setFieldTouched) {
    const { userPrice } = this.props.pricing
    return (
      <Field
        name="userPrice"
        validate={this.validateUserPrice}
        render={({form}) => (
          <MaskedInput
            mask={currencyInputMask}
            render={(ref, props) =>
              <Input
                {...props}
                hideLabelView
                error={form.touched.userPrice ? errors.userPrice : null}
                placeholder="R$ 000.000"
                defaultValue={userPrice}
                onChange={(e) => {
                  const { value } = e.target
                  setFieldValue('userPrice', value)
                  setFieldTouched('userPrice')
                  this.setState({userPrice: value})
                }}
                ref={(input) => {
                  this.userPriceInput = input
                  return ref(input)
                }}
              />
            }
          />
        )}
      />
    )
  }

  priceSuggestion(errors, setFieldValue, setFieldTouched) {
    const { pricing } = this.props
    const formattedSuggestedPrice = pricing.suggestedPrice.toLocaleString('pt-BR', currencyStyle)
    return (
      <Col>
        <Text color="grey">Seu imóvel foi avaliado por:</Text>
        <Text fontSize="large" fontWeight="bold" textAlign="center">{formattedSuggestedPrice}</Text>
        <Text color="grey">Recomendamos anunciar por:</Text>
            {this.state.editingPrice ?
              <Col width={[1, 1/2]} mr={4}>
                {this.currencyInput(errors, setFieldValue, setFieldTouched)}
              </Col>
              :
              <>
                <Row justifyContent="center">
                  <Col style={{width: 100}}></Col>
                  <Col>
                    <Text inline fontSize="large" fontWeight="bold" textAlign="center">{formattedSuggestedPrice}</Text>
                  </Col>
                  <Col style={{width: 100}}>
                    <Button onClick={() => this.setState({editingPrice: true})} style={{marginLeft: 20}}>
                      <Icon name="pen" color="dark" />
                    </Button>
                  </Col>
                </Row>
              </>
            }
        <Text color="grey">Não gostou da nossa avaliação? Não tem problema. É só editar o valor do seu imóvel.</Text>
      </Col>
    )
  }

  noPriceSuggestion(errors, setFieldValue, setFieldTouched) {
    return (
      <>
        <Row>
          <Col>
            <Text color="grey">Seu imóvel será avaliado por um de nossos agentes, mas conte pra gente por quanto você gostaria de vender seu imóvel.</Text>
          </Col>
        </Row>
        <Row>
          <Col width={[1, 1/2]} mr={4}>
            {this.currencyInput(errors, setFieldValue, setFieldTouched)}
          </Col>
        </Row>
      </>
    )
  }

  validateUserPrice(value) {
    if (!value || value === 'R$ ') {
      return 'É necessário informar um preço de venda.'
    }
  }

  render() {
    const { pricing, location } = this.props
    let suggestedPrice, userPrice, addressData
    if (pricing && location) {
      suggestedPrice = pricing.suggestedPrice
      userPrice = pricing.userPrice
      addressData = location.addressData
    }
    return (
      <div ref={this.props.hostRef}>
        <Row justifyContent="center">
          <Col width={[1, 1/2]}>
            <Formik
              initialValues={{
                userPrice: userPrice
              }}
              isInitialValid={() => {
                return true
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
                    {suggestedPrice ?
                      this.priceSuggestion(errors, setFieldValue, setFieldTouched)
                    :
                      this.noPriceSuggestion(errors, setFieldValue, setFieldTouched)
                    }
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
