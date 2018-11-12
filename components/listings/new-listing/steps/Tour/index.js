import React, { Component } from 'react'
import { Formik, Field } from 'formik'

import RadioButton from '@emcasa/ui-dom/components/RadioButton'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import View from '@emcasa/ui-dom/components/View'
import NavButtons from 'components/listings/new-listing/shared/NavButtons'
import CustomTime from './components/CustomTime'
import TourMonths from './components/TourMonths'
import TourDays from './components/TourDays'
import {
  getTourDays,
  getTourMonths,
  getTourHours
} from './times'
import {
  EARLY,
  LATE,
  EARLY_DISPLAY,
  LATE_DISPLAY
} from './constants'

class Tour extends Component {
  constructor(props) {
    super(props)
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)

    this.onMonthChanged = this.onMonthChanged.bind(this)
    this.onDaySelected = this.onDaySelected.bind(this)

    this.selectTime = this.selectTime.bind(this)
    this.hasCustomTime = this.hasCustomTime.bind(this)
    this.selectCustomTime = this.selectCustomTime.bind(this)
  }

  state = {
    month: null,
    day: null,
    time: null,
    customTime: false,
    monthOffset: 0,
    dayOffset: 0
  }

  componentDidMount() {
    this.updateStateFromProps(this.props)
  }

  componentWillReceiveProps(props) {
    this.updateStateFromProps(props)
  }

  updateStateFromProps(props) {
    const { tour, services } = props
    let firstAvailableMonth
    if (services) {
      firstAvailableMonth = getTourMonths(services.tourOptions)[0]
    }
    if (tour) {
      this.setState({
        month: tour.month || firstAvailableMonth.date.getMonth(),
        day: tour.day,
        time: tour.time,
        customTime: tour.customTime,
        dayOffset: tour.dayOffset,
        monthOffset: tour.monthOffset
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

  onMonthChanged(month, monthOffset) {
    this.setState({
      month,
      monthOffset
    })
  }

  onDaySelected(day, dayOffset, setFieldTouched, setFieldValue) {
    setFieldValue('time', null)
    setFieldTouched('time')
    this.setState({
      day,
      dayOffset,
      time: null
    })
  }

  selectTime(value) {
    this.setState({time: value})
  }

  getTimeDisplay(time, longText) {
    if (time === EARLY && longText) {
      return EARLY_DISPLAY
    } else if (time === LATE && longText) {
      return LATE_DISPLAY
    }
    return `${time}:00`
  }

  validateTime(value) {
    if (!value) {
      return 'É necessário selecionar um horário.'
    }
  }

  hasCustomTime(tourHours) {
    if (tourHours.length === 0) {
      return false
    }
    return !(tourHours.includes(EARLY) && tourHours.includes(LATE) && tourHours.length === 2)
  }

  selectCustomTime() {
    if (!this.state.customTime) {
      this.setState({
        time: null
      })
    }
    this.setState({
      customTime: true
    })
  }

  render() {
    const { tour, services } = this.props
    let month, day, time, monthOffset, dayOffset
    if (tour) {
      month = tour.month
      day = tour.day
      time = tour.time
      monthOffset = tour.monthOffset
      dayOffset = tour.dayOffset
    }
    const { tourOptions } = services
    const tourDays = getTourDays(tourOptions, this.state.month)
    const tourMonths = getTourMonths(tourOptions)
    const tourHours = getTourHours(tourOptions, this.state.day)

    return (
      <div ref={this.props.hostRef}>
        <Row justifyContent="center" p={4}>
          <Col width={[1, 1/2]}>
            <Formik
              initialValues={{
                month,
                day,
                time
              }}
              isInitialValid={() => {
                return !this.validateTime(time)
              }}
              render={({isValid, setFieldTouched, setFieldValue, errors}) => (
                <>
                  <Row mb={4}>
                    <Field
                      name="month"
                      render={() =>
                        <TourMonths
                          initialMonthOffset={monthOffset}
                          tourMonths={tourMonths}
                          onMonthChanged={this.onMonthChanged}
                        />
                      }/>
                  </Row>
                  <Row mb={4}>
                    <Field
                      name="day"
                      render={() =>
                        <TourDays
                          month={month}
                          initialDayOffset={dayOffset || this.state.dayOffset}
                          initialDay={day}
                          tourDays={tourDays}
                          onDaySelected={(day, dayOffset) => {
                            this.onDaySelected(day, dayOffset, setFieldTouched, setFieldValue)
                          }}
                        />
                      }/>
                  </Row>
                  <Row mb={4}>
                    <Field
                      name="time"
                      validate={this.validateTime}
                      render={() =>
                        <Col width={1}>
                          <RadioButton.Group>
                            {tourHours.map((item) => {
                              if (item !== EARLY && item !== LATE) {
                                return null
                              }
                              return (
                                <>
                                  <RadioButton
                                    label={this.getTimeDisplay(item, true)}
                                    value={item}
                                    checked={this.state.time === item && !this.state.customTime}
                                    onClick={() => {
                                      setFieldValue('time', item)
                                      setFieldTouched('time')
                                      this.setState({customTime: false})
                                      this.selectTime(item)
                                    }}
                                  />
                                  <View mb={2} />
                                </>
                              )
                            })}
                          </RadioButton.Group>
                          {this.hasCustomTime(tourHours) &&
                            <CustomTime
                              onClick={this.selectCustomTime}
                              selected={this.state.customTime}
                            >
                              {tourHours.map((item) => {
                                return (
                                  <>
                                    <CustomTime.Item
                                      label={this.getTimeDisplay(item, false)}
                                      value={item}
                                      checked={this.state.time === item}
                                      height="small"
                                      onClick={() => {
                                        setFieldValue('time', item)
                                        setFieldTouched('time')
                                        this.selectTime(item)
                                      }}
                                    />
                                    <View mb={2} />
                                  </>
                                )
                              })}
                            </CustomTime>}
                        </Col>
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
        </Row>
      </div>
    )
  }
}

export default Tour
