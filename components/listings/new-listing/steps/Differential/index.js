import React, { Component } from 'react'
import { Formik, Field } from 'formik'

import Input from '@emcasa/ui-dom/components/Input'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Text from '@emcasa/ui-dom/components/Text'
import {withBreakpoint} from '@emcasa/ui-dom/components/Text'
import NavButtons from 'components/listings/new-listing/shared/NavButtons'
import { getAddressInput } from 'lib/address'
import { estimatePrice, getPricingInput } from 'lib/listings/pricing'
import { getUser, hasPhoneNumber } from 'components/listings/new-listing/lib/auth'

class Differential extends Component {
  constructor(props) {
    super(props)
    this.previousStep = this.previousStep.bind(this)
    this.updateStateFromProps = this.updateStateFromProps.bind(this)

    this.checkUserInfo = this.checkUserInfo.bind(this)
    this.estimatePrice = this.estimatePrice.bind(this)
    this.submit = this.submit.bind(this)

    this.textInput = React.createRef()
  }

  state = {
    loading: false,
    error: null,
    text: null
  }

  componentDidMount() {
    this.updateStateFromProps(this.props)
    if (this.textInput.current && !this.props.isMobile) {
      this.textInput.current.focus()
    }
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

  previousStep() {
    const { navigateTo } = this.props
    navigateTo('garage')
  }

  async checkUserInfo() {
    const { updateDifferential, user } = this.props
    updateDifferential({text: this.state.text})
    const authenticated = user && user.authenticated

    // Old site auth
    if (authenticated) {
      const { updatePhone, updatePersonal } = this.props
      try {
        const userInfo = await getUser(user.id, updatePhone, updatePersonal)
        await this.estimatePrice(userInfo)
        return
      } catch (e) {
        this.setState({
          loading: false,
          error: 'Ocorreu um erro. Por favor, tente novamente.'
        })
        return
      }
    }

    // User has already input phone number
    const { phone } = this.props
    if (hasPhoneNumber(phone)) {
      const { personal } = this.props
      if (personal && personal.name) {
        await this.estimatePrice()
        return
      } else {
        this.props.navigateTo('personal')
        return
      }
    }

    this.props.navigateTo('phone')
  }

  async estimatePrice(userInfo) {
    // Prepare input
    const { personal, homeDetails, rooms, garage, location } = this.props
    const addressInput = getAddressInput(location.addressData)
    const pricingInput = getPricingInput(addressInput, homeDetails, rooms, garage, personal, userInfo)

    // Run mutation
    const response = await estimatePrice(apolloClient, pricingInput)
    if (response.error) {
      this.setState({
        loading: false,
        error: response.error
      })
    }

    // Handle result
    if (response.result) {
      const { suggestedPrice, userPrice } = response.result
      const { navigateTo, updatePricing, updateDifferential, pricing } = this.props
      updatePricing({
        ...pricing,
        suggestedPrice,
        userPrice
      })
      updateDifferential({text: this.state.text})
      this.setState({
        loading: false,
        error: null
      })
      navigateTo('pricing')
    }
  }

  submit() {
    this.setState({loading: true})
    this.checkUserInfo()
  }

  render() {
    const { differential } = this.props
    let text
    if (differential) {
      text = differential.text
    }
    return (
      <div ref={this.props.hostRef}>
        <Row justifyContent="center" p={4} pt={0}>
          <Col width={[1, 1/2]}>
            <Formik
              initialValues={{
                text: text
              }}
              isInitialValid={() => true}
              render={({setFieldTouched, setFieldValue}) => (
                <>
                  <Text
                    fontSize="large"
                    fontWeight="bold"
                    textAlign="center">
                    Seu imóvel tem algum diferencial?
                  </Text>
                  <Text color="grey">Conte pra gente algum diferencial do seu imóvel.</Text>
                  <Row mb={4}>
                    <Col width={1}>
                      <Field
                        name="text"
                        render={() => (
                          <Input
                            area
                            hideLabelView
                            hideErrorView
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
                  <Text color="red">{this.state.error}</Text>
                  <NavButtons
                    disableEnterToSubmit
                    submitEnabled={!this.state.loading}
                    loading={this.state.loading}
                    previousStep={this.previousStep}
                    onSubmit={this.submit}
                  />
                </>
              )}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

export default withBreakpoint()(Differential)
