import React, { Component } from 'react'
import { Formik, Field } from 'formik'

import Input from '@emcasa/ui-dom/components/Input'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Text from '@emcasa/ui-dom/components/Text'
import {withBreakpoint} from '@emcasa/ui-dom/components/Breakpoint'
import NavButtons from 'components/listings/new-listing/shared/NavButtons'
import { getAddressInput } from 'lib/address'
import { estimatePrice, getPricingInput } from 'lib/listings/pricing'
import { getUserInfo } from 'lib/user'
import {EDIT_PROFILE, EDIT_EMAIL} from 'graphql/user/mutations'
import Container from 'components/listings/new-listing/shared/Container'

class Personal extends Component {
  constructor(props) {
    super(props)
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.validateName = this.validateName.bind(this)
    this.validateEmail = this.validateEmail.bind(this)
    this.estimatePrice = this.estimatePrice.bind(this)
    this.updateUserInfo = this.updateUserInfo.bind(this)
    this.updateStateFromProps = this.updateStateFromProps.bind(this)
    this.nameField = React.createRef()
  }

  state = {
    name: null,
    email: null,
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
    const { personal } = props

    if (personal) {
      this.setState({
        name: personal.name,
        email: personal.email
      })
    }
  }

  nextStep() {
    const { navigateTo, updatePersonal } = this.props
    updatePersonal({
      name: this.state.name,
      email: this.state.email
    })
    navigateTo('pricing')
  }

  previousStep() {
    const { navigateTo } = this.props
    navigateTo('bedrooms')
  }

  async updateUserInfo() {
    const userInfo = await getUserInfo(this.props.personal.id)
    if (userInfo.error) {
      this.setState({
        loading: false,
        error: 'Ocorreu um erro. Por favor, tente novamente.'
      })
      return
    }

    try {
      await apolloClient.mutate({
        mutation: EDIT_PROFILE,
        variables: {
          name: this.state.name,
          id: this.props.personal.id
        }
      })

      if (this.state.email) {
        await apolloClient.mutate({
          mutation: EDIT_EMAIL,
          variables: {
            id: this.props.personal.id,
            email: this.state.email
          }
        })
      }
    } catch (e) {
      this.setState({
        loading: false,
        error: 'Ocorreu um erro. Por favor, tente novamente.'
      })
      return
    }
  }

  async estimatePrice() {
    this.setState({loading: true})

    // If it's a new user, update its name and e-mail so we don't ask again
    await this.updateUserInfo()

    // Prepare input
    const personal = {
      name: this.state.name,
      email: this.state.email
    }
    const { homeDetails, rooms, garage, location } = this.props
    const addressInput = getAddressInput(location.addressData)
    const pricingInput = getPricingInput(addressInput, homeDetails, rooms, garage, personal)

    // Run mutation
    const response = await estimatePrice(apolloClient, pricingInput)
    this.setState({
      loading: false,
      error: response.error
    })

    // Handle result
    if (response.result) {
      const { suggestedPrice, userPrice } = response.result
      const { updatePricing, pricing } = this.props
      updatePricing({
        ...pricing,
        suggestedPrice,
        userPrice
      })
      this.nextStep()
    }
  }

  validateName(value) {
    if (!value) {
      return "Informe seu nome."
    }
  }

  validateEmail(value) {
    if (!value) {
      // It's ok if the user doesn't inform an e-mail
      return null
    }
    const regex = /\S+@\S+\.\S+/
    if (!value.match(regex)) {
      // But if they do, it has to be a valid one
      return "Informe um e-mail válido."
    }
  }

  render() {
    const { personal } = this.props
    let name, email
    if (personal) {
      name = personal.name
      email = personal.email
    }
    return (
      <div ref={this.props.hostRef}>
        <Container>
          <Col width={[1,null,null,1/2]}>
            <Formik
              initialValues={{
                name: name,
                email: email
              }}
              isInitialValid={() => {
                return !(this.validateName(name) || this.validateEmail(email))
              }}
              render={({isValid, setFieldTouched, setFieldValue, errors}) => (
                <>
                  <Text
                    fontSize="large"
                    fontWeight="bold"
                    textAlign="center">
                    Qual seu nome e e-mail?
                  </Text>
                  <Text color="grey">Não se preocupe, não vamos encher sua caixa de spam.</Text>
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
                    <Col width={1} mr={4}>
                      <Field
                        name="email"
                        validate={this.validateEmail}
                        render={({form}) => (
                          <Input
                            hideLabelView
                            placeholder="E-mail"
                            error={form.touched.email ? errors.email : null}
                            defaultValue={email}
                            onChange={(e) => {
                              const { value } = e.target
                              setFieldValue('email', value)
                              setFieldTouched('email')
                              this.setState({email: value})
                            }}
                          />
                        )}/>
                    </Col>
                  </Row>
                  <Text color="red">{this.state.error}</Text>
                  <NavButtons
                    previousStep={this.previousStep}
                    onSubmit={() => {
                      this.estimatePrice()
                    }}
                    submitEnabled={isValid}
                    loading={this.state.loading}
                  />
                </>
              )}
            />
          </Col>
        </Container>
      </div>
    )
  }
}

export default withBreakpoint()(Personal)
