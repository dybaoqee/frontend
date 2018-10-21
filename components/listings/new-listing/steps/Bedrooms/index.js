import React, { PureComponent } from 'react'
import { Formik, Field } from 'formik'

import Button from '@emcasa/ui-dom/components/Button'
import Input from '@emcasa/ui-dom/components/Input'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import View from '@emcasa/ui-dom/components/View'
import Text from '@emcasa/ui-dom/components/Text'

class Bedrooms extends PureComponent {
  constructor(props) {
    super(props)
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.validateBedroom = this.validateBedroom.bind(this)
    this.validateSuite = this.validateSuite.bind(this)
    this.validateBathroom = this.validateBathroom.bind(this)
  }

  nextStep() {
    
  }

  previousStep() {
    const { navigateTo } = this.props
    navigateTo('homeDetails')
  }

  validateBedroom(value) {
    if (!value) {
      return 'É necessário informar o número de quartos.'
    }
  }

  validateSuite(value) {
    if (!value) {
      return 'É necessário informar o número de suítes.'
    }
  }

  validateBathroom(value) {
    if (!value) {
      return 'É necessário informar o número de banheiros.'
    }
  }

  bedroomSelection() {
    const { bedrooms, inputBedrooms } = this.props
    const { selectBedrooms, selectMoreBedrooms } = this.props
    if (inputBedrooms) {
      return (
        <Input placeholder="Número de quartos" type="number" onBlur={(e) => {selectBedrooms(e.target.value)}} defaultValue={bedrooms} />
      )
    }
    return (
      <Button.Group initialValue={bedrooms} onChange={(value) => {value === 'more' ? selectMoreBedrooms() : selectBedrooms(value) }}>
        <Button name="1" mr={2} value={1} height="tall">1</Button>
        <Button name="2" mr={2} value={2} height="tall">2</Button>
        <Button name="3" mr={2} value={3} height="tall">3</Button>
        <Button name="4" mr={2} value={4} height="tall">4</Button>
        <Button name="5" mr={2} value={5} height="tall">5</Button>
        <Button name="more" mr={2} value="more" height="tall">+</Button>
      </Button.Group>
    )
  }

  bathroomSelection() {
    const { bathrooms, inputBathrooms } = this.props
    const { selectBathrooms, selectMoreBathrooms } = this.props
    if (inputBathrooms) {
      return (
        <Input placeholder="Número de banheiros" type="number" onBlur={(e) => {selectBathrooms(e.target.value)}} defaultValue={bathrooms} />
      )
    }
    return (
      <Button.Group initialValue={bathrooms} onChange={(value) => {value === 'more' ? selectMoreBathrooms() : selectBathrooms(value) }}>
        <Button mr={2} value={1} height="tall">1</Button>
        <Button mr={2} value={2} height="tall">2</Button>
        <Button mr={2} value={3} height="tall">3</Button>
        <Button mr={2} value={4} height="tall">4</Button>
        <Button mr={2} value={5} height="tall">5</Button>
        <Button mr={2} value="more" height="tall">+</Button>
      </Button.Group>
    )
  }

  render() {
    const { bedrooms, bathrooms, suites, selectSuites } = this.props
    return (
      <div ref={this.props.hostRef}>
        <Row justifyContent="center">
          <Col width={[1, 1/2]}>
            <Formik
              initialValues={{
                bedroom: bedrooms,
                suite: suites,
                bathroom: bathrooms
              }}
              render={({isValid, validateForm}) => (
                <>
                  <View body p={4}>
                    <Text
                      fontSize="large"
                      fontWeight="bold"
                      textAlign="center"
                    >
                      Quantos quartos?
                    </Text>
                    <Text color="grey">Quantos quartos tem no seu imóvel?</Text>
                    <Row mb={4}>
                      <Field
                        name="bedroom"
                        validate={this.validateBedroom}
                        render={() =>
                          this.bedroomSelection()
                        }/>
                    </Row>
                    <Text color="grey">Algum deles é suíte? Quantos?</Text>
                    <Row mb={4}>
                      <Field
                        name="suite"
                        validate={this.validateSuite}
                        render={() =>
                          <Button.Group initialValue={suites} onChange={selectSuites}>
                            <Button mr={2} value={0} height="tall">Sem suíte</Button>
                            <Button mr={2} value={1} height="tall">1</Button>
                            <Button mr={2} value={2} height="tall">2</Button>
                            <Button mr={2} value={3} height="tall">3</Button>
                            <Button mr={2} value={4} height="tall">4</Button>
                          </Button.Group>
                        }/>
                    </Row>
                    <Text color="grey">Quantos banheiros? (Sem contar os lavabos)</Text>
                    <Row mb={4}>
                      <Field
                        name="bathroom"
                        validate={this.validateBathroom}
                        render={() => this.bathroomSelection()} />
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

export default Bedrooms
