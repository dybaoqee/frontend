import React, { Fragment, Component } from 'react'
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
  getTimeDisplay,
  TOUR_HOURS,
  EARLY,
  LATE,
} from 'components/listings/new-listing/lib/times'

class Tour extends Component {
  constructor(props) {
    super(props)
    this.done = this.done.bind(this)
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

  done() {
    const { navigateTo, updateTour } = this.props
    updateTour(this.state)
    navigateTo('services')
  }

  previousStep() {
    this.props.navigateTo('services')
  }

  onMonthChanged(month, monthOffset) {
    this.setState({
      month,
      monthOffset
    })
  }

  onDaySelected(day, dayOffset, setFieldTouched, setFieldValue) {
    setFieldValue('day', day)
    setFieldTouched('day')
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

  validateDay(value) {
    if (!value) {
      return 'É necessário selecionar um dia.'
    }
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
    const { time, customTime } = this.state
    if (time) {
      this.setState({
        time: null,
        customTime: true
      })
      return
    }

    if (!customTime) {
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
                return !this.validateTime(time) || !this.validateDay(day)
              }}
              render={({isValid, setFieldTouched, setFieldValue}) => (
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
                      validate={this.validateDay}
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
                            {TOUR_HOURS.map((item, index) => {
                              if (item !== EARLY && item !== LATE) {
                                return null
                              }
                              return (
                                <Fragment key={index}>
                                  <RadioButton
                                    label={getTimeDisplay(item, true)}
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
                                </Fragment>
                              )
                            })}
                          </RadioButton.Group>
                          {this.hasCustomTime(TOUR_HOURS) &&
                            <CustomTime
                              onClick={this.selectCustomTime}
                              selected={this.state.customTime}
                              selectedTime={this.state.time}
                            >
                              {TOUR_HOURS.map((item, index) => {
                                return (
                                  <Fragment key={index}>
                                    <CustomTime.Item
                                      onClick={() => {
                                        setFieldValue('time', item)
                                        setFieldTouched('time')
                                        this.selectTime(item)
                                      }}
                                    >{getTimeDisplay(item, false)}</CustomTime.Item>
                                    <View mb={2} mr={2} />
                                  </Fragment>
                                )
                              })}
                            </CustomTime>}
                        </Col>
                      }/>
                  </Row>
                  <NavButtons
                    previousStep={this.previousStep}
                    onSubmit={this.done}
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
