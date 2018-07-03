import {Component, Fragment} from 'react'
import {Query} from 'react-apollo'
import {GET_FAVORITE_LISTINGS_IDS} from 'graphql/user/queries'
import {Mutation} from 'react-apollo'
import {FAVORITE_LISTING} from 'graphql/listings/mutations'
import {isAuthenticated, isAdmin, getCurrentUserId, getJwt} from 'lib/auth'
import {getListing, getRelatedListings} from 'services/listing-api'
import {createInterest} from 'services/interest-api'
import _ from 'lodash'
import ListingHead from 'components/listings/show/Head'
import ListingHeader from 'components/listings/show/Header'
import ListingMainContent from 'components/listings/show/Body'
import ListingMap from 'components/listings/show/Map'
import InterestForm from 'components/listings/show/InterestForm'
import InterestPosted from 'components/listings/show/InterestForm/interest_posted'
import RelatedListings from 'components/listings/show/RelatedListings'
import Error from 'components/shared/Shell/Error'
import Link from 'next/link'
import Warning from 'components/shared/Common/Warning'
import Breadcrumb from 'components/shared/Common/Breadcrumb'
import {parseSlug, buildSlug} from 'lib/listings'

class Listing extends Component {
  favMutated = false
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
    const id = context.req
      ? context.query.id || parseSlug(context.req.params).id
      : context.asPath.match(/\d+/g).join([])
    const jwt = getJwt(context)
    const currentUser = {
      id: getCurrentUserId(context),
      admin: isAdmin(context),
      authenticated: isAuthenticated(context),
      jwt
    }

    try {
      const [listing, related] = await Promise.all([
        getListing(id, jwt).then(({data}) => data.listing),
        getRelatedListings(id).then(({data}) => data.listings)
      ])

      if (context.asPath && context.res) {
        const urlParams = context.asPath.split('/').length
        //If client is trying to access old slugs then redirect
        if (urlParams <= 3 || urlParams === 5) {
          context.res.redirect(301, buildSlug(listing))
        }
      }

      return {
        listing,
        related,
        currentUser
      }
    } catch (e) {
      return {
        statusCode: e.status,
        currentUser
      }
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

  show3DTour = async () => {
    await this.setState({is3DTourVisible: true})
  }

  hide3DTour = () => {
    this.setState({is3DTourVisible: false})
  }

  openPopup = () => {
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

  onSubmit = async (e, custom) => {
    e && e.preventDefault()

    const {interestForm} = this.state
    const {id} = this.props.listing

    const res = await createInterest(id, custom || interestForm)

    if (res.data.errors) {
      this.setState({errors: res.data.errors})
      return
    }

    if (!res.data) {
      return res
    }

    !custom &&
      this.setState({
        isInterestPopupVisible: false,
        isInterestSuccessPopupVisible: true
      })
  }

  showListing = () => {
    const {currentUser, listing, related, url, router} = this.props
    const {is_active} = listing

    const {
      isInterestPopupVisible,
      isInterestSuccessPopupVisible,
      interestForm
    } = this.state

    const roomInformationForPath = listing.rooms
      ? ` de ${listing.rooms} dormitórios`
      : ''

    const paths = [
      {name: 'Comprar Imóvel', href: '/listings', as: '/imoveis'},
      {
        name: listing.address.neighborhood,
        href: `/listings?bairros=${listing.address.neighborhood}`,
        as: `/imoveis?bairros=${listing.address.neighborhood}`
      },
      {
        name: listing.type + roomInformationForPath,
        href: `/listings?bairros=${
          listing.address.neighborhood
        }&quartos_minimo=${listing.rooms}`,
        as: `/imoveis?bairros=${listing.address.neighborhood}&quartos_minimo=${
          listing.rooms
        }&quartos_maximo=${listing.rooms}`
      },
      {name: 'Este imóvel'}
    ]

    return (
      <Mutation mutation={FAVORITE_LISTING}>
        {(favoriteListing) => (
          <Query query={GET_FAVORITE_LISTINGS_IDS}>
            {({loading, error, data}) => {
              const favorite =
                !loading &&
                !error &&
                data &&
                data.favoritedListings &&
                data.favoritedListings.filter(
                  (listingSaved) =>
                    listingSaved.id.toString() === listing.id.toString()
                ).length > 0

              if (
                !_.isUndefined(router.query.f) &&
                !loading &&
                !favorite &&
                !this.favMutated
              ) {
                this.favMutated = true
                favoriteListing({
                  refetchQueries: [
                    {
                      query: GET_FAVORITE_LISTINGS_IDS
                    }
                  ],
                  variables: {
                    id: listing.id
                  }
                })
              }

              return (
                <Fragment>
                  <ListingHead listing={listing} />

                  <div>
                    <ListingHeader
                      listing={listing}
                      handleOpenPopup={this.openPopup}
                      handleOpenImageGallery={this.showImageGallery}
                      handleOpen3DTour={this.show3DTour}
                      currentUser={currentUser}
                      favoritedListing={{loading, favorite}}
                    />
                    {!is_active && (
                      <Warning green={url.query.r}>
                        {url.query.r ? (
                          <p>
                            <b>Pré-cadastro feito com sucesso.</b> Nossa equipe
                            entrará em contato via email.
                          </p>
                        ) : (
                          <p>
                            Imóvel não está visível para o público pois está em
                            fase de moderação.
                          </p>
                        )}
                      </Warning>
                    )}
                    <Breadcrumb paths={paths} />

                    <ListingMainContent
                      listing={listing}
                      handleOpenPopup={this.openPopup}
                      user={currentUser}
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
                      <InterestPosted
                        handleClose={this.closeSuccessPostPopup}
                      />
                    )}
                  </div>
                </Fragment>
              )
            }}
          </Query>
        )}
      </Mutation>
    )
  }

  get error() {
    const {statusCode} = this.props

    switch (statusCode) {
      case 404:
        return 'Página não encontrada'
      case 500:
        return 'Internal Server Error'
      default:
        return 'Erro desconhecido'
    }
  }

  render() {
    const {statusCode} = this.props

    return (
      <Fragment>
        {statusCode ? (
          <Error>
            <h1>{this.error}</h1>
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
      </Fragment>
    )
  }
}

export default Listing
