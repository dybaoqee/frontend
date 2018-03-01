import React, {Component} from 'react'
import Router from 'next/router'

import {redirectIfNotAuthenticated, getJwt, isAuthenticated} from 'lib/auth'
import {createListing} from 'services/listing-api'
import TextContainer from 'components/shared/TextContainer'
import Layout from 'components/shared/Shell'
import * as colors from 'constants/colors'

import AddressAutoComplete from 'components/listings/new/steps/AddressAutoComplete'
import AddressInfo from 'components/listings/new/steps/AddressInfo'
import PropertyInfo from 'components/listings/new/steps/PropertyInfo'
import PropertyGallery from 'components/listings/new/steps/PropertyGallery'
import PropertyGalleryEdit from 'components/listings/new/steps/PropertyGalleryEdit'

import EmCasaButton from 'components/shared/Common/Buttons'
import {
  StepContainer,
  ButtonControls
} from 'components/listings/new/shared/styles'

export default class ListingNew extends Component {
  constructor(props) {
    super(props)

    this.state = {
      page: 0,
      loading: false,
      finished: false,
      city: 'Rio de Janeiro',
      state: 'RJ',
      placeChosen: {},
      canAdvance: false,
      canRegress: false
    }

    this.steps = [
      <AddressAutoComplete />,
      <AddressInfo />,
      <PropertyInfo />,
      <PropertyGallery />,
      <PropertyGalleryEdit />
    ]
  }

  previousPage = () => {
    const {page} = this.state

    if (page > 0) {
      this.setState({
        page: page - 1
      })
    }
  }

  nextPage = () => {
    const {page, canAdvance} = this.state

    if (page === 4) {
      console.log('FINISHED')
    } else {
      if (canAdvance)
        this.setState({
          page: page + 1,
          canRegress: true
        })
    }
  }

  setChosenPlace = (placeChosen) => {
    this.setState({placeChosen, canAdvance: true})
  }

  getStepContent(page) {
    const Current = this.steps[page]
    const {placeChosen} = this.state
    return React.cloneElement(Current, {
      ...this.props,
      choosePlace: this.setChosenPlace,
      placeChosen
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

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    const {jwt} = this.props

    const res = await createListing(this.state, jwt)

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
    const {page, loading, canAdvance, canRegress} = this.state
    const {
      errors,
      street,
      streetNumber,
      complement,
      city,
      state,
      postalCode,
      lat,
      lng,
      neighborhood,
      description,
      type,
      price,
      area,
      floor,
      rooms,
      bathrooms,
      matterportCode,
      score,
      garageSpots
    } = this.state

    return (
      <Layout authenticated={authenticated}>
        <StepContainer>
          <h1>Adicionar novo Imóvel</h1>
          {this.renderContent()}
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
