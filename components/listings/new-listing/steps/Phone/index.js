import React, { Component } from 'react'
import { Formik, Field } from 'formik'

import Button from '@emcasa/ui-dom/components/Button'
import Input from '@emcasa/ui-dom/components/Input'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import View from '@emcasa/ui-dom/components/View'
import Text from '@emcasa/ui-dom/components/Text'

class Phone extends Component {
  constructor(props) {
    super(props)
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.validateInternationalCode = this.validateInternationalCode.bind(this)
    this.validateLocalAreaCode = this.validateLocalAreaCode.bind(this)
    this.validateNumber = this.validateNumber.bind(this)
    this.updateStateFromProps = this.updateStateFromProps.bind(this)
  }

  state = {
    internationalCode: null,
    localAreaCode: null,
    number: null
  }

  componentDidMount() {
    this.updateStateFromProps(this.props)
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

  nextStep() {
    const { navigateTo, updatePhone } = this.props
    updatePhone(this.state)
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
      internationalCode = phone.internationalCode
      localAreaCode = phone.localAreaCode
      number = phone.number
    }
    return (
      <div ref={this.props.hostRef}>
        <Row justifyContent="center">
          <Col width={[1, 1/2]}>
            <Formik
              initialValues={{
                internationalCode: internationalCode,
                localAreaCode: localAreaCode,
                number: number
              }}
              isInitialValid={() => {
                return !(this.validateInternationalCode(internationalCode) && this.validateLocalAreaCode(localAreaCode) && this.validateNumber(number))
              }}
              render={({isValid, setFieldTouched, setFieldValue, errors}) => (
                <>
                  <View body p={4}>
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
                              placeholder="DDD*"
                              error={form.touched.localAreaCode ? errors.localAreaCode : null}
                              defaultValue={localAreaCode}
                              onChange={(e) => {
                                const { value } = e.target
                                setFieldValue('localAreaCode', value)
                                setFieldTouched('localAreaCode')
                                this.setState({localAreaCode: value})
                              }}
                            />
                          )}/>
                      </Col>
                      <Col width={6/12} mr={4}>
                        <Field
                          name="number"
                          validate={this.validateNumber}
                          render={({form}) => (
                            <Input
                              hideLabelView
                              placeholder="Celular*"
                              error={form.touched.number ? errors.number : null}
                              defaultValue={number}
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
                  </View>
                  <View bottom p={4}>
                    <Row justifyContent="space-between">
                      <Col width={5/12}>
                        <Button
                          fluid
                          height="tall"
                          onClick={this.previousStep}>Voltar</Button>
                      </Col>
                      <Col width={5/12}>
                        <Button
                          fluid
                          height="tall"
                          disabled={!isValid}
                          onClick={this.nextStep}>Avançar</Button>
                      </Col>
                    </Row>
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

export default Phone
