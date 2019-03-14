import React, { Component } from 'react'
import { Formik, Field } from 'formik'
import { get } from 'lodash'
import AccountKit from 'components/shared/Auth/AccountKit'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faWhatsApp from '@fortawesome/fontawesome-free-brands/faWhatsapp'
import Input from '@emcasa/ui-dom/components/Input'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Text from '@emcasa/ui-dom/components/Text'
import {withBreakpoint} from '@emcasa/ui-dom/components/Breakpoint'
import NavButtons from 'components/listings/new-listing/shared/NavButtons'
import View from '@emcasa/ui-dom/components/View'
import Container from 'components/listings/new-listing/shared/Container'
import { getAddressInput } from 'lib/address'
import { estimatePrice, getPricingInput } from 'lib/listings/pricing'
import {
  SELLER_ONBOARDING_PHONE_LOGIN_START,
  SELLER_ONBOARDING_PHONE_LOGIN_SUCCESS,
  SELLER_ONBOARDING_PHONE_LOGIN_CANCEL,
  log
} from 'lib/logging'

const BRAZIL_CODE = '55'

class Phone extends Component {
  constructor(props) {
    super(props)
    this.previousStep = this.previousStep.bind(this)
    this.validateName = this.validateName.bind(this)
    this.validateInternationalCode = this.validateInternationalCode.bind(this)
    this.validateLocalAreaCode = this.validateLocalAreaCode.bind(this)
    this.validateNumber = this.validateNumber.bind(this)
    this.updateStateFromProps = this.updateStateFromProps.bind(this)
    this.onLoginSuccess = this.onLoginSuccess.bind(this)
    this.estimatePrice = this.estimatePrice.bind(this)

    this.dddField = React.createRef()
    this.phoneNumberField = React.createRef()
    this.nameField = React.createRef()
  }

  state = {
    name: null,
    internationalCode: null,
    localAreaCode: null,
    number: null,
    userInfo: null,
    loading: false,
    error: null
  }

  componentDidMount() {
    this.updateStateFromProps(this.props)
    if (this.nameField.current && !this.props.isMobile) {
      this.nameField.current.focus()
    }
  }

  componentWillReceiveProps(props) {
    this.updateStateFromProps(props)
  }

  updateStateFromProps(props) {
    const { phone } = props
    if (phone) {
      this.setState({
        internationalCode: phone.internationalCode,
        localAreaCode: phone.localAreaCode,
        number: phone.number
      })
    }
  }

  onLoginSuccess(userInfo) {
    if (!userInfo) {
      log(SELLER_ONBOARDING_PHONE_LOGIN_CANCEL)
      this.setState({loading: false})
      return
    }
    const { updatePhone } = this.props
    const id = get(userInfo, 'data.accountKitSignIn.user.id', null)
    const name = get(userInfo, 'data.accountKitSignIn.user.name', null)
    updatePhone({
      internationalCode: this.state.internationalCode || BRAZIL_CODE,
      localAreaCode: this.state.localAreaCode,
      number: this.state.number,
      id,
      name
    })

    log(SELLER_ONBOARDING_PHONE_LOGIN_SUCCESS)
    this.estimatePrice({name})
  }

  async estimatePrice(userInfo) {
    // Prepare input
    const { homeDetails, rooms, garage, location } = this.props
    const addressInput = getAddressInput(location.addressData)
    const pricingInput = getPricingInput(addressInput, homeDetails, rooms, garage, userInfo)

    // Run mutation
    const response = await estimatePrice(apolloClient, pricingInput)
    this.setState({
      loading: false,
      error: response.error
    })

    // Handle result
    if (response.result) {
      const { suggestedPrice, userPrice } = response.result
      const { navigateTo, updatePricing, pricing } = this.props
      updatePricing({
        ...pricing,
        suggestedPrice,
        userPrice
      })
      navigateTo('pricing')
    }
  }

  previousStep() {
    const { navigateTo } = this.props
    navigateTo('bedrooms')
  }

  validateInternationalCode(value) {
    if (!value) {
      return "É necessário informar o DDI."
    }
  }

  validateLocalAreaCode(value) {
    if (!value) {
      return "É necessário informar o DDD."
    }
  }

  validateNumber(value) {
    if (!value) {
      return "É necessário informar o número do telefone."
    }
  }

  validateName(value) {
    if (!value) {
      return "Informe seu nome."
    }
  }

  render() {
    const { phone } = this.props
    let internationalCode, localAreaCode, number, name
    if (phone) {
      name = phone.name
      internationalCode = phone.internationalCode || BRAZIL_CODE
      localAreaCode = phone.localAreaCode
      number = phone.number
    }
    return (
      <div ref={this.props.hostRef}>
        <Container>
          <Col width={[1,null,null,1/2]}>
            <Formik
              initialValues={{
                name: name,
                internationalCode: internationalCode,
                localAreaCode: localAreaCode,
                number: number
              }}
              isInitialValid={() => {
                return !(
                  this.validateInternationalCode(internationalCode) &&
                  this.validateLocalAreaCode(localAreaCode) &&
                  this.validateNumber(number) &&
                  this.validateName(name)
                )
              }}
              render={({isValid, setFieldTouched, setFieldValue, errors}) => (
                <>
                  <Text
                    fontSize="large"
                    fontWeight="bold"
                    textAlign="center">
                    Qual o número do seu celular?
                  </Text>
                  <Text color="grey">
                    {this.props.evaluation ? "Deixe seu contato para visualizar a avaliação." : "Vamos precisar confirmar algumas informações do seu imóvel."}
                  </Text>
                  <Row>
                    <Col width={1} mr={4}>
                      <Field
                        name="name"
                        validate={this.validateName}
                        render={({form}) => (
                          <Input
                            hideLabelView
                            ref={this.nameField}
                            placeholder="Nome*"
                            error={form.touched.name ? errors.name : null}
                            defaultValue={name}
                            onChange={(e) => {
                              const { value } = e.target
                              setFieldValue('name', value)
                              setFieldTouched('name')
                              this.setState({name: value})
                            }}
                          />
                        )}/>
                    </Col>
                  </Row>
                  <Row>
                    <Col width={3/12} mr={5}>
                      <Field
                        name="localAreaCode"
                        validate={this.validateLocalAreaCode}
                        render={({form}) => (
                          <Input
                            hideLabelView
                            hideErrorView
                            type="tel"
                            ref={this.dddField}
                            placeholder="DDD*"
                            defaultValue={localAreaCode}
                            onChange={(e) => {
                              const { value } = e.target
                              setFieldValue('localAreaCode', value)
                              setFieldTouched('localAreaCode')
                              this.setState({localAreaCode: value})
                              if (value.length === 2) {
                                this.phoneNumberField.current.focus()
                              }
                            }}
                          />
                        )}/>
                    </Col>
                    <Col width={6/12}>
                      <Field
                        name="number"
                        validate={this.validateNumber}
                        render={({form}) => (
                          <Input
                            hideLabelView
                            hideErrorView
                            type="tel"
                            ref={this.phoneNumberField}
                            placeholder="Celular*"
                            defaultValue={number}
                            maxLength={9}
                            onChange={(e) => {
                              const { value } = e.target
                              setFieldValue('number', value)
                              setFieldTouched('number')
                              this.setState({number: value})
                            }}
                          />
                        )}/>
                    </Col>
                  </Row>
                  <Row alignItems="center">
                    <Text color="grey">O contato inicial será feito pelo WhatsApp.</Text>
                    <View mr={3}></View>
                    <FontAwesomeIcon icon={faWhatsApp} size="2x" color="#22cd5b" />
                  </Row>
                  <Text color="red">{this.state.error}</Text>
                  <AccountKit
                    skipRedirect
                    appId={process.env.FACEBOOK_APP_ID}
                    appSecret={process.env.ACCOUNT_KIT_APP_SECRET}
                    phoneNumber={this.state.localAreaCode + this.state.number}
                    version="v1.0"
                    onSuccess={this.onLoginSuccess}
                  >
                    {({signIn}) => (
                      <NavButtons
                        previousStep={this.previousStep}
                        onSubmit={() => {
                          log(SELLER_ONBOARDING_PHONE_LOGIN_START)
                          this.setState({loading: true}, () => {
                            signIn()
                          })
                        }}
                        loading={this.state.loading}
                        submitEnabled={isValid}
                      />
                    )}
                  </AccountKit>
                </>
              )}
            />
          </Col>
        </Container>
      </div>
    )
  }
}

export default withBreakpoint()(Phone)
