import { Component } from 'react'
import MediaQuery from 'react-responsive'
import Head from 'next/head'

import { mainListingImage } from 'utils/image_url'
import { isAuthenticated, isAdmin, getCurrentUserId } from 'lib/auth'
import { getListing } from 'services/listing-api'
import { createInterest } from 'services/interest-api'

import Layout from 'components/main-layout'
import ListingHeader from 'components/listings/listing/header'
import ListingMainContent from 'components/listings/listing/main-content'
import ListingFooter from 'components/listings/listing/listing-footer'
import MapContainer from 'components/map-container'
import InterestForm from 'components/listings/interest_form'
import Popup from 'components/popup'

export default class Listing extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    message: '',
    showPopup: false,
    showPostSuccessPopup: false
  }

  static async getInitialProps(context) {
    const { id } = context.query

    const res = await getListing(id)

    if (res.data.errors) {
      this.setState({errors: res.data.errors})
      return {}
    }

    if (!res.data) {
      return res
    }

    return {
      listing: res.data.listing,
      currentUser: {
        id: getCurrentUserId(context),
        admin: isAdmin(context),
        authenticated: isAuthenticated(context)
      },
    }
  }

  openPopup = () => {
    this.setState({showPopup: true})
  }

  closePopup = () => {
    this.setState({showPopup: false})
  }

  closeSuccessPostPopup = () => {
    this.setState({showPostSuccessPopup: false})
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  onSubmit = async (e) => {
    e.preventDefault()

    const { id } = this.props.listing

    const res = await createInterest(id, this.state)

    if (res.data.errors) {
      this.setState({errors: res.data.errors})
      return
    }

    if (!res.data) {
      return res
    }

    this.setState({ showPopup: false, showPostSuccessPopup: true })
  }

  render() {
    const { currentUser, listing } = this.props
    const { isAuthenticated } = currentUser
    const { showPopup, showPostSuccessPopup, name, email, phone, message } = this.state
    const seoImgSrc = mainListingImage(listing.images)

    return (
      <Layout authenticated={isAuthenticated} renderFooter={true}>

        <Head>
          <title>
            À venda: Apartamento - {listing.address.street} - {listing.address.neighborhood}, {listing.address.city} | EmCasa
          </title>
          <meta name="description" content={listing.description}/>
          <meta property="og:description" content={listing.description}/>
          <meta property="og:image" content={seoImgSrc}/>
        </Head>

        <div className="listing">
          <ListingHeader listing={listing} handleOpenPopup={this.openPopup} currentUser={currentUser}/>
          <ListingMainContent listing={listing}/>

          <MediaQuery query="(max-width: 600px)">
            <MapContainer lat={listing.address.lat}
              lng={listing.address.lng}
              width='100vw'
              height='300px'/>
          </MediaQuery>

          <MediaQuery query="(min-width: 601px)">
            <MapContainer lat={listing.address.lat}
              lng={listing.address.lng}
              width='786.66667px'
              height='500px'/>
          </MediaQuery>

          <ListingFooter />

          {showPopup &&
            <InterestForm
              name={name}
              email={email}
              phone={phone}
              message={message}
              handleClose={this.closePopup}
              onChange={this.onChange}
              onSubmit={this.onSubmit}
            />
          }

          {showPostSuccessPopup &&
            <Popup handleClose={this.closeSuccessPostPopup}>
              <h1>Agente EmCasa Notificado</h1>
              <p>Entraremos em contato o mais rápido possível para agendarmos uma visita!</p>
              <button onClick={this.closeSuccessPostPopup}>Fechar</button>
            </Popup>
          }
        </div>

        <style jsx>{`
          .listing {
            margin: 0 auto;
            max-width: 100vw;
            width: 1180px;
          }
        `}</style>
      </Layout>
    )
  }
}
