import React, { PureComponent } from 'react'
import { Formik, Field } from 'formik'

import Button from '@emcasa/ui-dom/components/Button'
import Input from '@emcasa/ui-dom/components/Input'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import View from '@emcasa/ui-dom/components/View'
import Text from '@emcasa/ui-dom/components/Text'

class HomeDetails extends PureComponent {
  constructor(props) {
    super(props)
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
  }

  nextStep() {
    
  }

  previousStep() {
    const { navigateTo } = this.props
    navigateTo('addressInput')
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
                    <Col mb={4} mr={4}>
                      <Field
                        name="homeType"
                        render={({field}) => (
                          <Input {...field} placeholder="Tipo do Imóvel*" />
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
                          render={({field}) => (
                            <Input {...field} label="Área conforme IPTU*" placeholder="Área (m²)*" type="number" />
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
                          render={({field}) => (
                            <Input {...field} placeholder="IPTU (R$/ano)*"/>
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
