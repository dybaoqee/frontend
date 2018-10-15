import React, { Component } from 'react'
import { Formik, Field } from 'formik'

import Button from '@emcasa/ui-dom/components/Button'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import View from '@emcasa/ui-dom/components/View'
import Text from '@emcasa/ui-dom/components/Text'
import Input from '@emcasa/ui-dom/components/Input'

class AddressInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      valid: false
    }
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.validateAddress = this.validateAddress.bind(this)
  }

  nextStep() {

  }

  previousStep() {
    this.props.previousStep('intro')
  }

  validateAddress(value) {
    const valid = !!value
    this.setState({ valid: valid })
    return valid
  }

  render() {
    return (
      <div ref={this.props.hostRef}>
        <Row justifyContent="center">
          <Col width={[1, 1/2]}>
            <View body p={4}>
              <Text
                fontSize="large"
                fontWeight="bold"
                textAlign="center"
              >
                Qual o endereço do seu imóvel?
              </Text>
              <Formik
                render={(props) => (
                  <>
                    <Col mb={4} mr={4}>
                      <Field
                        name="complement"
                        validate={this.validateAddress}
                        render={({field}) => (
                        <Input {...field} placeholder="Endereço e número*" />
                        )}/>
                    </Col>
                    <Col mr={4}>
                      <Input placeholder="Complemento" />
                    </Col>
                  </>
                )}
              />
            </View>
            <View bottom p={4}>
              <Row justifyContent="space-between">
                <Col width={5/12}>
                  <Button
                    fluid
                    height="tall"
                    onClick={this.previousStep}>Cancelar</Button>
                </Col>
                <Col width={5/12}>
                  <Button
                    fluid
                    height="tall"
                    disabled={!this.state.valid}
                    onClick={this.nextStep}>Avançar</Button>
                </Col>
              </Row>
            </View>
          </Col>
        </Row>
      </div>
    )
  }
}

export default AddressInput
