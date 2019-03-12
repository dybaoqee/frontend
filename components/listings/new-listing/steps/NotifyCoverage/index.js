import React, { Component } from 'react'
import { Formik, Field } from 'formik'
import { NOTIFY_WHEN_COVERED } from 'graphql/listings/mutations'
import Input from '@emcasa/ui-dom/components/Input'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Text from '@emcasa/ui-dom/components/Text'
import {withBreakpoint} from '@emcasa/ui-dom/components/Breakpoint'
import NavButtons from 'components/listings/new-listing/shared/NavButtons'
import { getAddressInput } from 'lib/address'
import Container from 'components/listings/new-listing/shared/Container'

class NotifyCoverage extends Component {
  constructor(props) {
    super(props)
    this.previousStep = this.previousStep.bind(this)
    this.submit = this.submit.bind(this)
    this.nextStep = this.nextStep.bind(this)
    this.validateName = this.validateName.bind(this)
    this.validateEmail = this.validateEmail.bind(this)
    this.nameField = React.createRef()
  }

  state = {
    name: null,
    email: null,
    loading: false,
    error: null
  }

  componentDidMount() {
    if (this.nameField.current && !this.props.isMobile) {
      this.nameField.current.focus()
    }
  }

  previousStep() {
    const { navigateTo } = this.props
    navigateTo('intro')
  }

  nextStep() {
    const { navigateTo } = this.props
    navigateTo('notifyCoverageSuccess')
  }

  async submit() {
    this.setState({loading: true})

    const { name, email } = this.state
    const { addressData } = this.props.location
    const { state, city, neighborhood } = getAddressInput(addressData)
    try {
      const { data } = await apolloClient.mutate({
        mutation: NOTIFY_WHEN_COVERED,
        variables: {
          state,
          city,
          neighborhood,
          name,
          email
        }
      })

      if (data) {
        this.setState({loading: false})
        this.nextStep()
      }
    } catch (e) {
      this.setState({
        loading: false,
        error: 'Ocorreu um erro. Por favor, tente novamente.'
      })
    }
  }

  validateName(value) {
    if (!value) {
      return "Informe seu nome."
    }
  }

  validateEmail(value) {
    const regex = /\S+@\S+\.\S+/
    if (!value || !value.match(regex)) {
      return "Informe um e-mail válido."
    }
  }

  render() {
    return (
      <div ref={this.props.hostRef}>
        <Container>
          <Col width={[1,null,null,1/2]}>
            <Formik
              isInitialValid={() => {
                return false
              }}
              render={({isValid, setFieldTouched, setFieldValue, errors}) => (
                <>
                  <Text
                    fontSize="large"
                    fontWeight="bold"
                    textAlign="center">
                    Infelizmente ainda não atendemos essa região
                  </Text>
                  <Text color="grey">Gostaria de ser notificado quando atendermos a sua área?</Text>
                  <Row>
                    <Col width={1}>
                      <Field
                        name="name"
                        validate={this.validateName}
                        render={({form}) => (
                          <Input
                            hideLabelView
                            ref={this.nameField}
                            placeholder="Nome*"
                            error={form.touched.name ? errors.name : null}
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
                    <Col width={1}>
                      <Field
                        name="email"
                        validate={this.validateEmail}
                        render={({form}) => (
                          <Input
                            hideLabelView
                            placeholder="E-mail*"
                            error={form.touched.email ? errors.email : null}
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
                      this.submit()
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

export default withBreakpoint()(NotifyCoverage)
