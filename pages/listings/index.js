import qs from 'querystring'
import _ from 'lodash'
import {Component} from 'react'
import Head from 'next/head'
import Router from 'next/router'
import update from 'immutability-helper'

import {treatParams} from 'utils/filter-params.js'
import {mainListingImage} from 'utils/image_url'
import {isAuthenticated, isAdmin, getCurrentUserId} from 'lib/auth'
import {getListings} from 'services/listing-api'
import {getNeighborhoods} from 'services/neighborhood-api'
import Layout from 'components/shared/Shell'
import InfiniteScroll from 'components/shared/InfiniteScroll'
import MapContainer from 'components/listings/index/Map'
import Listing from 'components/listings/index/Listing'
import ListingsNotFound from 'components/listings/index/NotFound'
import Filter from 'components/listings/index/Search'

import {mobileMedia} from 'constants/media'
import {
  desktopHeaderHeight,
  desktopFilterHeight
} from 'constants/dimensions'

const getDerivedState = ({initialState}) => {
  const listings = new Map(initialState.listings)
  const currentPage = initialState.currentPage || 1
  return {
    ...initialState,
    listings,
    currentPage
  }
}

export default class ListingsIndex extends Component {
  constructor(props) {
    super(props)

    const {
      quartos_minimo,
      quartos_maximo,
      preco_minimo,
      preco_maximo,
      area_minima,
      area_maxima,
      quartos,
      bairros
    } = props.query
    const neighborhoods = bairros ? bairros.split('|') : []

    this.state = {
      ...getDerivedState(props),
      filterParams: {
        isMobileOpen: false,
        params: {
          price: {
            min: preco_minimo,
            max: preco_maximo,
            visible: false
          },
          area: {
            min: area_minima,
            max: area_maxima,
            visible: false
          },
          rooms: {
            min: quartos_minimo,
            max: quartos_maximo,
            visible: false
          },
          neighborhoods: {
            value: neighborhoods,
            visible: false
          }
        }
      }
    }
  }

  static async getInitialProps(context) {
    const [initialState, neighborhoods] = await Promise.all([
      this.getState(context.query),
      getNeighborhoods().then(({data}) => data.neighborhoods)
    ])

    return {
      initialState,
      neighborhoods,
      currentUser: {
        id: getCurrentUserId(context),
        admin: isAdmin(context),
        authenticated: isAuthenticated(context)
      },
      query: context.query
    }
  }

  static async getState(query) {
    const page = query.page || 1
    const {data} = await getListings({...query, page, page_size: 15})
    return {
      currentPage: data.page_number,
      totalPages: data.total_pages,
      totalResults: data.total_entries,
      listings: [[data.page_number, data.listings]]
    }
  }

  componentWillReceiveProps(props) {
    if (!_.isEqual(props.initialState, this.props.initialState)) {
      this.setState(getDerivedState(props))
    }
  }

  componentDidMount() {
    require('utils/polyfills/smooth-scroll').load()
  }

  onLoad = async () => {
    const {currentPage, totalPages} = this.state
    if (currentPage >= totalPages) return
    const params = qs.parse(treatParams(this.state.filterParams.params))
    const {listings, ...state} = await this.constructor.getState({
      ...params,
      page: currentPage + 1
    })
    await this.setState({
      ...state,
      listings: update(this.state.listings, {$add: listings})
    })
  }

  onChangeFilter = (name, value) =>
    this.setState(
      {
        filterParams: update(this.state.filterParams, {
          params: {[name]: {$merge: value}}
        })
      },
      this.updateRoute
    )

  onSelectListing = (id) => {
    const element = document.getElementById(`listing-${id}`)
    const rect = element.getBoundingClientRect()
    const top = rect.top - desktopHeaderHeight - desktopFilterHeight
    window.scrollBy({top, behavior: 'smooth'})
  }

  updateRoute = () => {
    const params = treatParams(this.state.filterParams.params)

    if (params) {
      Router.push(`/listings/index?${params}`, `/imoveis?${params}`)
    } else {
      Router.push('/listings/index', '/imoveis')
    }
  }

  resetAllParams = () => {
    const state = this.state

    state.filterParams.params.price.min = undefined
    state.filterParams.params.price.max = undefined
    state.filterParams.params.area.min = undefined
    state.filterParams.params.area.max = undefined
    state.filterParams.params.rooms.value = undefined
    state.filterParams.params.neighborhoods.value = []

    this.setState(state)

    this.updateRoute()
  }

  toggleMobilePriceVisibility = () => {
    const {visible} = this.state.filterParams.params.price
    const state = this.state

    if (visible) {
      state.filterParams.params.price.visible = false
      state.filterParams.isMobileOpen = false
    } else {
      state.filterParams.params.price.visible = true
      state.filterParams.params.neighborhoods.visible = false
      state.filterParams.params.area.visible = false
      state.filterParams.params.rooms.visible = false
      state.filterParams.isMobileOpen = true
    }

    this.setState(state)
  }

  toggleMobileNeighborhoodsVisibility = () => {
    const {visible} = this.state.filterParams.params.neighborhoods
    const state = this.state

    if (visible) {
      state.filterParams.params.neighborhoods.visible = false
      state.filterParams.isMobileOpen = false
    } else {
      state.filterParams.params.neighborhoods.visible = true
      state.filterParams.params.price.visible = false
      state.filterParams.params.area.visible = false
      state.filterParams.params.rooms.visible = false
      state.filterParams.isMobileOpen = true
    }

    this.setState(state)
  }

  toggleOtherMobileParams = () => {
    const state = this.state
    const visible = state.filterParams.params.area.visible

    if (visible) {
      state.filterParams.isMobileOpen = false
      state.filterParams.params.area.visible = false
      state.filterParams.params.rooms.visible = false
    } else {
      state.filterParams.isMobileOpen = true
      state.filterParams.params.area.visible = true
      state.filterParams.params.rooms.visible = true
    }

    state.filterParams.params.price.visible = false
    state.filterParams.params.neighborhoods.visible = false
    this.setState(state)
  }

  hideAllParams = () => {
    const {state} = this
    const {filterParams} = state

    Object.keys(filterParams.params).map(function(key) {
      state.filterParams.params[key].visible = false
    })

    state.filterParams.isMobileOpen = false

    this.setState(state)
  }

  isAnyParamVisible = () => {
    const {params} = this.state.filterParams

    return Object.keys(params).some(function(key) {
      return params[key]['visible'] === true
    })
  }

  getNumberOfActiveParams = () => {
    const {price, area, rooms, neighborhoods} = this.state.params.filterParams

    let numberOfParams = 0

    if (price.min || price.max) numberOfParams++
    if (area.min || area.max) numberOfParams++
    if (rooms.value) numberOfParams++
    if (neighborhoods.value.length > 0) numberOfParams++

    return numberOfParams
  }

  renderTextForMobileMainButton = () => {
    const numberOfParams = this.getNumberOfActiveParams()

    const suffix = numberOfParams == 0 ? '' : ': ' + numberOfParams

    return 'Filtros' + suffix
  }

  get currentListings() {
    const {currentPage, listings} = this.state
    return listings.get(currentPage) || []
  }

  get seoImage() {
    const listing = this.currentListings[0]
    return listing ? mainListingImage(listing.images) : null
  }

  render() {
    const {neighborhoods, currentUser} = this.props
    const {params} = this.state.filterParams
    const {currentPage, totalPages, totalResults, listings} = this.state
    const seoImgSrc = this.seoImage
    return (
      <Layout authenticated={currentUser.authenticated}>
        <Head>
          <title>Apartamentos à venda no Rio de Janeiro | EmCasa</title>
          <meta
            name="description"
            content="Compre seu Imóvel na Zona Sul do Rio de Janeiro"
          />
          <meta
            property="og:description"
            content="Compre seu Imóvel na Zona Sul do Rio de Janeiro"
          />
          <meta property="og:image" content={seoImgSrc} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Apartamentos à venda no Rio de Janeiro | EmCasa"
          />
          <meta
            name="twitter:description"
            content="Compre seu Imóvel na Zona Sul do Rio de Janeiro"
          />
          <meta name="twitter:image" content={seoImgSrc} />
        </Head>

        <div className="listings">
          <Filter
            params={params}
            neighborhoods={neighborhoods}
            onChange={this.onChangeFilter}
            resetAllParams={this.resetAllParams}
          />

          <div className="map">
            <MapContainer
              zoom={13}
              width="100%"
              height="100%"
              currentPage={currentPage}
              onSelect={this.onSelectListing}
            >
              {listings}
            </MapContainer>
          </div>

          <div className="entries-container">
            {totalResults == 0 ? (
              <ListingsNotFound resetAllParams={this.resetAllParams} />
            ) : (
              <InfiniteScroll
                currentPage={currentPage}
                totalPages={totalPages}
                pages={listings}
                onLoad={this.onLoad}
              >
                {(listing) => (
                  <Listing
                    key={listing.id}
                    id={`listing-${listing.id}`}
                    listing={listing}
                    currentUser={currentUser}
                  />
                )}
              </InfiniteScroll>
            )}
          </div>
        </div>

        <style jsx>{`
          .listings {
            > div {
              float: left;
              width: 60%;
              &.entries-container {
                float: right;
                margin-top: 59px;
              }
            }
          }

          .map {
            background: white;
            border-radius: 8px;
            height: calc(100vh - 178px);
            margin-left: 20px;
            overflow: hidden;
            position: fixed !important;
            top: 158px;
            width: calc(40% - 40px) !important;
          }

          @media ${mobileMedia} {
            .listings > div:first-of-type {
              display: none;
            }

            .listings > div.entries-container {
              width: 100%;
            }

            .map {
              display: none;
            }
          }
        `}</style>
      </Layout>
    )
  }
}
