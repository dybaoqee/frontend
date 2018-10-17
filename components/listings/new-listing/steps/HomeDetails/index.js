import React, { Component } from 'react'
import Button from '@emcasa/ui-dom/components/Button'
import Input from '@emcasa/ui-dom/components/Input'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import View from '@emcasa/ui-dom/components/View'
import Text from '@emcasa/ui-dom/components/Text'

class HomeDetails extends Component {
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
            <View body p={4}>
              <Text
                fontSize="large"
                fontWeight="bold"
                textAlign="center"
              >
                Por favor, informe os detalhes do seu imóvel
              </Text>
              <Text color="grey">Com base nos detalhes do seu imóvel, calcularemos um valor médio de venda.</Text>
              <Row>
                <Col width={1} mb={4}>
                  <Input placeholder="Tipo do Imóvel*" />
                </Col>
              </Row>
              <Row>
                <Col mb={4} mr={2}>
                  <Input placeholder="Nº andar" />
                </Col>
                <Col ml={2}>
                  <Input label="Área conforme IPTU*" placeholder="Área (m²)*"/>
                </Col>
              </Row>
              <Row>
                <Col mb={4} mr={2}>
                  <Input placeholder="Cond (R$)" />
                </Col>
                <Col ml={2}>
                  <Input placeholder="IPTU (R$/ano)*"/>
                </Col>
              </Row>
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

export default HomeDetails
