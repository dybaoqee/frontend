import React, { Component } from 'react'
import { Formik } from 'formik'
import moment from 'moment'

import { INSERT_LISTING, TOUR_SCHEDULE } from 'graphql/listings/mutations'
import { TOUR_OPTIONS } from 'graphql/listings/queries'
import Button from '@emcasa/ui-dom/components/Button'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import View from '@emcasa/ui-dom/components/View'
import Text from '@emcasa/ui-dom/components/Text'
import SelectCard from 'components/listings/new-listing/shared/SelectCard'
import { getAddressInput } from 'lib/address'
import { SchedulingButton } from './styles'

class Services extends Component {
  constructor(props) {
    super(props)
    this.tourStep = this.tourStep.bind(this)
    this.skipStep = this.skipStep.bind(this)
    this.nextStep = this.nextStep.bind(this)
    this.updateStateFromProps = this.updateStateFromProps.bind(this)

    this.getAvailableTimes = this.getAvailableTimes.bind(this)

    this.getListingInput = this.getListingInput.bind(this)
    this.createListing = this.createListing.bind(this)
    this.createTour = this.createTour.bind(this)
    this.save = this.save.bind(this)
  }

  state = {
    wantsTour: false,
    wantsPictures: false,
    availableTimes: null,
    loading: false,
    error: null,
    listingCreated: false,
    listingId: null,
    tourCreated: false
  }

  componentDidMount() {
    this.updateStateFromProps(this.props)
  }

  componentWillReceiveProps(props) {
    this.updateStateFromProps(props)
  }

  updateStateFromProps(props) {
    const { services } = props
    if (services) {
      this.setState({
        wantsTour: services.wantsTour,
        wantsPictures: services.wantsPictures
      })
    }
  }

  async getAvailableTimes() {
    this.setState({loading: true})
    try {
      const { data } = await apolloClient.query({
        query: TOUR_OPTIONS
      })
      this.setState({
        loading: false,
        error: null
      })
      const tourOptions = data.tourOptions.slice()
      this.tourStep(tourOptions.reverse())
    } catch (e) {
      this.setState({
        loading: false,
        error: 'Ocorreu um erro. Por favor, tente novamente.'
      })
    }
  }

  tourStep(data) {
    const { navigateTo, updateServices } = this.props
    updateServices({
      wantsTour: this.state.wantsTour,
      wantsPictures: this.state.wantsPictures,
      tourOptions: data
    })
    navigateTo('tour')
  }

  getListingInput() {
    const { location, homeDetails, rooms, garage, differential, phone, pricing } = this.props
    const { addressData, complement } = location
    const { area, floor, type, maintenanceFee, propertyTax } = homeDetails
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
      propertyTax: parseInt(propertyTax),
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
      const { wantsTour, wantsPictures } = services

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
            wantsPictures
          }
        }
      })

      if (data) {
        this.setState({tourCreated: true})
      }
    } catch (e) {
      this.setState({
        loading: false,
        error: 'Ocorreu um erro. Por favor, tente novamente.'
      })
    }
  }

  async save() {
    const { services: { wantsTour, wantsPictures } } = this.props
    const wantsServices = wantsTour || wantsPictures

    if (!this.state.listingCreated) {
      await this.createListing()
    }
    if (this.state.listingCreated && !this.state.tourCreated && wantsServices) {
      await this.createTour()
    }
    if (this.state.listingCreated && this.state.tourCreated || (this.state.listingCreated && !wantsServices)) {
      this.nextStep()
    }
  }

  skipStep() {
    const { updateServices } = this.props
    updateServices({
      wantsTour: false,
      wantsPictures: false
    })
    this.save()
  }

  nextStep() {
    const { navigateTo, updateListing } = this.props
    updateListing({id: this.state.listingId})
    navigateTo('success')
  }

  render() {
    const { services, tour } = this.props
    let wantsTour, wantsPictures
    if (services) {
      wantsTour = services.wantsTour
      wantsPictures = services.wantsPictures
    }
    let when
    if (tour && tour.day && tour.time) {
      const date = moment(tour.day).format('DD/MM/YYYY')
      when = `${date} - às ${tour.time}h`
    }
    return (
      <div ref={this.props.hostRef}>
        <Row justifyContent="center" p={4}>
          <Col width={[1, 1/2]}>
            <Formik
              initialValues={{
                wantsTour,
                wantsPictures
              }}
              render={() => (
                <>
                  <Text
                    fontSize="large"
                    fontWeight="bold"
                    textAlign="center">
                    Quer impulsionar seu imóvel?
                  </Text>
                  <Text color="grey">Fazemos um Tour Virtual 3D do seu imóvel e também tiramos fotos com qualidade profissional sem custo nenhum. Diga-nos aqui qual o melhor horário pra você:</Text>
                  <Row justifyContent="center" flexWrap="wrap">
                    <Col mr={2}>
                      <SelectCard
                        image="tour"
                        text="Quero o Tour Virtual 3D"
                        checked={this.state.wantsTour}
                        onClick={() => {
                          this.setState({wantsTour: !this.state.wantsTour})
                        }}
                      />
                    </Col>
                    <Col>
                      <SelectCard
                        image="camera"
                        text="Quero Fotos Profissionais"
                        checked={this.state.wantsPictures}
                        onClick={() => {
                          this.setState({wantsPictures: !this.state.wantsPictures})
                        }}
                      />
                    </Col>
                  </Row>
                  {(this.state.wantsTour || this.state.wantsPictures) &&
                    <Row>
                      <Col width={1} mt={2}>
                      <View><Text inline fontSize="small">Quando?</Text></View>
                      <SchedulingButton
                        height="tall"
                        fluid
                        onClick={this.getAvailableTimes}
                        color={when ? 'dark' : 'grey'}
                      >
                      {when ? when : '00/00/0000 - entre 00h e 00h'}
                      </SchedulingButton>
                      </Col>
                    </Row>
                  }
                  <Text color="red">{this.state.error}</Text>
                  <Row justifyContent="space-between" mt={4}>
                    <Col width={5/12}>
                      <Button
                        fluid
                        height="tall"
                        onClick={this.skipStep}>Não quero</Button>
                    </Col>
                    <Col width={5/12}>
                      <Button
                        fluid
                        height="tall"
                        active={!this.state.loading}
                        disabled={this.state.loading}
                        onClick={this.save}>
                        Agendar
                      </Button>
                    </Col>
                  </Row>
                </>
              )}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Services
