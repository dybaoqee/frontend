import React, { Component } from 'react'
import { Formik, Field } from 'formik'

import Button from '@emcasa/ui-dom/components/Button'
import RadioButton from '@emcasa/ui-dom/components/RadioButton'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import View from '@emcasa/ui-dom/components/View'
import Text from '@emcasa/ui-dom/components/Text'
import NavButtons from 'components/listings/new-listing/shared/NavButtons'
import Slider from './components/Slider'
import { getTourOptions } from './times'
import { SliderButton } from './components/Slider/styles'

class Tour extends Component {
  constructor(props) {
    super(props)
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
  }

  state = {
    month: null,
    day: null,
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
        month: tour.month,
        day: tour.day,
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
    const { tour, services } = this.props
    let month, day, time
    if (tour) {
      month = tour.month
      day = tour.day
      time = tour.time
    }
    return (
      <div ref={this.props.hostRef}>
        <Row justifyContent="center">
          <Col width={[1, 1/2]}>
            <Formik
              initialValues={{
                month,
                day,
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
                        name="month"
                        render={() =>
                          <Slider maxItemsToDisplay={1}>
                            <SliderButton noBorder>Novembro de 2018</SliderButton>
                          </Slider>
                        }/>
                      </Row>
                      <Row mb={4}>
                        <Field
                          name="day"
                          render={() =>
                            <Slider maxItemsToDisplay={3}>
                              <SliderButton>11</SliderButton>
                              <SliderButton>12</SliderButton>
                              <SliderButton>13</SliderButton>
                            </Slider>
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
