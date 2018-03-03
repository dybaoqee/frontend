import React, {Component} from 'react'
import Router from 'next/router'
import {redirectIfNotAuthenticated, getJwt, isAuthenticated} from 'lib/auth'
import {createListing} from 'services/listing-api'
import {filterPropertyComponent} from 'services/google-maps-api'
import Layout from 'components/shared/Shell'

import AddressAutoComplete from 'components/listings/new/steps/AddressAutoComplete'
import AddressInfo from 'components/listings/new/steps/AddressInfo'
import PropertyInfo from 'components/listings/new/steps/PropertyInfo'
import PropertyGallery from 'components/listings/new/steps/PropertyGallery'
import PropertyGalleryEdit from 'components/listings/new/steps/PropertyGalleryEdit'

import EmCasaButton from 'components/shared/Common/Buttons'
import ErrorContainer from 'components/listings/new/shared/ErrorContainer'

import {
  StepContainer,
  ButtonControls
} from 'components/listings/new/shared/styles'

export default class ListingNew extends Component {
  constructor(props) {
    super(props)

    this.state = {
      page: 0,
      finished: false,
      placeChosen: {},
      canAdvance: false,
      canRegress: false,
      errors: [],
      showErrors: false,
      listing: {matterportCode: null, score: null}
    }

    this.steps = [
      <AddressAutoComplete />,
      <AddressInfo />,
      <PropertyInfo />,
      <PropertyGallery />,
      <PropertyGalleryEdit />,
    ]
  }

  static async getInitialProps(ctx) {
    if (redirectIfNotAuthenticated(ctx)) {
      return {}
    }

    const jwt = getJwt(ctx)

    return {
      jwt: jwt,
      authenticated: isAuthenticated(ctx)
    }
  }

  previousPage = () => {
    const {page} = this.state

    if (page > 0) {
      this.setState({
        page: page - 1,
        canAdvance: true,
        errors: [],
        showErrors: false
      })
    }
  }

  formatListingData = (listing, fields) => {
    let listingFomatted = {...listing}

    for (const key of Object.keys(listingFomatted)) {
      if (fields.includes(key) && listingFomatted[key]) {
        listingFomatted[key] = parseInt(
          listingFomatted[key]
            .split(',')[0]
            .match(/\d+(?:\d\.\d+)?/g)
            .join('')
        )
      }
    }

    return listingFomatted
  }

  nextPage = () => {
    const {page, errors} = this.state

    if (page === 2) {
      this.submitListing()
    } else {
      if (errors.length > 0) {
        this.setState({
          canAdvance: false,
          showErrors: true
        })
        return
      }
      this.setState({page: page + 1, canRegress: true})
    }
  }

  setChosenPlace = (placeChosen) => {
    const {listing} = this.state
    const {address_components} = placeChosen
    const neighborhood =
      filterPropertyComponent(
        placeChosen.address_components,
        'sublocality_level_1'
      ).long_name || ''
    const street = filterPropertyComponent(address_components, 'route')
      .long_name
    const streetNumber = filterPropertyComponent(
      address_components,
      'street_number'
    ).long_name
    const state = filterPropertyComponent(
      address_components,
      'administrative_area_level_1'
    ).short_name

    const city = filterPropertyComponent(
      address_components,
      'administrative_area_level_2'
    ).long_name
    const postalCode = filterPropertyComponent(
      address_components,
      'postal_code'
    ).long_name
    this.setState({
      placeChosen,
      canAdvance: true,
      listing: {
        ...listing,
        ...placeChosen.geometry.location,
        neighborhood,
        street,
        streetNumber,
        state,
        city,
        postalCode
      }
    })
  }

  getStepContent(page) {
    const Current = this.steps[page]
    const {placeChosen, listing} = this.state
    return React.cloneElement(Current, {
      ...this.props,
      choosePlace: this.setChosenPlace,
      placeChosen,
      listing,
      onChange: this.onFieldChange
    })
  }

  renderContent() {
    const {page, finished} = this.state

    if (finished) {
      return (
        <div>
          <p>The form was submitted succesfully. Thank you!</p>
        </div>
      )
    }

    return (
      <div>
        <div>{this.getStepContent(page)}</div>
      </div>
    )
  }

  onFieldChange = (e, errorMessage) => {
    let listing = Object.assign({}, this.state.listing)
    listing[e.target.name] = e.target.value
    if (errorMessage) {
      let newErrors = this.state.errors
      let errorCount = this.state.errors.filter(
        (error) => error.key === e.target.name
      ).length
      if (errorCount === 0)
        newErrors.push({key: e.target.name, value: errorMessage})
      this.setState({errors: newErrors})
    } else {
      this.setState({
        errors: [
          ...this.state.errors.filter((error) => error.key !== e.target.name),
        ],
        canAdvance: true
      })
    }
    this.setState({listing})
  }

  submitListing = async () => {
    const {jwt} = this.props
    const postData = this.formatPostData(this.state.listing, [
      'price',
      'property_tax',
      'maintenance_fee',
      'area'
    ])

    return

    const res = await createListing(postData, jwt)

    if (res.data.errors) {
      this.setState({errors: res.data.errors})
      return
    }

    if (!res.data) {
      return res
    }

    const listingId = res.data.listing.id
    Router.replace(
      `/listings/show?id=${listingId}`,
      `/imoveis/${listingId}`
    ).then(() => window.scrollTo(0, 0))
    return null
  }

  render() {
    const {authenticated} = this.props
    const {page, canAdvance, canRegress, errors, showErrors} = this.state
    return (
      <Layout authenticated={authenticated}>
        <StepContainer>
          <h1>Adicionar novo Imóvel</h1>
          {this.renderContent()}
          {showErrors && (
            <ErrorContainer errors={errors.map((error) => error.value)} />
          )}
          <ButtonControls>
            {page > 0 && (
              <EmCasaButton
                light
                disabled={!canRegress}
                onClick={this.previousPage}
              >
                Anterior
              </EmCasaButton>
            )}
            <EmCasaButton disabled={!canAdvance} onClick={this.nextPage}>
              Próximo
            </EmCasaButton>
          </ButtonControls>
        </StepContainer>
      </Layout>
    )
  }
}
