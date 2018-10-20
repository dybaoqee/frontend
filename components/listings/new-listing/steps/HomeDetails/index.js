import React, { PureComponent } from 'react'
import { Formik, Field } from 'formik'

import Button from '@emcasa/ui-dom/components/Button'
import Input from '@emcasa/ui-dom/components/Input'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import View from '@emcasa/ui-dom/components/View'
import Text from '@emcasa/ui-dom/components/Text'
import Select from '@emcasa/ui-dom/components/Select'

class HomeDetails extends PureComponent {
  constructor(props) {
    super(props)
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.validateArea = this.validateArea.bind(this)
    this.validateIptu = this.validateIptu.bind(this)
    this.validateHomeType = this.validateHomeType.bind(this)
  }

  nextStep() {
    
  }

  previousStep() {
    const { navigateTo } = this.props
    navigateTo('addressInput')
  }

  validateArea(value) {
    if (!value) {
      return "É necessário informar a área do imóvel."
    }
  }

  validateIptu(value) {
    if (!value) {
      return "É necessário informar o valor do IPTU do imóvel."
    }
  }

  validateHomeType(value) {
    if (!value || value === '_placeholder') {
      return "É necessário informar o tipo do imóvel."
    }
  }

  render() {
    return (
      <div ref={this.props.hostRef}>
        <Row justifyContent="center">
          <Col width={[1, 1/2]}>
            <Formik
              render={({isValid}) => (
                <>
                  <View body p={4}>
                    <Text
                      fontSize="large"
                      fontWeight="bold"
                      textAlign="center"
                    >
                      Por favor, informe os detalhes do seu imóvel
                    </Text>
                    <Text color="grey">Com base nos detalhes do seu imóvel, calcularemos um valor médio de venda.</Text>
                    <Col mb={4}>
                      <Field
                        name="homeType"
                        validate={this.validateHomeType}
                        render={({field}) => (
                          <Select defaultValue="_placeholder" {...field}>
                            <option value="_placeholder" disabled>Tipo do Imóvel*</option>
                            <option value="house">Casa</option>
                            <option value="apartment">Apartamento</option>
                          </Select>
                        )}/>
                    </Col>
                    <Row mb={4}>
                      <Col width={1/2} mr={4}>
                        <Field
                          name="floor"
                          render={({field}) => (
                            <Input {...field} placeholder="Nº andar" type="number" />
                          )}/>
                      </Col>
                      <Col width={1/2} ml={2} mr={4}>
                        <Field
                          name="area"
                          validate={this.validateArea}
                          render={({field}) => (
                            <Input
                              label="Área conforme IPTU*"
                              placeholder="Área (m²)*"
                              type="number"
                              {...field} />
                          )}/>
                      </Col>
                    </Row>
                    <Row mb={4}>
                      <Col width={1/2} mr={4}>
                        <Field
                          name="cond"
                          render={({field}) => (
                            <Input {...field} placeholder="Cond (R$)" />
                          )}/>
                      </Col>
                      <Col width={1/2} ml={2} mr={4}>
                        <Field
                          name="iptu"
                          validate={this.validateIptu}
                          render={({field}) => (
                            <Input
                              placeholder="IPTU (R$/ano)*"
                              {...field}/>
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

export default HomeDetails
