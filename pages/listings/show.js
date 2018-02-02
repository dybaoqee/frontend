import {Component} from 'react'

import {isAuthenticated, isAdmin, getCurrentUserId} from 'lib/auth'
import {getListing} from 'services/listing-api'
import {createInterest} from 'services/interest-api'

import Layout from 'components/main-layout'
import ListingHead from 'components/listings/show/head'
import ListingHeader from 'components/listings/show/header'
import ListingMainContent from 'components/listings/show/main-content'
import ListingMap from 'components/listings/show/map'
import InterestForm from 'components/listings/interest_form'
import InterestPosted from 'components/listings/interest_posted'

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
    const {id} = context.query

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

    const {id} = this.props.listing

    const res = await createInterest(id, this.state)

    if (res.data.errors) {
      this.setState({errors: res.data.errors})
      return
    }

    if (!res.data) {
      return res
    }

    this.setState({showPopup: false, showPostSuccessPopup: true})
  }

  render() {
    const {currentUser, listing} = this.props
    const {isAuthenticated} = currentUser
    const {showPopup, showPostSuccessPopup, name, email, phone, message} = this.state

    return (
      <Layout authenticated={isAuthenticated} renderFooter={true}>

        <ListingHead listing={listing} />

        <div>
          <ListingHeader
            listing={listing}
            handleOpenPopup={this.openPopup}
            currentUser={currentUser} />

          <ListingMainContent
            listing={listing}
            handleOpenPopup={this.handleOpenPopup} />

          <ListingMap
            listing={listing} />

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
            <InterestPosted
              handleClose={this.closeSuccessPostPopup} />
          }
        </div>

        <style jsx>{`
          div {
            margin: 0 auto;
            max-width: 100vw;
          }
        `}</style>
      </Layout>
    )
  }
}
