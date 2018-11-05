import React, { Component } from 'react'
import { Formik, Field } from 'formik'

import Button from '@emcasa/ui-dom/components/Button'
import RadioButton from '@emcasa/ui-dom/components/RadioButton'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import View from '@emcasa/ui-dom/components/View'
import Text from '@emcasa/ui-dom/components/Text'
import NavButtons from 'components/listings/new-listing/shared/NavButtons'

class Tour extends Component {
  constructor(props) {
    super(props)
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
  }

  state = {
    date: null,
    time: null
  }

  componentDidMount() {
    this.updateStateFromProps(this.props)
  }

  componentWillReceiveProps(props) {
    this.updateStateFromProps(props)
  }

  updateStateFromProps(props) {
    const { tour } = props
    if (tour) {
      this.setState({
        date: tour.date,
        time: tour.time
      })
    }
  }

  nextStep() {
    const { navigateTo, updateTour } = this.props
    updateTour(this.state)
    navigateTo('summary')
  }

  previousStep() {
    const { navigateTo } = this.props
    navigateTo('services')
  }

  render() {
    const { tour } = this.props
    let date, time
    if (tour) {
      date = tour.date
      time = tour.time
    }
    return (
      <div ref={this.props.hostRef}>
        <Row justifyContent="center">
          <Col width={[1, 1/2]}>
            <Formik
              initialValues={{
                date,
                time
              }}
              isInitialValid={() => {
                return true
              }}
              render={({isValid, setFieldTouched, setFieldValue, errors}) => (
                <>
                  <View body p={4}>
                    <Row mb={4}>
                      <Field
                        name="date"
                        
                        render={() =>
                          <Button.Group flexWrap="wrap" initialValue={date} onChange={(value) => {
                            setFieldValue('date', value)
                            setFieldTouched('date')
                            this.setState({date: value})
                            }}>
                            <Button mr={2} value={0} height="tall">0</Button>
                            <Button mr={2} value={1} height="tall">1</Button>
                            <Button mr={2} value={2} height="tall">2</Button>
                            <Button mr={2} value={3} height="tall">3</Button>
                            <Button mr={2} value={4} height="tall">4</Button>
                          </Button.Group>
                        }/>
                    </Row>
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

export default Tour
