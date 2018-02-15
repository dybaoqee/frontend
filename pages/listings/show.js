import {Component} from 'react'
import ReactGA from 'react-ga'

import {isAuthenticated, isAdmin, getCurrentUserId, getJwt} from 'lib/auth'
import {getListing, getRelatedListings} from 'services/listing-api'
import {createInterest} from 'services/interest-api'

import Layout from 'components/main-layout'
import ListingHead from 'components/listings/show/head'
import ListingHeader from 'components/listings/show/Header'
import ImageGallery from 'components/listings/show/image-gallery'
import Matterport from 'components/listings/show/matterport'
import ListingMainContent from 'components/listings/show/main-content'
import ListingMap from 'components/listings/show/map'
import InterestForm from 'components/listings/show/interest_form'
import InterestPosted from 'components/listings/show/interest_posted'
import RelatedListings from 'components/listings/show/RelatedListings'

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
    const jwt = getJwt(context)
    const {id} = context.query

    const results = await Promise.all([ getListing(id, jwt), getRelatedListings(id) ])

    for(const res of results) {
      console.log(res)
      if (res.data.errors) {
        this.setState({errors: res.data.errors})
        return {}
      }

      if (!res.data) {
        return res
      }
    }

    return {
      listing: results[0].data.listing,
      related: results[1].data.listings,
      currentUser: {
        id: getCurrentUserId(context),
        admin: isAdmin(context),
        authenticated: isAuthenticated(context),
      },
    }
  }

  componentDidMount() {
    ReactGA.initialize(process.env.GOOGLE_ANALYTICS_TRACKING_ID)
    ReactGA.event({
      category: 'Imoveis',
      label: 'listingShow',
      action: 'User Opened Listing',
    })
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

  show3DTour = async () => {
    await this.setState({is3DTourVisible: true})
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

    ReactGA.initialize(process.env.GOOGLE_ANALYTICS_TRACKING_ID)
    ReactGA.event({
      category: 'Interest',
      label: 'submitInterest',
      action: 'User submitted Interest',
    })

    this.setState({
      isInterestPopupVisible: false,
      isInterestSuccessPopupVisible: true,
    })
  }

  render() {
    const {currentUser, listing, related} = this.props
    const {authenticated} = currentUser
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
      <Layout authenticated={authenticated} renderFooter={true}>
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

          <RelatedListings listings={related} />

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
