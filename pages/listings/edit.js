import React, {Component, Fragment} from 'react'
import Link from 'next/link'
import Router from 'next/router'
import Error from 'components/shared/Shell/Error'
import Head from 'next/head'
import pickBy from 'lodash/pickBy'
import isArray from 'lodash/isArray'
import flattenDeep from 'lodash/flattenDeep'
import {
  redirectIfNotAuthenticated,
  getJwt,
  isAuthenticated,
  getCurrentUserId,
  isAdmin as isAdminUser
} from 'lib/auth'
import {
  editListing,
  updateListing,
  formatListingData
} from 'services/listing-api'
import {filterComponent} from 'services/google-maps-api'

import AddressAutoComplete from 'components/listings/new/steps/AddressAutoComplete'
import PropertyInfo from 'components/listings/new/steps/PropertyInfo'
import UploadStatus from 'components/listings/new/steps/UploadStatus'

import EmCasaButton from 'components/shared/Common/Buttons'
import ErrorContainer from 'components/listings/new/shared/ErrorContainer'
import {buildSlug} from 'lib/listings'

import {
  StepContainer,
  ButtonControls,
  Header,
  Container,
  Step
} from 'components/listings/shared/styles'

export default class ListingEditV2 extends Component {
  constructor(props) {
    super(props)
    let {listing} = props

    var listingFiltered = pickBy(listing, function(value, key) {
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
      listing: props.statusCode
        ? {}
        : {
            ...listingFiltered,
            ...listing.address
          }
    }
    this.steps = [<AddressAutoComplete />, <PropertyInfo />, <UploadStatus />]
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
        userId: getCurrentUserId(context),
        listing: res.data.listing,
        isAuthenticated: isAuthenticated(context),
        isAdmin,
        renderFooter: false
      }
    } catch (e) {
      const statusCode = e.response ? e.response.status : 0
      return {
        statusCode,
        id: id,
        jwt: jwt,
        isAuthenticated: isAuthenticated(context),
        isAdmin: isAdminUser(context),
        renderFooter: false
      }
    }
  }

  componentDidMount() {
    const {userId} = this.props
    window.dataLayer.push({
      action: 'Opened Listing Edit Page',
      userId,
      event: 'listing_edit_open'
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
    let submitting = false

    if (Object.keys(errors).length > 0) {
      this.setState({
        canAdvance: false,
        showErrors: true
      })
      return
    }

    if (page === 1) {
      this.editListing()
    }

    this.setState({
      page: page + 1,
      canRegress: true,
      submitting,
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
    const {listing, showErrors, errors, submitting} = this.state
    return React.cloneElement(Current, {
      choosePlace: this.setChosenPlace,
      listing,
      onChange: this.onFieldChange,
      isAdmin: this.props.isAdmin,
      resetListing: this.resetListing,
      errors: showErrors ? errors : [],
      user: this.props.user,
      apolloClient: this.props.client,
      submitting,
      editing: true
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

    try {
      const res = await updateListing(id, postData, jwt)
      if (res.data.errors) {
        this.setState({errors: res.data.errors})
        return
      }
      if (!res.data) {
        return res
      }

      window.dataLayer.push({
        action: 'User Edited Listing',
        listingId: id,
        event: 'listing_edit_success'
      })

      const listingId = res.data.listing.id
      Router.replace(
        `/listings/show?id=${listingId}`,
        buildSlug(res.data.listing)
      ).then(() => window.scrollTo(0, 0))
      return null
    } catch (e) {
      const errors = isArray(e)
        ? e
        : [e.data ? flattenDeep(Object.values(e.data.errors)) : e]
      this.setState({
        showErrors: true,
        canRegress: true,
        errors
      })
    }
  }

  render() {
    const {id, statusCode} = this.props
    const {page, canAdvance, canRegress, errors, showErrors} = this.state
    return (
      <Fragment>
        <Head>
          <title>Editar Imóvel</title>
        </Head>
        {statusCode ? (
          <Error>
            <h1>
              {statusCode === 404
                ? 'Imóvel não encontrado'
                : 'Você não tem permissão para editar esse Imóvel'}
            </h1>
            <h2>{statusCode}</h2>
            <p>
              Visite nossa <Link href="/">página inicial</Link> ou entre
              em&nbsp;
              <Link href="mailto:contato@emcasa.com">contato</Link> com a gente
            </p>
          </Error>
        ) : (
          <Container>
            <StepContainer>
              <Step>
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
              </Step>
            </StepContainer>
          </Container>
        )}
      </Fragment>
    )
  }
}
