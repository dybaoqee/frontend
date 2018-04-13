import React, {Component} from 'react'
import Router from 'next/router'
import ReactGA from 'react-ga'
import _ from 'lodash'
import {
  redirectIfNotAuthenticated,
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

import {
  StepContainer,
  ButtonControls,
  Container
} from 'components/listings/shared/styles'
import SellingPoints from 'components/listings/new/SellingPoints'

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
      <PropertyGalleryEdit />
    ]
  }

  static async getInitialProps(ctx) {
    if (redirectIfNotAuthenticated(ctx)) {
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

  componentDidMount() {
    ReactGA.initialize(process.env.GOOGLE_ANALYTICS_TRACKING_ID)
    ReactGA.event({
      category: 'Imoveis',
      label: 'listingCreate',
      action: 'User Opened Listing Creation page'
    })
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

    if (Object.keys(errors).length > 0) {
      this.setState({
        canAdvance: false,
        showErrors: true
      })
      return
    }

    if (page === 0) {
      ReactGA.event({
        category: 'Imoveis',
        label: 'listingCreate',
        action: 'User has accessed Listing Details Page'
      })
    } else if (page === 1) {
      this.submitListing()
    }

    this.setState({
      page: page + 1,
      canRegress: true,
      canAdvance: page < 1
    })
  }

  setChosenPlace = (placeChosen) => {
    if (!placeChosen.id) return
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
    const {listing, showErrors, errors} = this.state
    return React.cloneElement(Current, {
      choosePlace: this.setChosenPlace,
      listing,
      onChange: this.onFieldChange,
      isAdmin: this.props.isAdmin,
      resetListing: this.resetListing,
      errors: showErrors ? errors : []
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

    return <div>{this.getStepContent(page)}</div>
  }

  componentWillUpdate(nextProps, nextState) {
    const {errors} = this.state
    const {errors: nextErrors} = nextState
    if (Object.keys(errors).length > 0 && Object.keys(nextErrors).length === 0)
      this.setState({
        canAdvance: true
      })
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
      listing: {...listing, [e.target.name]: e.target.value}
    })
  }

  submitListing = async () => {
    const {jwt, isAdmin} = this.props
    const postData = formatListingData(this.state.listing, [
      'price',
      'property_tax',
      'maintenance_fee',
      'area'
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

      if (isAdmin) {
        Router.replace(
          `/listings/images?listingId=${listingId}`,
          `/imoveis/${listingId}/imagens`
        ).then(() => window.scrollTo(0, 0))
      } else {
        ReactGA.event({
          category: 'Imoveis',
          label: 'listingCreate',
          action: 'User Created Listing'
        })
        window.location.replace(`/imoveis/${listingId}?r=1`)
      }

      return null
    } catch (e) {
      ReactGA.event({
        category: 'Imoveis',
        label: 'listingCreate',
        action: 'User Received Error on Listing Creation'
      })

      const errors = _.isArray(e)
        ? e
        : [e.data ? _.flattenDeep(Object.values(e.data.errors)) : e]
      this.setState({
        showErrors: true,
        canRegress: true,
        errors
      })
    }
  }

  render() {
    const {authenticated, isAdmin} = this.props
    const {page, canAdvance, canRegress, errors, showErrors} = this.state

    return (
      <Layout authenticated={authenticated} isAdmin={isAdmin}>
        <Container>
          <StepContainer>
            <h1>Adicionar Novo Imóvel</h1>
            {this.renderContent()}
            {showErrors && page > 1 && <ErrorContainer errors={errors} />}
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
              <EmCasaButton
                disabled={page > 1 || !canAdvance}
                onClick={this.nextPage}
              >
                Próximo
              </EmCasaButton>
            </ButtonControls>
          </StepContainer>
          <SellingPoints />
        </Container>
      </Layout>
    )
  }
}
