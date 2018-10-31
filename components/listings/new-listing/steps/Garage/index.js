import React, { Component } from 'react'
import { Formik, Field } from 'formik'

import Button from '@emcasa/ui-dom/components/Button'
import RadioButton from '@emcasa/ui-dom/components/RadioButton'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import View from '@emcasa/ui-dom/components/View'
import Text from '@emcasa/ui-dom/components/Text'
import NavButtons from 'components/listings/new-listing/shared/NavButtons'

class Garage extends Component {
  constructor(props) {
    super(props)
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.validateSpots = this.validateSpots.bind(this)
    this.validateSpotType = this.validateSpotType.bind(this)
    this.updateStateFromProps = this.updateStateFromProps.bind(this)
  }

  state = {
    spots: null,
    spotType: null
  }

  componentDidMount() {
    this.updateStateFromProps(this.props)
  }

  componentWillReceiveProps(props) {
    this.updateStateFromProps(props)
  }

  updateStateFromProps(props) {
    const { garage } = props
    if (garage) {
      this.setState({
        spots: garage.spots,
        spotType: garage.spotType
      })
    }
  }

  nextStep() {
    const { navigateTo, updateGarage } = this.props
    updateGarage(this.state)
    navigateTo('differential')
  }

  previousStep() {
    const { navigateTo } = this.props
    navigateTo('bedrooms')
  }

  validateSpots(spots) {
    if (typeof spots !== 'number') {
      return "É necessário informar o número de vagas"
    }
  }

  validateSpotType(spotType) {
    if (this.state.spots > 0 && !spotType) {
      return "É necessário informar o tipo de vaga"
    }
  }

  render() {
    const { garage } = this.props
    let spots, spotType
    if (garage) {
      spots = garage.spots
      spotType = garage.spotType
    }
    return (
      <div ref={this.props.hostRef}>
        <Row justifyContent="center">
          <Col width={[1, 1/2]}>
            <Formik
              initialValues={{
                spots: spots,
                spotType: spotType
              }}
              isInitialValid={() => {
                return !(this.validateSpots(spots) && this.validateSpotType(spotType))
              }}
              render={({isValid, setFieldTouched, setFieldValue, errors}) => (
                <>
                  <View body p={4}>
                    <Text
                      fontSize="large"
                      fontWeight="bold"
                      textAlign="center">
                      Tem vagas de garagem?
                    </Text>
                    <Text color="grey">Seu imóvel tem vagas de garagem?</Text>
                    <Row mb={4}>
                      <Field
                        name="spots"
                        validate={this.validateSpots}
                        render={() =>
                          <Button.Group flexWrap="wrap" initialValue={spots} onChange={(value) => {
                            setFieldValue('spots', value)
                            setFieldTouched('spots')
                            this.setState({spots: value})
                            }}>
                            <Button mr={2} value={0} height="tall">Não tem</Button>
                            <Button mr={2} value={1} height="tall">1</Button>
                            <Button mr={2} value={2} height="tall">2</Button>
                            <Button mr={2} value={3} height="tall">3</Button>
                            <Button mr={2} value={4} height="tall">4</Button>
                          </Button.Group>
                        }/>
                    </Row>
                    {this.state.spots > 0 && <>
                      <Text color="grey">As vagas estão na Escritura do imóvel ou são do Condomínio?</Text>
                      <Row mb={4}>
                        <Col width={1}>
                          <Field
                            name="spotType"
                            validate={this.validateSpotType}
                            render={() => (
                              <RadioButton.Group
                                selectedValue={this.state.spotType}
                                onChange={(value) => {
                                  setFieldValue('spotType', value)
                                  setFieldTouched('spotType')
                                  this.setState({spotType: value})
                                }}>
                                <RadioButton label="Vagas na Escritura" value="deed"/>
                                <View mb={2}></View>
                                <RadioButton label="Vagas no Condomínio" value="condominium" />
                              </RadioButton.Group>
                            )} />
                        </Col>
                      </Row>
                    </>}
                  </View>
                  <View bottom p={4}>
                    <NavButtons
                      previousStep={this.previousStep}
                      onSubmit={this.nextStep}
                      submitEnabled={isValid}
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

export default Garage
