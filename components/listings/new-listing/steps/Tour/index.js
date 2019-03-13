import React, { Fragment, Component } from 'react'
import { Formik, Field } from 'formik'
import * as Sentry from '@sentry/browser'
import RadioButton from '@emcasa/ui-dom/components/RadioButton'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Text from '@emcasa/ui-dom/components/Text'
import View from '@emcasa/ui-dom/components/View'
import Button from '@emcasa/ui-dom/components/Button'
import { INSERT_LISTING, TOUR_SCHEDULE } from 'graphql/listings/mutations'
import { getAddressInput } from 'lib/address'
import CustomTime from './components/CustomTime'
import TourMonths from './components/TourMonths'
import TourDays from './components/TourDays'
import Container from 'components/listings/new-listing/shared/Container'
import {
  getTourDays,
  getTourMonths,
  getTimeDisplay,
  TOUR_HOURS,
  EARLY,
  LATE,
} from 'components/listings/new-listing/lib/times'
import { BUTTON_WIDTH } from 'components/listings/new-listing/styles'

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

    this.getListingInput = this.getListingInput.bind(this)
    this.createListing = this.createListing.bind(this)
    this.createTour = this.createTour.bind(this)
    this.save = this.save.bind(this)
  }

  state = {
    month: null,
    day: null,
    time: null,
    timeRange: null,
    customTime: false,
    monthOffset: 0,
    dayOffset: 0,
    loading: false,
    listingCreted: false,
    tourCreated: false,
    error: null,
    listingId: null
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
    const { navigateTo, services, updateTour, updateServices, updateListing } = this.props
    updateTour(this.state)
    updateServices({
      wantsTour: true,
      tourOptions: services.tourOptions
    })
    updateListing({id: this.state.listingId})
    navigateTo('success')
  }

  previousStep() {
    this.props.navigateTo('services')
  }

  getListingInput() {
    const { location, homeDetails, rooms, garage, differential, phone, pricing } = this.props
    const { addressData, complement } = location
    const { area, floor, type, maintenanceFee } = homeDetails
    const { bathrooms, bedrooms, suites } = rooms
    const { spots } = garage
    const { userPrice } = pricing
    const { text } = differential
    const { internationalCode, localAreaCode, number } = phone

    const address = getAddressInput(addressData)
    return {
      address,
      area: parseInt(area),
      bathrooms,
      complement,
      description: text,
      floor,
      garageSpots: spots,
      maintenanceFee: parseInt(maintenanceFee),
      phone: internationalCode + localAreaCode + number,
      price: userPrice,
      rooms: bedrooms,
      suites,
      type
    }
  }

  async createListing() {
    this.setState({loading: true})

    try {
      const input = this.getListingInput()
      const { data } = await apolloClient.mutate({
        mutation: INSERT_LISTING,
        variables: {
          input
        }
      })

      if (data) {
        this.setState({
          listingCreated: true,
          listingId: data.insertListing.id
        })
      }
    } catch (e) {
      Sentry.captureException(e)
      this.setState({
        loading: false,
        error: 'Ocorreu um erro. Por favor, tente novamente.'
      })
    }
  }

  async createTour() {
    this.setState({loading: true})

    try {
      const { tour, services } = this.props
      const { day, time } = tour
      const { wantsTour } = services

      const datetime = moment(day + time, 'YYYY-MM-DD HH').toDate()
      const { data } = await apolloClient.mutate({
        mutation: TOUR_SCHEDULE,
        variables: {
          input: {
            listingId: this.state.listingId,
            options: {
              datetime
            },
            wantsTour,
            wantsPictures: wantsTour
          }
        }
      })

      if (data) {
        this.setState({tourCreated: true})
      }
    } catch (e) {
      Sentry.captureException(e)
      this.setState({
        loading: false,
        error: 'Ocorreu um erro. Por favor, tente novamente.'
      })
    }
  }

  async save() {
    if (!this.state.listingCreated) {
      await this.createListing()
    }
    if (this.state.listingCreated && !this.state.tourCreated && this.state.wantsTour) {
      await this.createTour()
    }
    if (this.state.listingCreated && this.state.tourCreated || (this.state.listingCreated && !this.state.wantsTour)) {
      this.nextStep()
    }
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

  selectTime(time, timeRange) {
    this.setState({
      time,
      timeRange
    })
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

  getTimeRange(time) {
    if (time === '09') {
      return ['09', '12']
    } else if (time === '17') {
      return ['16', '19']
    }
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
        <Container>
          <Col width={[1,null,null,1/2]}>
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
                  {this.state.day && <Row mb={4}>
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
                                      const timeRange = this.getTimeRange(item)
                                      this.selectTime(item, timeRange)
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
                  </Row>}
                  <Text color="red">{this.state.error}</Text>
                  <Row justifyContent="space-between" mt={4}>
                    <Col>
                      <Button
                        style={{width: BUTTON_WIDTH}}
                        height="tall"
                        onClick={this.previousStep}>Voltar</Button>
                    </Col>
                    <Col>
                      <Button
                        style={{width: BUTTON_WIDTH}}
                        height="tall"
                        active={!this.state.loading && isValid}
                        disabled={!isValid || this.state.loading}
                        onClick={this.save}>
                        Agendar
                      </Button>
                    </Col>
                  </Row>
                </>
              )}
            />
          </Col>
        </Container>
      </div>
    )
  }
}

export default Tour
