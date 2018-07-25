import React, {Component} from 'react'
import Container, {StepContainer, Buttons} from './styles'
import Stepper from 'components/shared/Common/Stepper'
import EmCasaButton from 'components/shared/Common/Buttons'
import {filterComponent} from 'services/google-maps-api'
import AddressAutoComplete from './steps/AddressAutoComplete'
import PropertyInfo from './steps/PropertyInfo'
import UserInfo from './steps/UserInfo'
import EstimateSuccess from './steps/EstimateSuccess'
import OutOfService from './steps/OutOfService'
import EstimateFail from './steps/EstimateFail'
import {isEmailValid} from 'lib/validation'
import {Mutation} from 'react-apollo'
import {ESTIMATE_PRICE} from 'graphql/listings/mutations'
import {getNeighborhoods} from 'services/neighborhood-api'
import _ from 'lodash'

export default class PriceEstimate extends Component {
  state = {
    step: 1,
    canAdvance: false,
    loading: false,
    neighborhoods: [],
    listing: {
      area: 0,
      rooms: 0,
      garageSpots: 0,
      bathrooms: 0,
      name: '',
      email: ''
    }
  }

  async componentDidMount() {
    let neighborhoods = await getNeighborhoods().then(
      ({data}) => data.neighborhoods
    )
    this.setState({neighborhoods})
  }

  get buttonTexts() {
    return ['Avaliar', 'Próximo', 'Quanto vale meu imóvel?']
  }

  setChosenPlace = (placeChosen) => {
    const {listing} = this.state
    const {address_components: components} = placeChosen
    const neighborhood = filterComponent(components, 'sublocality_level_1')
      .long_name
    const street = filterComponent(components, 'route').long_name
    const streetNumber = filterComponent(components, 'street_number').long_name
    const state = filterComponent(components, 'administrative_area_level_1')
      .short_name
    const city = filterComponent(components, 'administrative_area_level_2')
      .long_name
    const postalCode = filterComponent(components, 'postal_code').long_name

    this.setState({
      canAdvance: true,
      listing: {
        ...listing,
        address: {
          city,
          lat: placeChosen.geometry.location.lat,
          lng: placeChosen.geometry.location.lng,
          neighborhood,
          postalCode,
          street,
          streetNumber,
          state
        }
      }
    })
  }

  get steps() {
    return [
      <AddressAutoComplete />,
      <PropertyInfo />,
      <UserInfo />,
      <EstimateSuccess />,
      <OutOfService />,
      <EstimateFail />
    ]
  }

  getStep = (Component) =>
    _.findIndex(this.steps, (step) => step.type === <Component />.type) + 1

  getStepContent = (page) => {
    const {listing} = this.state
    const Current = this.steps[page]
    return React.cloneElement(Current, {
      choosePlace: this.setChosenPlace,
      onChange: this.onFieldChange,
      listing
    })
  }

  nextPage = async (getSuggestedPrice) => {
    const {
      neighborhoods,
      step,
      listing: {address, name, email, area, rooms, garageSpots, bathrooms}
    } = this.state

    if (step < 3) {
      this.setState({
        step: step + 1,
        canAdvance: false
      })
    } else {
      if (neighborhoods.indexOf(address.neighborhood) === -1) {
        this.setState({
          step: this.getStep(OutOfService),
          canAdvance: false
        })

        return
      }
      const {data: {requestPriceSuggestion}} = await getSuggestedPrice({
        variables: {address, name, email, area, rooms, garageSpots, bathrooms}
      })

      const nextStep = requestPriceSuggestion.suggestedPrice
        ? this.getStep(EstimateSuccess)
        : this.getStep(EstimateFail)

      this.setState({
        listing: {
          ...this.state.listing,
          suggestedPrice: requestPriceSuggestion.suggestedPrice
        },
        step: nextStep,
        canAdvance: false
      })
    }
  }

  onFieldChange = (e) => {
    const {listing, step} = this.state
    let canAdvance = false
    const newListing = {...listing}
    newListing[e.target.name] = parseInt(e.target.value) || e.target.value

    if (step === 2) {
      canAdvance =
        newListing.area > 0 && newListing.bathrooms > 0 && newListing.rooms > 0
    } else if (step == 3) {
      canAdvance = newListing.name.length > 5 && isEmailValid(newListing.email)
    }

    this.setState({listing: newListing, canAdvance})
  }

  render() {
    const {step, canAdvance} = this.state
    const {buttonTexts, nextPage, getStepContent} = this

    return (
      <Mutation mutation={ESTIMATE_PRICE}>
        {(getSuggestedPrice, {loading}) => (
          <Container>
            <h3>Quer saber quanto vale seu imóvel?</h3>
            <Stepper steps={4} current={step <= 4 ? step : 4} />
            <StepContainer>{getStepContent(step - 1)}</StepContainer>
            {step < 4 && (
              <Buttons>
                <EmCasaButton
                  disabled={!canAdvance || loading}
                  onClick={nextPage.bind(this, getSuggestedPrice)}
                >
                  {loading ? 'Calculando...' : buttonTexts[step - 1]}
                </EmCasaButton>
              </Buttons>
            )}
          </Container>
        )}
      </Mutation>
    )
  }
}
