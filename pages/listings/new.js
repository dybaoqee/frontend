import React, {Component} from 'react'
import Router from 'next/router'
import {
  redirectIfNotAdmin,
  getJwt,
  isAuthenticated,
  isAdmin as isAdminUser
} from 'lib/auth'
import {createListing, formatListingData} from 'services/listing-api'
import {filterComponent} from 'services/google-maps-api'
import Layout from 'components/shared/Shell'

import AddressAutoComplete from 'components/listings/new/steps/AddressAutoComplete'
import PropertyInfo from 'components/listings/new/steps/PropertyInfo'
import PropertyGallery from 'components/listings/new/steps/PropertyGallery'
import PropertyGalleryEdit from 'components/listings/new/steps/PropertyGalleryEdit'

import EmCasaButton from 'components/shared/Common/Buttons'
import ErrorContainer from 'components/listings/new/shared/ErrorContainer'

import {StepContainer, ButtonControls} from 'components/listings/shared/styles'

export default class ListingNew extends Component {
  constructor(props) {
    super(props)

    this.state = {
      page: 0,
      finished: false,
      placeChosen: {},
      canAdvance: false,
      canRegress: false,
      errors: {},
      showErrors: false,
      submitting: false,
      listing: {}
    }

    this.steps = [
      <AddressAutoComplete />,
      <PropertyInfo />,
      <PropertyGallery />,
      <PropertyGalleryEdit />,
    ]
  }

  static async getInitialProps(ctx) {
    if (redirectIfNotAdmin(ctx)) {
      return {}
    }

    const isAdmin = isAdminUser(ctx)

    const jwt = getJwt(ctx)

    return {
      jwt: jwt,
      authenticated: isAuthenticated(ctx),
      isAdmin
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

  nextPage = () => {
    const {page, errors} = this.state

    if (page === 1) {
      this.submitListing()
      this.setState({
        page: page + 1,
        canRegress: false,
        canAdvance: false,
        submitting: true
      })
    } else {
      if (Object.keys(errors).length > 0) {
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
    const {address_components: components} = placeChosen
    const neighborhood = filterComponent(components, 'sublocality_level_1')
      .long_name
    const street = filterComponent(components, 'route').long_name
    const street_number = filterComponent(components, 'street_number').long_name
    const state = filterComponent(components, 'administrative_area_level_1')
      .short_name
    const city = filterComponent(components, 'administrative_area_level_2')
      .long_name
    const postal_code = filterComponent(components, 'postal_code').long_name

    this.setState({
      placeChosen,
      canAdvance: true,
      listing: {
        ...listing,
        ...placeChosen.geometry.location,
        neighborhood,
        street,
        street_number,
        state,
        city,
        postal_code
      }
    })
  }

  resetListing = () => {
    const {listing} = this.state
    const listingWithoutAddress = {...listing}
    delete listingWithoutAddress.street
    this.setState({
      canAdvance: false,
      listing: {
        ...listingWithoutAddress
      }
    })
  }

  getStepContent(page) {
    const Current = this.steps[page]
    const {listing} = this.state
    return React.cloneElement(Current, {
      choosePlace: this.setChosenPlace,
      listing,
      onChange: this.onFieldChange,
      isAdmin: this.props.isAdmin,
      resetListing: this.resetListing
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
    const {errors, listing} = this.state
    let updatedErrors = {...errors}

    if (errorMessage) {
      updatedErrors[e.target.name] = errorMessage
    } else {
      delete updatedErrors[e.target.name]
    }

    this.setState({
      errors: updatedErrors,
      listing: {...listing, [e.target.name]: e.target.value},
      canAdvance: Object.keys(updatedErrors).length === 0
    })
  }

  submitListing = async () => {
    const {jwt} = this.props
    const postData = formatListingData(this.state.listing, [
      'price',
      'property_tax',
      'maintenance_fee',
      'area',
    ])

    try {
      const res = await createListing(postData, jwt)

      if (res.data.errors) {
        this.setState({showErrors: true, errors: res.data.errors})
        return
      }

      if (!res.data) {
        return res
      }
      const listingId = res.data.listing.id
      Router.replace(
        `/listings/images?listingId=${listingId}`,
        `/imoveis/${listingId}/imagens`
      ).then(() => window.scrollTo(0, 0))
      return null
    } catch (e) {
      this.setState({
        showErrors: true,
        canRegress: true,
        errors: ['Ocorreu um erro desconhecido. Por favor, tente novamente.']
      })
    }
  }

  render() {
    const {authenticated, isAdmin} = this.props
    const {page, canAdvance, canRegress, errors, showErrors} = this.state

    return (
      <Layout authenticated={authenticated} isAdmin={isAdmin}>
        <StepContainer>
          <h1>Adicionar Novo Imóvel</h1>
          {this.renderContent()}
          {showErrors && <ErrorContainer errors={errors} />}
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
