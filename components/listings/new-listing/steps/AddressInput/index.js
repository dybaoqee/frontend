import React, { PureComponent } from 'react'
import { Formik, Field } from 'formik'

import Button from '@emcasa/ui-dom/components/Button'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import View from '@emcasa/ui-dom/components/View'
import Text from '@emcasa/ui-dom/components/Text'
import Input from '@emcasa/ui-dom/components/Input'

class AddressInput extends PureComponent {
  constructor(props) {
    super(props)
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.validateAddress = this.validateAddress.bind(this)
    this.updateStateFromProps = this.updateStateFromProps.bind(this)
  }

  state = {
    address: null,
    complement: null
  }

  componentDidMount() {
    this.updateStateFromProps(this.props)
  }

  componentWillReceiveProps(props) {
    this.updateStateFromProps(props)
  }

  updateStateFromProps(props) {
    const { location } = props
    if (location) {
      this.setState({
        address: location.address,
        complement: location.complement
      })
    }
  }

  nextStep() {
    const { navigateTo, updateLocation } = this.props
    updateLocation(this.state)
    navigateTo('homeDetails')
  }

  previousStep() {
    const { navigateTo } = this.props
    navigateTo('intro')
  }

  validateAddress(value) {
    if (!value) {
      return 'É necessário preencher um endereço'
    }
  }

  render() {
    const { location } = this.props
    let address, complement
    if (location) {
      address = location.address
      complement = location.complement
    }
    return (
      <div ref={this.props.hostRef}>
        <Row justifyContent="center">
          <Col width={[1, 1/2]}>
            <Formik
              initialValues={{
                address: address,
                complement: complement
              }}
              render={({isValid, dirty, setFieldValue}) => (
                <>
                  <View body p={4}>
                    <Text
                      fontSize="large"
                      fontWeight="bold"
                      textAlign="center">
                      Qual o endereço do seu imóvel?
                    </Text>
                    <Col mb={4} mr={4}>
                      <Field
                        name="address"
                        validate={this.validateAddress}
                        render={() => (
                          <Input placeholder="Endereço e número*" onChange={(e) => {
                            const { value } = e.target
                            setFieldValue('address', value)
                            this.setState({address: value})
                          }} defaultValue={address} />
                        )}/>
                    </Col>
                    <Col mr={4}>
                    <Field
                      name="complement"
                      validate={this.validateAddress}
                      render={() => (
                        <Input placeholder="Complemento" onChange={(e) => {
                          const { value } = e.target
                          setFieldValue('complement', value)
                          this.setState({complement: value})
                        }} defaultValue={complement} />
                      )} />
                    </Col>
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
                          disabled={dirty && !isValid}
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

export default AddressInput
