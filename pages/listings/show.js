import {Component, Fragment} from 'react'
import ReactGA from 'react-ga'

import {isAuthenticated, isAdmin, getCurrentUserId, getJwt} from 'lib/auth'
import {getListing, getRelatedListings} from 'services/listing-api'
import {createInterest} from 'services/interest-api'

import Layout from 'components/shared/Shell'
import ListingHead from 'components/listings/show/Head'
import ListingHeader from 'components/listings/show/Header'
import ImageGallery from 'components/listings/show/ImageGallery'
import Matterport from 'components/listings/show/Matterport'
import ListingMainContent from 'components/listings/show/Body'
import ListingMap from 'components/listings/show/Map'
import InterestForm from 'components/listings/show/InterestForm'
import InterestPosted from 'components/listings/show/InterestForm/interest_posted'
import RelatedListings from 'components/listings/show/RelatedListings'
import Error from 'components/shared/Shell/Error'
import Link from 'next/link'

export default class Listing extends Component {
  state = {
    interestForm: {
      name: '',
      email: '',
      phone: '',
      message: ''
    },
    isInterestPopupVisible: false,
    isInterestSuccessPopupVisible: false,
    isImageGalleryVisible: false,
    is3DTourVisible: false,
    imageIndex: 0
  }

  static async getInitialProps(context) {
    const jwt = getJwt(context)
    const {id} = context.query
    const currentUser = {
      id: getCurrentUserId(context),
      admin: isAdmin(context),
      authenticated: isAuthenticated(context)
    }
    try {
      const [listing, related] = await Promise.all([
        getListing(id, jwt).then(({data}) => data.listing),
        getRelatedListings(id).then(({data}) => data.listings)
      ])
      return {
        listing,
        related,
        currentUser
      }
    } catch (e) {
      return {
        statusCode: 404,
        currentUser
      }
    }
  }

  componentDidMount() {
    ReactGA.initialize(process.env.GOOGLE_ANALYTICS_TRACKING_ID)
    ReactGA.event({
      category: 'Imoveis',
      label: 'listingShow',
      action: 'User Opened Listing'
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
      action: 'User opened Popup to Book Visit'
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
    const {interestForm} = this.state
    interestForm[e.target.name] = e.target.value
    this.setState({interestForm})
  }

  onSubmit = async (e) => {
    e.preventDefault()

    const {interestForm} = this.state
    const {id} = this.props.listing

    const res = await createInterest(id, interestForm)

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
      action: 'User submitted Interest'
    })

    this.setState({
      isInterestPopupVisible: false,
      isInterestSuccessPopupVisible: true
    })
  }

  showListing = () => {
    const {currentUser, listing, related} = this.props
    const {
      imageIndex,
      is3DTourVisible,
      isImageGalleryVisible,
      isInterestPopupVisible,
      isInterestSuccessPopupVisible,
      interestForm
    } = this.state

    return (
      <Fragment>
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
              data={interestForm}
              handleClose={this.closePopup}
              onChange={this.onChange}
              onSubmit={this.onSubmit}
            />
          )}

          {isInterestSuccessPopupVisible && (
            <InterestPosted handleClose={this.closeSuccessPostPopup} />
          )}
        </div>
      </Fragment>
    )
  }

  render() {
    const {currentUser, statusCode} = this.props
    const {authenticated} = currentUser

    return (
      <Layout authenticated={authenticated} renderFooter={true}>
        {statusCode ? (
          <Error>
            <h1>Imóvel não encontrado</h1>
            <h2>{statusCode}</h2>
            <p>
              Visite nossa <Link href="/">página inicial</Link> ou entre
              em&nbsp;
              <Link href="mailto:contato@emcasa.com">contato</Link> com a gente
            </p>
          </Error>
        ) : (
          this.showListing()
        )}
      </Layout>
    )
  }
}
