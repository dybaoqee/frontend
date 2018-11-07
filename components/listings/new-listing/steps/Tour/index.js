import React, { Component } from 'react'
import { Formik, Field } from 'formik'

import RadioButton from '@emcasa/ui-dom/components/RadioButton'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import View from '@emcasa/ui-dom/components/View'
import Text from '@emcasa/ui-dom/components/Text'
import NavButtons from 'components/listings/new-listing/shared/NavButtons'
import Slider from './components/Slider'
import CustomTime from './components/CustomTime'
import {
  getTourMonths,
  getTourDays,
  getTourHours
} from './times'
import {
  NEXT,
  PREVIOUS,
  MAX_MONTHS_TO_DISPLAY,
  MAX_DAYS_TO_DISPLAY,
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

    this.getTourMonths = this.getTourMonths.bind(this)
    this.getTourDays = this.getTourDays.bind(this)

    this.scrollMonth = this.scrollMonth.bind(this)
    this.scrollDay = this.scrollDay.bind(this)
    this.selectDay = this.selectDay.bind(this)
    this.selectTime = this.selectTime.bind(this)
    this.hasCustomTime = this.hasCustomTime.bind(this)
    this.selectCustomTime = this.selectCustomTime.bind(this)
  }

  state = {
    month: null,
    day: null,
    time: null,
    customTime: false,
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

  getTourMonths() {
    const { services: { tourOptions } } = this.props
    const { monthOffset } = this.state
    const tourMonths = getTourMonths(tourOptions)
    let i = 0
    return tourMonths.map((item) => {
      if (i < monthOffset) {
        i++
        return
      }
      if (i < MAX_MONTHS_TO_DISPLAY + monthOffset) {
        i++
        return (
          <Text
            key={item.key}
            data={item}
            noBorder
          >
            {item.display}
          </Text>
        )
      }
    })
  }

  getTourDays(setFieldTouched, setFieldValue) {
    const { services: { tourOptions } } = this.props
    const { dayOffset, month } = this.state
    const tourDays = getTourDays(tourOptions, month)
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
            onClick={() => {
              this.selectDay(item, setFieldTouched, setFieldValue)
            }}
            key={item.key}
            selected={this.state.day === item.key}
            {...item} />
        )
      }
    })
  }

  scrollMonth(direction) {
    const { services: { tourOptions } } = this.props
    const monthOffset = this.state.monthOffset + direction
    this.setState({
      monthOffset,
      dayOffset: 0,
      month: getTourMonths(tourOptions)[monthOffset].date.getMonth()
    })
  }

  scrollDay(direction) {
    this.setState({dayOffset: this.state.dayOffset + direction})
  }

  selectDay(value, setFieldTouched, setFieldValue) {
    setFieldValue('time', null)
    setFieldTouched('time')
    this.setState({
      day: value.key,
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
    let month, day, time
    if (tour) {
      month = tour.month
      day = tour.day
      time = tour.time
    }
    const { tourOptions } = services
    const { monthOffset, dayOffset } = this.state
    const tourMonths = getTourMonths(tourOptions)
    const tourDays = getTourDays(tourOptions, this.state.month)
    const tourHours = getTourHours(tourOptions, this.state.day)

    const previousMonthDisabled = monthOffset === 0
    const nextMonthDisabled = monthOffset === tourMonths.length - MAX_MONTHS_TO_DISPLAY
    const previousDayDisabled = dayOffset === 0
    const nextDayDisabled = dayOffset === tourDays.length - MAX_DAYS_TO_DISPLAY || tourDays.length <= MAX_DAYS_TO_DISPLAY

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
                return !this.validateTime(time)
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
                            onPrevious={() => {this.scrollMonth(PREVIOUS)}}
                            onNext={() => {this.scrollMonth(NEXT)}}
                          >
                            {this.getTourMonths()}
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
                            onPrevious={() => {this.scrollDay(PREVIOUS)}}
                            onNext={() => {this.scrollDay(NEXT)}}
                          >
                            {this.getTourDays(setFieldTouched, setFieldValue)}
                          </Slider>
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
