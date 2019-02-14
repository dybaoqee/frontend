import {Component} from 'react'
import {Query} from 'react-apollo'
import theme from '@emcasa/ui'
import { ThemeProvider } from 'styled-components'
import {GET_USER_LISTINGS_ACTIONS} from 'graphql/user/queries'
import {GET_FULL_LISTING} from 'graphql/listings/queries'
import {Mutation} from 'react-apollo'
import {FAVORITE_LISTING} from 'graphql/listings/mutations'
import {isAuthenticated, isAdmin, getCurrentUserId, getJwt} from 'lib/auth'
import Error from 'components/shared/Shell/Error'
import {getRelatedListings} from 'services/listing-api'
import Link from 'next/link'
import {createInterest} from 'services/interest-api'
import isUndefined from 'lodash/isUndefined'
import ListingHead from 'components/listings/show/Head'
import ListingHeader from 'components/listings/show/ListingHeader'
import ListingMainContent from 'components/listings/show/Body'
import ListingMap from 'components/listings/show/Map'
import InterestForm from 'components/listings/show/InterestForm'
import InterestPosted from 'components/listings/show/InterestForm/interest_posted'
import RelatedListings from 'components/listings/show/RelatedListings'
import Warning from 'components/shared/Common/Warning'
import Breadcrumb from 'components/shared/Common/Breadcrumb'
import {buildSlug, getListingId} from 'lib/listings'
import Head from 'next/head'
import getApolloClient from 'lib/apollo/initApollo'
import {
  log,
  getPreferredContactType,
  LISTING_DETAIL_SCHEDULE_VISIT
} from 'lib/logging'

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
    const {asPath, res} = context
    const id = getListingId(asPath)

    const currentUser = {
      id: getCurrentUserId(context),
      admin: isAdmin(context),
      authenticated: isAuthenticated(context),
      jwt: getJwt(context)
    }

    const apolloClient = getApolloClient(undefined, getJwt(context))

    const serverResponse = await apolloClient.query({
      query: GET_FULL_LISTING,
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
      variables: {
        id
      }
    })

    const listing = serverResponse.data.listing
    const errors = serverResponse.errors

    if (listing) {
      if (asPath && res) {
        const urlParams = asPath.split('/').length
        //If client is trying to access old slugs then redirect
        if (urlParams <= 3 || urlParams === 5) {
          res.redirect(301, buildSlug(listing))
        }
      }

      return {
        listing,
        currentUser
      }
    } else {
      return {
        listingFetchError: errors[0],
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
    const {listing} = this.props

    const res = await createInterest(id, custom || interestForm)

    if (res.data.errors) {
      this.setState({errors: res.data.errors})
      return
    }

    const {area, bathrooms, floor, garageSpots, price, rooms, type, maintenanceFee, propertyTax} = listing
    log(LISTING_DETAIL_SCHEDULE_VISIT, {
      listingId: id,
      neighborhood: listing.address.neighborhoodSlug,
      city: listing.address.citySlug,
      area,
      bathrooms,
      floor,
      garageSpots,
      price,
      rooms,
      type,
      maintenanceFee,
      propertyTax,
      preferredContact: getPreferredContactType(interestForm.interest_type_id)
    })

    if (!res.data) {
      return res
    }

    !custom &&
      this.setState({
        isInterestPopupVisible: false,
        isInterestSuccessPopupVisible: true
      })
  }

  async componentDidMount() {
    const {listing} = this.props
    if (listing && listing.id) {
      const related = await getRelatedListings(listing.id).then(({data}) => data.listings)
      this.setState({related})
    }
  }

  showListing = () => {
    const {user: currentUser, url, listing, router} = this.props
    const {related} = this.state
    const {isActive} = listing

    const {
      isInterestPopupVisible,
      isInterestSuccessPopupVisible,
      interestForm
    } = this.state

    const roomInformationForPath = listing.rooms
      ? ` de ${listing.rooms} dormitórios`
      : ''

    const paths = [
      {name: 'Comprar Imóveis', href: '/listings', as: '/imoveis'},
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
      <ThemeProvider theme={theme}>
        <Mutation mutation={FAVORITE_LISTING}>
          {(favoriteListing) => (
            <Query
              query={GET_USER_LISTINGS_ACTIONS}
              skip={!currentUser.authenticated}
            >
              {({data: {userProfile}, loading, error}) => {
                const {router} = this.props
                const favorite =
                  !loading &&
                  !error &&
                  userProfile &&
                  userProfile.favorites &&
                  userProfile.favorites.filter(
                    (listingSaved) =>
                      listingSaved.id.toString() === listing.id.toString()
                  ).length > 0

                if (
                  !isUndefined(router.query.f) &&
                  !loading &&
                  !favorite &&
                  !this.favMutated
                ) {
                  this.favMutated = true
                  favoriteListing({
                    refetchQueries: [
                      {
                        query: GET_USER_LISTINGS_ACTIONS
                      }
                    ],
                    variables: {
                      id: listing.id
                    }
                  })
                }

                return (
                  <>
                    <ListingHead
                      listing={listing}
                      routerAsPath={router.asPath}
                    />

                    <div>
                      <ListingHeader
                        listing={listing}
                        handleOpenPopup={this.openPopup}
                        handleOpenImageGallery={this.showImageGallery}
                        handleOpen3DTour={this.show3DTour}
                        currentUser={currentUser}
                        favoritedListing={{loading, favorite}}
                      />
                      {!isActive && (
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

                      <RelatedListings listings={related || []} />

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
                  </>
                )
              }}
            </Query>
          )}
        </Mutation>
      </ThemeProvider>
    )
  }

  get error() {
    const {listingFetchError} = this.props

    switch (listingFetchError.code || listingFetchError.statusCode) {
      case 404:
        return 'Imóvel não encontrado'
      case 500:
        return 'Internal Server Error'
      default:
        return 'Erro desconhecido'
    }
  }

  render() {
    const {listingFetchError} = this.props

    return listingFetchError ? (
      <>
        <Head>
          <title>EmCasa</title>
        </Head>
        <Error>
          <h1>{this.error}</h1>
          <h2>{listingFetchError.code || listingFetchError.statusCode}</h2>
          <p>
            Visite nossa <Link href="/">página inicial</Link> ou entre em&nbsp;
            <Link href="mailto:contato@emcasa.com">contato</Link> com a gente
          </p>
        </Error>
      </>
    ) : (
      this.showListing()
    )
  }
}

export default Listing
