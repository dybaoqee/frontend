import React, {Component} from 'react'
import Carousel from 'react-slick'
import CloseButton from 'components/shared/CloseButton'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faAngleRight from '@fortawesome/fontawesome-pro-regular/faAngleRight'
import faAngleLeft from '@fortawesome/fontawesome-pro-regular/faAngleLeft'
import {thumbnailUrl} from 'utils/image_url'
import {downloadBlob} from 'utils/file-utils'
import {mobileMedia} from 'constants/media'
import {
  log,
  LISTING_DETAIL_PHOTOS_LEFT,
  LISTING_DETAIL_PHOTOS_RIGHT,
  LISTING_DETAIL_PHOTOS_FULLSCREEN_OPEN,
  LISTING_DETAIL_PHOTOS_FULLSCREEN_CLOSE
} from 'lib/logging'
import Container, {
  SpinnerWrapper,
  Spinner,
  CarouselItem,
  Arrow,
  OpenMatterportButtonWrapper
} from './styles'
import {Background} from 'components/listings/show/Popup/styles'
import {OpenMatterportButton} from '../Body/ListingInfo/styles'
import faCube from '@fortawesome/fontawesome-free-solid/faCube'
import {TEST_MATTERPORT_BUTTON_TEXT} from 'components/shared/Flagr/tests'
import Case from 'components/shared/Flagr/Case'
import Flagr from 'components/shared/Flagr'

class ListingGallery extends Component {
  state = {
    downloadingImages: false,
    nav1: null,
    nav2: null,
    isFullScreen: false,
    slidesToShow: 10
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    })
    window.focus()

    if (window.matchMedia(mobileMedia).matches) this.setState({slidesToShow: 4})

    this.keyListener = window.addEventListener('keyup', (event) => {
      if (event.defaultPrevented) {
        return
      }
      if (!this.slider2) {
        return
      }
      switch (event.keyCode) {
        case 27:
          this.setState({isFullScreen: false})
          break
        case 39:
          this.slider2.slickNext()
          break
        case 37:
          this.slider2.slickPrev()
          break
      }
    })
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.keyListener)
  }

  downloadImages = async () => {
    this.setState({downloadingImages: true})
    const {currentUser: {jwt}, listing: {id}} = this.props

    const response = await getListingImages(id, jwt)

    const blob = await response.blob()
    downloadBlob(blob, `${id}.zip`, 'application/zip')
    this.setState({downloadingImages: false})
  }

  toggleFullScreen = (index) => {
    const event = this.state.isFullScreen
      ? LISTING_DETAIL_PHOTOS_FULLSCREEN_CLOSE
      : LISTING_DETAIL_PHOTOS_FULLSCREEN_OPEN
    log(event, {listingId: this.props.listing.id})
    this.setState({isFullScreen: !this.state.isFullScreen}, () => {
      setTimeout(() => {
        if (this.slider2) {
          this.slider2.slickGoTo(index)
        }
      }, 100)
    })
  }

  getImage = ({filename}) => {
    const {id, address, type} = this.props.listing
    return (
      <img
        className="slider-image"
        decoding="async"
        key={filename}
        src={thumbnailUrl(filename, 1920, 1080)}
        alt={`Imagem ${
          type === 'Casa' ? 'da' : 'do'
        } ${type} ID-${id} na ${address.street}, ${address.neighborhood}, ${
          address.city
        } - ${address.state}`}
        loaded={this[filename]}
      />
    )
  }

  getSliderImages = () => {
    const {listing} = this.props
    const images = [...listing.images].concat(
      listing.development ? listing.development.images : []
    )
    return images.map(this.getImage)
  }

  render() {
    const {listing, openMatterportPopup, flagrFlags} = this.props
    const {matterportCode} = listing
    const {isFullScreen} = this.state
    const onClickShowTour = () => {
      this.toggleFullScreen()
      openMatterportPopup()
    }
    const settings = {
      dots: false,
      className: 'images-slider',
      infinite: false,
      slidesToShow: isFullScreen ? 1 : 3,
      slidesToScroll: isFullScreen ? 1 : 3,
      centerMode: false,
      speed: 500,
      focusOnSelect: true,
      lazyLoad: true,
      swipeToSlide: true,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: isFullScreen ? 1 : 2,
            slidesToScroll: isFullScreen ? 1 : 2
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: isFullScreen ? 1 : 1
          }
        }
      ],
      adaptiveHeight: false,
      nextArrow: <SliderArrow icon={faAngleRight} listingId={listing.id} />,
      prevArrow: (
        <SliderArrow icon={faAngleLeft} left={true} listingId={listing.id} />
      )
    }

    return (
      <Container isFullScreen={isFullScreen}>
        {listing.images.length > 0 &&
          isFullScreen && <CloseButton onClick={this.toggleFullScreen} />}
        {listing.images.length > 0 &&
          isFullScreen &&
          matterportCode && (
          <OpenMatterportButtonWrapper>
            <OpenMatterportButton onClick={onClickShowTour}>
              <FontAwesomeIcon icon={faCube} />
              <Flagr flagKey={TEST_MATTERPORT_BUTTON_TEXT}>
                <Case variant="old_text">Ver por dentro</Case>
                <Case variant="new_text">Iniciar Tour Virtual</Case>
              </Flagr>
            </OpenMatterportButton>
          </OpenMatterportButtonWrapper>
        )}
        <Carousel
          {...settings}
          asNavFor={this.state.nav1}
          ref={(slider) => (this.slider2 = slider)}
        >
          {this.getSliderImages().map((content, id) => (
            <CarouselItem
              key={content.key || id}
              onClick={() => {
                this.toggleFullScreen(id)
              }}
            >
              {content.props.src && (
                <SpinnerWrapper>
                  <Spinner />
                </SpinnerWrapper>
              )}
              {content}
            </CarouselItem>
          ))}
        </Carousel>
        <Background />
      </Container>
    )
  }
}

function SliderArrow({onClick, icon, left, listingId}) {
  return (
    <Arrow
      onClick={() => {
        const properties = {listingId}
        const event = left
          ? LISTING_DETAIL_PHOTOS_LEFT
          : LISTING_DETAIL_PHOTOS_RIGHT
        log(event, properties)
        if (onClick) {
          onClick()
        }
      }}
      left={left}
    >
      <FontAwesomeIcon icon={icon} />
    </Arrow>
  )
}

export default ListingGallery
