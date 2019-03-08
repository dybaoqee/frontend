import React, { Component } from 'react'
import { Formik, Field } from 'formik'
import Button from '@emcasa/ui-dom/components/Button'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Text from '@emcasa/ui-dom/components/Text'
import NavButtons from 'components/listings/new-listing/shared/NavButtons'
import Container from 'components/listings/new-listing/shared/Container'

class Garage extends Component {
  constructor(props) {
    super(props)
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.validateSpots = this.validateSpots.bind(this)
    this.updateStateFromProps = this.updateStateFromProps.bind(this)
  }

  state = {
    spots: null
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
        spots: garage.spots
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

  render() {
    const { garage } = this.props
    let spots
    if (garage) {
      spots = garage.spots
    }
    return (
      <div ref={this.props.hostRef}>
        <Container>
          <Col width={[1,null,null,1/2]}>
            <Formik
              initialValues={{
                spots: spots
              }}
              isInitialValid={() => {
                return !this.validateSpots(spots)
              }}
              render={({isValid, setFieldTouched, setFieldValue}) => (
                <>
                  <Text
                    fontSize="large"
                    fontWeight="bold"
                    textAlign="center">
                    Tem vagas de garagem?
                  </Text>
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
                          <Button mr={2} px={3} value={0} height="tall">Não tem</Button>
                          <Button mr={2} px={3} value={1} height="tall">1</Button>
                          <Button mr={2} px={3} value={2} height="tall">2</Button>
                          <Button mr={2} px={3} value={3} height="tall">3</Button>
                          <Button mr={2} px={3} value={4} height="tall">4</Button>
                        </Button.Group>
                      }/>
                  </Row>
                  <NavButtons
                    previousStep={this.previousStep}
                    onSubmit={this.nextStep}
                    submitEnabled={isValid}
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

export default Garage
