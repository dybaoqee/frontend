import {Component, Fragment} from 'react'
import Link from 'next/link'
import LikeButton from 'components/shared/Common/Buttons/Like'
import Container, {
  Thumb,
  Content,
  Arrow,
  TourWrapper,
  SliderNavigation,
  BottomRight
} from './styles'
import Matterport from 'components/listings/show/Matterport'
import {canEdit} from 'permissions/listings-permissions'
import {getListingImages} from 'services/listing-api'
import {Mutation} from 'react-apollo'
import {VISUALIZE_TOUR} from 'graphql/listings/mutations'
import {downloadBlob} from 'utils/file-utils'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faFileAlt from '@fortawesome/fontawesome-free-solid/faDownload'
import EmCasaButton from 'components/shared/Common/Buttons'
import Carousel from 'react-slick'
import {thumbnailUrl} from 'utils/image_url'
import faAngleRight from '@fortawesome/fontawesome-pro-regular/faAngleRight'
import faAngleLeft from '@fortawesome/fontawesome-pro-regular/faAngleLeft'
import faCube from '@fortawesome/fontawesome-pro-light/faCube'
import faExpand from '@fortawesome/fontawesome-pro-light/faExpandArrows'
import faMinimize from '@fortawesome/fontawesome-pro-light/faCompressAlt'
import {mobileMedia} from 'constants/media'
import {
  log,
  LISTING_DETAIL_PHOTOS_LEFT,
  LISTING_DETAIL_PHOTOS_RIGHT,
  LISTING_DETAIL_PHOTOS_FULLSCREEN_OPEN,
  LISTING_DETAIL_PHOTOS_FULLSCREEN_CLOSE,
} from 'lib/logging'

export default class ListingHeader extends Component {
  state = {
    downloadingImages: false,
    nav1: null,
    nav2: null,
    show3DTour: false,
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
      if (!this.slider1) {
        return
      }
      switch (event.keyCode) {
        case 27:
          this.setState({isFullScreen: false})
          break
        case 39:
          this.slider1.slickNext()
          break
        case 37:
          this.slider1.slickPrev()
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

  hide3DTour = () => this.setState({show3DTour: false})
  toggleFullScreen = () => {
    const event = this.state.isFullScreen ? LISTING_DETAIL_PHOTOS_FULLSCREEN_CLOSE : LISTING_DETAIL_PHOTOS_FULLSCREEN_OPEN
    log(event, {listingId: this.props.listing.id})
    this.setState(({isFullScreen}) => ({isFullScreen: !isFullScreen}))
  }

  getSliderImages = () => {
    const {id, images, price, address, type} = this.props.listing
    return (
      images.map(({filename}) => {
        return (
          <img
            className="slider-image"
            decoding="async"
            key={filename}
            src={thumbnailUrl(filename, 1920, 1080)}
            alt={`Imagem ${type === 'Apartamento' ? 'do' : 'da'} ${type} ID-${id} na ${address.street}, ${address.neighborhood}, ${address.city} - ${address.state}`}
            innerRef={(currentImage) => (this[filename] = currentImage)}
            loaded={this[filename]}
          />
        )
      })
    )
  }

  getSliderContent = (visualizeTour) => {
    const {listing: {matterportCode, id}} = this.props
    const src = `https://my.matterport.com/show/?m=${matterportCode}`
    const sliderContent = this.getSliderImages()
    if (matterportCode) {
      sliderContent.unshift(
        <TourWrapper isFullScreen={this.state.isFullScreen}>
          <iframe
            width="100%"
            height="400px"
            src={src}
            frameBorder="0"
            allowFullScreen
          />
          <div
            className="overlay"
            onClick={() => {
              visualizeTour({variables: {id}})
              this.setState({show3DTour: true})
            }}
          />
        </TourWrapper>
      )
    }

    return sliderContent
  }

  getSliderNavigation = () => {
    const {listing: {id, images, matterportCode}} = this.props
    const settings = {
      infinite: true,
      className: 'thumb-slider',
      speed: 500,
      slidesToShow: this.state.slidesToShow,
      slidesToScroll: 1,
      swipeToSlide: true,
      nextArrow: <SliderArrow icon={faAngleRight} listingId={id} />,
      prevArrow: <SliderArrow icon={faAngleLeft} left={true} listingId={id} />,
      centerMode: true,
      focusOnSelect: true
    }
    return (
      <div className="container">
        <Carousel
          {...settings}
          asNavFor={this.state.nav2}
          ref={(slider) => (this.slider1 = slider)}
        >
          {matterportCode && (
            <Thumb key={'tour'} alwaysVisible>
              <FontAwesomeIcon icon={faCube} />
              <span>Tour 3D</span>
            </Thumb>
          )}
          {images.map(({filename}) => (
            <Thumb
              key={filename}
              background={thumbnailUrl(filename, 180, 100)}
            />
          ))}
        </Carousel>
      </div>
    )
  }

  render() {
    const {listing, currentUser, favoritedListing} = this.props
    const {downloadingImages, show3DTour, isFullScreen} = this.state

    const settings = {
      dots: false,
      className: 'images-slider',
      infinite: true,
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
      prevArrow: <SliderArrow icon={faAngleLeft} left={true} listingId={listing.id} />
    }

    return (
      <Mutation mutation={VISUALIZE_TOUR}>
        {(visualizeTour) => (
          <Fragment>
            <Container isFullScreen={isFullScreen}>
              {show3DTour && (
                <Matterport
                  matterport_code={listing.matterportCode}
                  handleClose={this.hide3DTour}
                  listingId={listing.id}
                />
              )}
              <Carousel
                {...settings}
                asNavFor={this.state.nav1}
                ref={(slider) => (this.slider2 = slider)}
              >
                {this.getSliderContent(visualizeTour).map((content, id) => (
                  <Content key={content.key || id}>
                    {content.props.src && <div className="spinner" />}
                    {content}
                  </Content>
                ))}
              </Carousel>

              <SliderNavigation show={isFullScreen}>
                {this.getSliderNavigation()}
              </SliderNavigation>

              <div className="top-right">
                {!favoritedListing.loading &&
                  !isFullScreen && (
                    <LikeButton
                      buttonStyle
                      secondary
                      favorite={favoritedListing.favorite}
                      listing={listing}
                      user={currentUser}
                    />
                  )}

                {listing.images.length > 0 && (
                  <EmCasaButton onClick={this.toggleFullScreen} light>
                    <FontAwesomeIcon
                      icon={isFullScreen ? faMinimize : faExpand}
                    />
                  </EmCasaButton>
                )}
              </div>

              {!isFullScreen && (
                <BottomRight>
                  {canEdit(currentUser, listing) && (
                    <Link
                      passHref
                      href={`/listings/edit?id=${listing.id}`}
                      as={`/imoveis/${listing.id}/editar`}
                    >
                      <a><EmCasaButton>Editar</EmCasaButton></a>
                    </Link>
                  )}
                  {listing.images.length > 0 &&
                    currentUser.admin && (
                      <EmCasaButton
                        className="download-images-btn"
                        secondary
                        disabled={downloadingImages}
                        onClick={this.downloadImages}
                      >
                        <FontAwesomeIcon icon={faFileAlt} />
                        {downloadingImages ? 'Aguarde...' : 'Download fotos'}
                      </EmCasaButton>
                    )}
                </BottomRight>
              )}
            </Container>
          </Fragment>
        )}
      </Mutation>
    )
  }
}

function SliderArrow({onClick, icon, left, listingId}) {
  return (
    <Arrow onClick={() => {
      const properties = {listingId}
      const event = left ? LISTING_DETAIL_PHOTOS_LEFT : LISTING_DETAIL_PHOTOS_RIGHT
      log(event, properties)
      onClick()
    }} left={left}>
      <FontAwesomeIcon icon={icon} />
    </Arrow>
  )
}
