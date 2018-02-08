import {Component} from 'react'

import {isAuthenticated, isAdmin, getCurrentUserId} from 'lib/auth'
import {getListing} from 'services/listing-api'
import {createInterest} from 'services/interest-api'

import Layout from 'components/main-layout'
import ListingHead from 'components/listings/show/head'
import ListingHeader from 'components/listings/show/header'
import ImageGallery from 'components/listings/show/image-gallery'
import Matterport from 'components/listings/show/matterport'
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
    isInterestPopupVisible: false,
    isInterestSuccessPopupVisible: false,
    isImageGalleryVisible: false,
    is3DTourVisible: false,
    imageIndex: 0,
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
        authenticated: isAuthenticated(context),
      },
    }
  }

  showImageGallery = () => {
    this.setState({isImageGalleryVisible: true})
  }

  hideImageGallery = () => {
    this.setState({isImageGalleryVisible: false})
  }

  showNextImage = () => {
    const {imageIndex} = this.state
    this.setState({imageIndex: imageIndex + 1})
  }

  showPreviousImage = () => {
    const {imageIndex} = this.state
    this.setState({imageIndex: imageIndex - 1})
  }

  show3DTour = () => {
    this.setState({is3DTourVisible: true})
  }

  hide3DTour = () => {
    this.setState({is3DTourVisible: false})
  }

  openPopup = () => {
    ReactGA.initialize(process.env.GOOGLE_ANALYTICS_TRACKING_ID)
    ReactGA.event({
      category: 'Interest',
      label: 'openInterestPopup',
      action: 'User opened Popup to Book Visit',
    })

    this.setState({isInterestPopupVisible: true})
  }

  closePopup = () => {
    this.setState({isInterestPopupVisible: false})
  }

  closeSuccessPostPopup = () => {
    this.setState({isInterestSuccessPopupVisible: false})
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

    this.setState({
      isInterestPopupVisible: false,
      isInterestSuccessPopupVisible: true,
    })
  }

  render() {
    const {currentUser, listing} = this.props
    const {isAuthenticated} = currentUser
    const {
      imageIndex,
      is3DTourVisible,
      isImageGalleryVisible,
      isInterestPopupVisible,
      isInterestSuccessPopupVisible,
      name,
      email,
      phone,
      message,
    } = this.state

    return (
      <Layout authenticated={isAuthenticated} renderFooter={true}>
        {isImageGalleryVisible && (
          <ImageGallery
            images={listing.images}
            imageIndex={imageIndex}
            handlePrevious={this.showNextImage}
            handleNext={this.showPreviousImage}
            handleClose={this.hideImageGallery}
          />
        )}

        {is3DTourVisible && (
          <Matterport
            matterport_code={listing.matterport_code}
            handleClose={this.hide3DTour}
          />
        )}

        <ListingHead listing={listing} />

        <div>
          <ListingHeader
            listing={listing}
            handleOpenPopup={this.openPopup}
            handleOpenImageGallery={this.showImageGallery}
            handleOpen3DTour={this.show3DTour}
            currentUser={currentUser}
          />

          <ListingMainContent
            listing={listing}
            handleOpenPopup={this.openPopup}
          />

          <ListingMap listing={listing} />

          {isInterestPopupVisible && (
            <InterestForm
              name={name}
              email={email}
              phone={phone}
              message={message}
              handleClose={this.closePopup}
              onChange={this.onChange}
              onSubmit={this.onSubmit}
            />
          )}

          {isInterestSuccessPopupVisible && (
            <InterestPosted handleClose={this.closeSuccessPostPopup} />
          )}
        </div>
      </Layout>
    )
  }
}
