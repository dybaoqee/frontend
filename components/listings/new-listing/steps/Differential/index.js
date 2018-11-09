import React, { Component } from 'react'
import { Formik, Field } from 'formik'

import Input from '@emcasa/ui-dom/components/Input'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import View from '@emcasa/ui-dom/components/View'
import Text from '@emcasa/ui-dom/components/Text'
import NavButtons from 'components/listings/new-listing/shared/NavButtons'
import { getAddressInput } from 'lib/address'
import { estimatePricing, getPricingInput } from 'lib/listings/get-pricing'
import { getUserInfo, getPhoneParts } from 'lib/user'

class Differential extends Component {
  constructor(props) {
    super(props)
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.updateStateFromProps = this.updateStateFromProps.bind(this)
    this.getUser = this.getUser.bind(this)
    this.estimatePrice = this.estimatePrice.bind(this)

    this.textInput = React.createRef()
  }

  state = {
    loading: false,
    error: null,
    text: null,
    userInfo: null,
    hasPrice: false
  }

  componentDidMount() {
    this.updateStateFromProps(this.props)
    this.textInput.current.focus()
  }

  componentWillReceiveProps(props) {
    this.updateStateFromProps(props)
  }

  updateStateFromProps(props) {
    const { differential } = props
    if (differential) {
      this.setState({
        text: differential.text
      })
    }
  }

  async nextStep() {
    const { navigateTo, updateDifferential, user } = this.props
    const authenticated = user && user.authenticated
    if (authenticated) {
      if (!this.state.userInfo) {
        await this.getUser()
      }
      if (this.state.userInfo && !this.state.hasPrice) {
        await this.estimatePrice()
      }
    } else {
      updateDifferential({text: this.state.text})
      navigateTo('phone')
    }
  }

  previousStep() {
    const { navigateTo } = this.props
    navigateTo('garage')
  }

  async getUser() {
    this.setState({loading: true})

    const userInfo = await getUserInfo(this.props.user.id)
    if (userInfo && !userInfo.error) {
      this.setState({
        userInfo,
        error: null,
        hasPrice: false
      }, () => {
        // Update user info in redux
        const { updatePhone, updatePersonal } = this.props
        const fullPhoneNumber = getPhoneParts(userInfo.phone)
        updatePhone(fullPhoneNumber)
        updatePersonal({
          name: userInfo.name,
          email: userInfo.email
        })
      })
    } else {
      this.setState({
        loading: false,
        error: userInfo.error,
        userInfo: null,
        hasPrice: false
      })
    }
  }

  async estimatePrice() {
    // Prepare input
    const { name, email } = this.state.userInfo
    const { homeDetails, rooms, garage, location } = this.props
    const addressInput = getAddressInput(location.addressData)
    const pricingInput = getPricingInput(addressInput, homeDetails, rooms, garage, name, email)

    // Run mutation
    const response = await estimatePricing(apolloClient, pricingInput)
    this.setState({
      loading: false,
      error: response.error
    })

    // Handle result
    if (response.result) {
      const suggestedPrice = response.result
      const { navigateTo, updatePricing, pricing } = this.props
      updatePricing({
        ...pricing,
        suggestedPrice
      })
      navigateTo('pricing')
    }
  }

  render() {
    const { differential } = this.props
    let text
    if (differential) {
      text = differential.text
    }
    return (
      <div ref={this.props.hostRef}>
        <Row justifyContent="center">
          <Col width={[1, 1/2]}>
            <Formik
              initialValues={{
                text: text
              }}
              isInitialValid={() => true}
              render={({isValid, setFieldTouched, setFieldValue, errors}) => (
                <>
                  <View body p={4}>
                    <Text
                      fontSize="large"
                      fontWeight="bold"
                      textAlign="center">
                      Seu imóvel tem algum diferencial?
                    </Text>
                    <Text color="grey">Conte pra gente algum diferencial do seu imóvel.</Text>
                    <Row mb={4}>
                      <Col width={1} mr={4}>
                        <Field
                          name="text"
                          render={() => (
                            <Input
                              area
                              hideLabelView
                              ref={this.textInput}
                              placeholder="Diferenciais do imóvel"
                              defaultValue={text}
                              style={{height: 150}}
                              onChange={(e) => {
                                const { value } = e.target
                                setFieldValue('text', value)
                                setFieldTouched('text')
                                this.setState({text: value})
                              }}
                            />
                          )}/>
                      </Col>
                    </Row>
                  </View>
                  <View bottom p={4}>
                    <Text color="red">{this.state.error}</Text>
                    <NavButtons
                      loading={this.state.loading}
                      previousStep={this.previousStep}
                      onSubmit={this.nextStep}
                      submitEnabled={isValid}
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

export default Differential
