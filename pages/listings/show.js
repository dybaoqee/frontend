import {Component} from 'react'
import {Query} from 'react-apollo'
import View from '@emcasa/ui-dom/components/View'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Text from '@emcasa/ui-dom/components/Text'
import Button from '@emcasa/ui-dom/components/Button'
import {GET_USER_LISTINGS_ACTIONS} from 'graphql/user/queries'
import {
  GET_FULL_LISTING,
  GET_DISTRICTS
} from 'graphql/listings/queries'
import {Mutation} from 'react-apollo'
import {FAVORITE_LISTING} from 'graphql/listings/mutations'
import {isAuthenticated, isAdmin, getCurrentUserId, getJwt} from 'lib/auth'
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
import NextHead from 'components/shared/NextHead'
import getApolloClient from 'lib/apollo/initApollo'
import { getUserInfo } from 'lib/user'
import {
  log,
  getListingInfoForLogs,
  LISTING_DETAIL_OPEN_VISIT_FORM,
  LISTING_DETAIL_SCHEDULE_VISIT
} from 'lib/logging'

export const Title = Text.withComponent('h2')

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

  openPopup = async (e) => {
    const { currentUser } = this.props
    if (currentUser && currentUser.authenticated) {
      const userInfo = await getUserInfo(currentUser.id)
      if (userInfo && userInfo.name && userInfo.phone) {
        this.onSubmit(e, userInfo)
        return
      }
    }
    if (!this.state.isInterestPopupVisible) {
      log(LISTING_DETAIL_OPEN_VISIT_FORM, getListingInfoForLogs(this.props.listing))
    }
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

  onSubmit = async (e, userInfo) => {
    e && e.preventDefault()

    const {interestForm} = this.state
    const {id} = this.props.listing
    const {listing} = this.props

    let quickForm
    if (userInfo) {
      quickForm = {
        name: userInfo.name,
        phone: userInfo.phone
      }
    }

    const res = await createInterest(id, quickForm || interestForm)

    if (res.data.errors) {
      this.setState({errors: res.data.errors})
      return
    }

    log(LISTING_DETAIL_SCHEDULE_VISIT, getListingInfoForLogs(listing))

    if (!res.data) {
      return res
    }

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

    const { neighborhood, neighborhoodSlug } = listing.address

    const paths = [
      {name: 'Comprar Imóveis', href: '/listings', as: '/imoveis'},
      {
        name: neighborhood,
        href: `/listings?bairros=${neighborhoodSlug}`,
        as: `/imoveis?bairros=${neighborhoodSlug}`
      },
      {
        name: listing.type + roomInformationForPath,
        href: `/listings?bairros=${
          neighborhoodSlug
        }&quartos_minimo=${listing.rooms}`,
        as: `/imoveis?bairros=${neighborhoodSlug}&quartos_minimo=${
          listing.rooms
        }&quartos_maximo=${listing.rooms}`
      },
      {name: 'Este imóvel'}
    ]

    return (
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
                      favorite={favorite}
                    />
                    <ListingMap listing={listing} />
                    <RelatedListings
                      currentUser={currentUser}
                      listings={related}
                    />
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
    )
  }

  showListingFetchError = (listingFetchError, asPath) => {
    const location = asPath.split('/')
    const state = location[1]
    const city = location[2]
    const neighborhood = location[3]

    return (
      <Query query={GET_DISTRICTS}>
        {({loading, error, data}) => {
          if (loading) return (<div/>)
          if (error) return `Error! ${error.message}`
          const districts = data.districts
          const findState = districts.find(a => a.stateSlug === state)
          const findCity = districts.find(a => a.citySlug === city)
          const findNeighborhood = districts.find(a => a.nameSlug === neighborhood)
          let errorTitle = 'Este imóvel não está mais disponível!'
          let endQuestion = 'de imóveis'
          let buttonLabel = 'Explorar imóveis'
          let buttonHref = '/imoveis'
          if (findNeighborhood) {
            endQuestion = ` em ${findNeighborhood.name}, ${findNeighborhood.city}`
            buttonLabel += ` em ${findNeighborhood.name}`
            buttonHref += `/${findNeighborhood.stateSlug}/${findNeighborhood.citySlug}/${findNeighborhood.nameSlug}`
          } else if (findCity) {
            endQuestion = ` em ${findCity.city}, ${findCity.state}`
            buttonLabel += ` em ${findCity.city}`
            buttonHref += `/${findCity.stateSlug}/${findCity.citySlug}`
          } else if (findState) {
            endQuestion = ` em ${findState.state}`
            buttonLabel += ` em ${findState.state}`
            buttonHref += `/${findState.stateSlug}`
          }
          return (
            <>
              <NextHead title={`Imóvel não encontrado | EmCasa`} />
              <Row
                justifyContent="center"
                px={5}
              >
                <Row
                  flexDirection="column"
                  width={[1, null, null, '768px']}
                >
                  <Title
                    textAlign="center"
                    fontSize="xlarge"
                    fontWeight="normal"
                  >
                    {errorTitle}
                  </Title>
                  <Text color="grey">{`Que tal olhar outras opções ${endQuestion}? Separamos alguns imóveis para você! Fique a vontade para dar uma olhada nessa lista`}
                  </Text>
                  <Row justifyContent="center">
                    <Col width={[1, null, null, 2/5]}>
                      <View mt={2}>
                        <Link
                          passHref
                          href={buttonHref}
                        >
                          <a>
                            <Button
                              active
                              fluid
                              height="tall"
                            >
                              {buttonLabel}
                            </Button>
                          </a>
                        </Link>
                      </View>
                    </Col>
                  </Row>
                </Row>
              </Row>
            </>
          )
        }}
      </Query>
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
    const {listingFetchError, url: {asPath}} = this.props

    return listingFetchError ? (
      this.showListingFetchError(listingFetchError, asPath)
    ) : (
      this.showListing()
    )
  }
}

export default Listing
