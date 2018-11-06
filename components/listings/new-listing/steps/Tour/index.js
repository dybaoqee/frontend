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
import {
  getTourMonths,
  getTourDays,
  getTourHours
} from './times'

const MAX_MONTHS_TO_DISPLAY = 1
const MAX_DAYS_TO_DISPLAY = 3

class Tour extends Component {
  constructor(props) {
    super(props)
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)

    this.getTourMonths = this.getTourMonths.bind(this)
    this.getTourDays = this.getTourDays.bind(this)

    this.previousMonth = this.previousMonth.bind(this)
    this.nextMonth = this.nextMonth.bind(this)
    this.previousDay = this.previousDay.bind(this)
    this.nextDay = this.nextDay.bind(this)
  }

  state = {
    month: null,
    day: null,
    time: null,
    dayOffset: 0,
    monthOffset: 0
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

  getTourMonths() {

  }

  getTourDays() {
    const { services: { tourOptions } } = this.props
    const { dayOffset } = this.state
    const tourDays = getTourDays(tourOptions, 10)
    let i = 0
    return tourDays.map((item) => {
      if (i < dayOffset) {
        i++
        return
      }
      if (i < MAX_DAYS_TO_DISPLAY + dayOffset) {
        i++
        return (
          <Slider.Button
            key={item.key}
            {...item} />
        )
      }
    })
  }

  nextMonth() {
    this.setState({monthOffset: this.state.monthOffset + 1})
  }

  previousMonth() {
    this.setState({monthOffset: this.state.monthOffset - 1})
  }

  nextDay() {
    this.setState({dayOffset: this.state.dayOffset + 1})
  }

  previousDay() {
    this.setState({dayOffset: this.state.dayOffset - 1})
  }

  render() {
    const { tour, services } = this.props
    let month, day, time
    if (tour) {
      month = tour.month
      day = tour.day
      time = tour.time
    }
    const { tourOptions } = services
    const tourMonths = getTourMonths(tourOptions)
    const tourDays = getTourDays(tourOptions, 10)
    const tourHours = getTourHours(tourOptions, '2018-11-16')

    const { monthOffset, dayOffset } = this.state
    const previousMonthDisabled = monthOffset === 0
    const nextMonthDisabled = monthOffset === tourMonths.length - MAX_MONTHS_TO_DISPLAY
    const previousDayDisabled = dayOffset === 0
    const nextDayDisabled = dayOffset === tourDays.length - MAX_DAYS_TO_DISPLAY

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
                          <Slider
                            previousDisabled={previousMonthDisabled}
                            nextDisabled={nextMonthDisabled}
                            onPrevious={this.previousMonth}
                            onNext={this.nextMonth}
                          >
                            {tourMonths.map((item) =>
                              <Text
                                key={item.key}
                                data={item}
                                noBorder
                              >
                                {item.display}
                              </Text>
                            )}
                          </Slider>
                        }/>
                      </Row>
                      <Row mb={4}>
                        <Field
                          name="day"
                          render={() =>
                            <Slider
                              previousDisabled={previousDayDisabled}
                              nextDisabled={nextDayDisabled}
                              onPrevious={this.previousDay}
                              onNext={this.nextDay}
                            >
                              {this.getTourDays()}
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
