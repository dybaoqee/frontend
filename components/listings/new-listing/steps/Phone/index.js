import React, { Component } from 'react'
import { Formik, Field } from 'formik'
import { get } from 'lodash'

import AccountKit from 'components/shared/Auth/AccountKit'
import Input from '@emcasa/ui-dom/components/Input'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Text from '@emcasa/ui-dom/components/Text'
import {withBreakpoint} from '@emcasa/ui-dom/components/Breakpoint'
import NavButtons from 'components/listings/new-listing/shared/NavButtons'
import { getAddressInput } from 'lib/address'
import { estimatePrice, getPricingInput } from 'lib/listings/pricing'

const BRAZIL_CODE = '55'

class Phone extends Component {
  constructor(props) {
    super(props)
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.validateInternationalCode = this.validateInternationalCode.bind(this)
    this.validateLocalAreaCode = this.validateLocalAreaCode.bind(this)
    this.validateNumber = this.validateNumber.bind(this)
    this.updateStateFromProps = this.updateStateFromProps.bind(this)
    this.onLoginSuccess = this.onLoginSuccess.bind(this)
    this.estimatePrice = this.estimatePrice.bind(this)

    this.dddField = React.createRef()
    this.phoneNumberField = React.createRef()
  }

  state = {
    internationalCode: null,
    localAreaCode: null,
    number: null,
    userInfo: null,
    loading: false,
    error: null
  }

  componentDidMount() {
    this.updateStateFromProps(this.props)
    if (this.dddField.current && !this.props.isMobile) {
      this.dddField.current.focus()
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
      this.setState({loading: false})
      return
    }
    const { updatePhone } = this.props
    updatePhone({
      internationalCode: this.state.internationalCode || BRAZIL_CODE,
      localAreaCode: this.state.localAreaCode,
      number: this.state.number
    })

    const id = get(userInfo, 'data.accountKitSignIn.user.id', null)
    const name = get(userInfo, 'data.accountKitSignIn.user.name', null)
    const email = get(userInfo, 'data.accountKitSignIn.user.email', null)

    const { updatePersonal } = this.props
    updatePersonal({
      id,
      name,
      email
    })

    if (name) {
      this.estimatePrice({name, email})
    } else {
      this.nextStep()
    }
  }

  async estimatePrice(userInfo) {
    // Prepare input
    const { personal, homeDetails, rooms, garage, location } = this.props
    const addressInput = getAddressInput(location.addressData)
    const pricingInput = getPricingInput(addressInput, homeDetails, rooms, garage, personal, userInfo)

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

  nextStep() {
    const { updatePhone, navigateTo } = this.props
    updatePhone({
      internationalCode: this.state.internationalCode || BRAZIL_CODE,
      localAreaCode: this.state.localAreaCode,
      number: this.state.number
    })
    navigateTo('personal')
  }

  previousStep() {
    const { navigateTo } = this.props
    navigateTo('differential')
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

  render() {
    const { phone } = this.props
    let internationalCode, localAreaCode, number
    if (phone) {
      internationalCode = phone.internationalCode || BRAZIL_CODE
      localAreaCode = phone.localAreaCode
      number = phone.number
    }
    return (
      <div ref={this.props.hostRef}>
        <Row justifyContent="center" p={4} pt={0}>
          <Col width={[1, 1/2]}>
            <Formik
              initialValues={{
                internationalCode: internationalCode,
                localAreaCode: localAreaCode,
                number: number
              }}
              isInitialValid={() => {
                return !(this.validateInternationalCode(internationalCode) || this.validateLocalAreaCode(localAreaCode) || this.validateNumber(number))
              }}
              render={({isValid, setFieldTouched, setFieldValue, errors}) => (
                <>
                  <Text
                    fontSize="large"
                    fontWeight="bold"
                    textAlign="center">
                    Qual o número do seu celular?
                  </Text>
                  <Text color="grey">Fique tranquilo(a), seu celular não será divulgado.</Text>
                  <Row>
                    <Col width={3/12} mr={5}>
                      <Field
                        name="internationalCode"
                        validate={this.validateInternationalCode}
                        render={({form}) => (
                          <Input
                            hideLabelView
                            type="tel"
                            placeholder="DDI*"
                            error={form.touched.internationalCode ? errors.internationalCode : null}
                            defaultValue={internationalCode}
                            onChange={(e) => {
                              const { value } = e.target
                              setFieldValue('internationalCode', value)
                              setFieldTouched('internationalCode')
                              this.setState({internationalCode: value})
                            }}
                          />
                        )}/>
                    </Col>
                    <Col width={3/12} mr={5}>
                      <Field
                        name="localAreaCode"
                        validate={this.validateLocalAreaCode}
                        render={({form}) => (
                          <Input
                            hideLabelView
                            type="tel"
                            ref={this.dddField}
                            placeholder="DDD*"
                            error={form.touched.localAreaCode ? errors.localAreaCode : null}
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
                            type="tel"
                            ref={this.phoneNumberField}
                            placeholder="Celular*"
                            error={form.touched.number ? errors.number : null}
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
        </Row>
      </div>
    )
  }
}

export default withBreakpoint()(Phone)
