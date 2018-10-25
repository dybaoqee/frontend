import React, { Component } from 'react'
import { Formik, Field } from 'formik'

import Input from '@emcasa/ui-dom/components/Input'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import View from '@emcasa/ui-dom/components/View'
import Text from '@emcasa/ui-dom/components/Text'
import NavButtons from 'components/listings/new-listing/shared/NavButtons'

class Personal extends Component {
  constructor(props) {
    super(props)
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.validateName = this.validateName.bind(this)
    this.validateEmail = this.validateEmail.bind(this)
    this.updateStateFromProps = this.updateStateFromProps.bind(this)
    this.nameField = React.createRef()
  }

  state = {
    name: null,
    email: null
  }

  componentDidMount() {
    this.updateStateFromProps(this.props)
    this.nameField.current.focus()
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
    updatePersonal(this.state)
  }

  previousStep() {
    const { navigateTo } = this.props
    navigateTo('phone')
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
        <Row justifyContent="center">
          <Col width={[1, 1/2]}>
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
                  <View body p={4}>
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

export default Personal
