import React, {Component} from 'react'
import Link from 'next/link'
import Router from 'next/router'
import ReactGA from 'react-ga'
import _ from 'lodash'
import {
  redirectIfNotAuthenticated,
  getJwt,
  isAuthenticated,
  isAdmin as isAdminUser
} from 'lib/auth'
import {
  editListing,
  updateListing,
  formatListingData
} from 'services/listing-api'
import Layout from 'components/shared/Shell'
import {filterComponent} from 'services/google-maps-api'

import AddressAutoComplete from 'components/listings/new/steps/AddressAutoComplete'
import PropertyInfo from 'components/listings/new/steps/PropertyInfo'
import PropertyGallery from 'components/listings/new/steps/PropertyGallery'

import EmCasaButton from 'components/shared/Common/Buttons'
import ErrorContainer from 'components/listings/new/shared/ErrorContainer'

import {
  StepContainer,
  ButtonControls,
  Header
} from 'components/listings/shared/styles'

export default class ListingEditV2 extends Component {
  constructor(props) {
    super(props)
    let {listing} = props

    var listingFiltered = _.pickBy(listing, function(value, key) {
      return key !== 'address'
    })
    this.state = {
      page: 0,
      finished: false,
      placeChosen: {},
      canAdvance: true,
      canRegress: false,
      errors: {},
      showErrors: false,
      submitting: false,
      listing: {
        ...listingFiltered,
        ...listing.address
      }
    }
    this.steps = [
      <AddressAutoComplete />,
      <PropertyInfo />,
      <PropertyGallery />
    ]
  }

  static async getInitialProps(context) {
    if (redirectIfNotAuthenticated(context)) return {}

    const isAdmin = isAdminUser(context)

    const jwt = getJwt(context)
    const {id} = context.query

    try {
      const res = await editListing(id, jwt)

      if (res.data.errors) {
        this.setState({errors: res.data.errors})
        return {}
      }

      if (!res.data) {
        return res
      }

      return {
        id: id,
        jwt: jwt,
        listing: res.data.listing,
        isAuthenticated: isAuthenticated(context),
        isAdmin
      }
    } catch (e) {
      return {
        id: id,
        jwt: jwt,
        isAuthenticated: isAuthenticated(context),
        isAdmin: isAdmin(context)
      }
    }
  }

  componentDidMount() {
    ReactGA.initialize(process.env.GOOGLE_ANALYTICS_TRACKING_ID)
    ReactGA.event({
      category: 'Imoveis',
      label: 'listingEdit',
      action: 'User Opened Listing Edit page'
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
        label: 'listingEdit',
        action: 'User has accessed Listing Details Page'
      })
    } else if (page === 1) {
      this.editListing()
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

  editListing = async () => {
    const {jwt, id} = this.props

    const postData = formatListingData(this.state.listing, [
      'price',
      'property_tax',
      'maintenance_fee',
      'area'
    ])

    const res = await updateListing(id, postData, jwt)

    if (res.data.errors) {
      this.setState({errors: res.data.errors})
      return
    }

    if (!res.data) {
      return res
    }

    ReactGA.event({
      category: 'Imoveis',
      label: 'listingEdit',
      action: 'User Edited Listing'
    })

    const listingId = res.data.listing.id
    Router.replace(
      `/listings/show?id=${listingId}`,
      `/imoveis/${listingId}`
    ).then(() => window.scrollTo(0, 0))
    return null
  }

  render() {
    const {isAuthenticated, id, isAdmin} = this.props
    const {page, canAdvance, canRegress, errors, showErrors} = this.state
    return (
      <Layout authenticated={isAuthenticated} isAdmin={isAdmin}>
        <StepContainer>
          <Header>
            <h1>Editar Imóvel</h1>
            {page < 2 && (
              <Link
                href={`/listings/images?listingId=${id}`}
                as={`/imoveis/${id}/imagens`}
              >
                <a>Editar Imagens</a>
              </Link>
            )}
          </Header>
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
            <EmCasaButton
              disabled={page > 1 || !canAdvance}
              onClick={this.nextPage}
            >
              Próximo
            </EmCasaButton>
          </ButtonControls>
        </StepContainer>
      </Layout>
    )
  }
}
