import React, { PureComponent } from 'react'
import MaskedInput from 'react-text-mask'
import moment from 'moment'

import { INSERT_LISTING, TOUR_SCHEDULE } from 'graphql/listings/mutations'
import Button from '@emcasa/ui-dom/components/Button'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import View from '@emcasa/ui-dom/components/View'
import Text from '@emcasa/ui-dom/components/Text'
import StaticMap from 'components/listings/new-listing/shared/StaticMap'
import { getAddressInput } from 'components/listings/new-listing/shared/AddressAutoComplete/address-input'
import { currencyStyle } from 'utils/text-utils'
import ServicesDisplay from './components/ServicesDisplay'

class Summary extends PureComponent {
  constructor(props) {
    super(props)
    this.getListingInput = this.getListingInput.bind(this)
    this.createListing = this.createListing.bind(this)
    this.createTour = this.createTour.bind(this)
    this.save = this.save.bind(this)
    this.nextStep = this.nextStep.bind(this)
  }

  state = {
    loading: false,
    error: null,
    listingCreated: false,
    listingId: null,
    tourCreated: false
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

  nextStep() {
    const { navigateTo, resetStoreExceptStep } = this.props
    resetStoreExceptStep()
    navigateTo('success')
  }

  render() {
    const { location, pricing, services, tour } = this.props
    const { suggestedPrice, userPrice } = pricing
    const { addressData } = location
    const { wantsTour, wantsPictures } = services

    const formattedSuggestedPrice = suggestedPrice ? suggestedPrice.toLocaleString('pt-BR', currencyStyle) : null
    const formattedUserPrice = userPrice ? userPrice.toLocaleString('pt-BR', currencyStyle) : null
    const address = addressData ? addressData.name : null

    return (
      <div ref={this.props.hostRef}>
        <Row justifyContent="center">
          <Col width={[1, 1/2]}>
            <View body p={4}>
              <Text
                fontSize="large"
                fontWeight="bold"
                textAlign="center">
                Resumo do seu imóvel
              </Text>
              <Col>
                <StaticMap addressData={location.addressData} />
              </Col>
              <Col>
                {suggestedPrice ?
                  <>
                    <Text color="grey">Seu imóvel da <Text inline fontWeight="bold" color="grey">{address}</Text> foi avaliado por:</Text>
                    <Text fontSize="large" fontWeight="bold" textAlign="center">{formattedSuggestedPrice}</Text>
                    <Text color="grey">Será anunciado por:</Text>
                    <Text fontSize="large" fontWeight="bold" textAlign="center">{formattedUserPrice}</Text>
                  </>
                :
                  <>
                    <Text color="grey">Seu imóvel da <Text inline fontWeight="bold" color="grey">{address}</Text> será anunciado por:</Text>
                    <Text fontSize="large" fontWeight="bold" textAlign="center">{formattedUserPrice}</Text>
                  </>
                }
                {(wantsTour || wantsPictures) &&
                  <ServicesDisplay
                    services={services}
                    tour={tour}
                  />
                }
              </Col>
            </View>
            <View bottom p={4}>
              <Button
                active={!this.state.loading}
                fluid
                height="tall"
                disabled={this.state.loading}
                onClick={this.save}
              >
                Vender meu imóvel
              </Button>
            </View>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Summary
