import { Component } from 'react'
import Head from 'next/head'
import Router from 'next/router'

import { treatParams } from '../../utils/filter-params.js'
import { mainListingImage } from '../../utils/image_url'
import { isAuthenticated, isAdmin, getCurrentUserId } from '../../lib/auth'
import { getListings } from '../../services/listing-api'
import { getNeighborhoods } from '../../services/neighborhood-api'
import Layout from '../../components/main-layout'
import MapContainer from '../../components/map-container'
import Listing from '../../components/listings/index/listing'
import ListingsNotFound from '../../components/listings/index/not-found'
import Filter from '../../components/listings/index/filter'

import { mobileMedia } from '../../constants/media'

export default class ListingsIndex extends Component {
  static async getInitialProps(context) {
    const res = await getListings(context.query)

    if (res.data.errors) {
      this.setState({errors: res.data.errors})
      return {}
    }

    if (!res.data) {
      return res
    }

    const neighborhoodResponse = await getNeighborhoods()

    if (neighborhoodResponse.data.errors) {
      this.setState({errors: neighborhoodResponse.data.errors})
      return {}
    }

    if (!neighborhoodResponse.data) {
      this.setState({errors: 'Unknown error. Please try again.'})
      return {}
    }

    const { preco_minimo, preco_maximo, area_minima, area_maxima, quartos, bairros } = context.query
    const neighborhoods = bairros ? bairros.split('|') : []

    return {
      listings: res.data.listings,
      currentUser: {
        id: getCurrentUserId(context),
        admin: isAdmin(context),
        authenticated: isAuthenticated(context)
      },
      neighborhoods: neighborhoodResponse.data.neighborhoods,
      query: context.query,
      filter: {
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
            value: quartos,
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

  handleMinPriceChange = (minPrice) => {
    const state = this.state
    state.params.price.min =
      minPrice ? minPrice.value : undefined
    this.setState(state)
    this.updateRoute()
  }

  handleMaxPriceChange = (maxPrice) => {
    const state = this.state
    state.params.price.max =
      maxPrice ? maxPrice.value : undefined
    this.setState(state)
    this.updateRoute()
  }

  handleMinAreaChange = (minArea) => {
    const state = this.state
    state.params.area.min =
      minArea ? minArea.value : undefined
    this.setState(state)
    this.updateRoute()
  }

  handleMaxAreaChange = (maxArea) => {
    const state = this.state
    state.params.area.max =
      maxArea ? maxArea.value : undefined
    this.setState(state)
    this.updateRoute()
  }

  handleRoomChange = (rooms) => {
    const state = this.state
    state.params.rooms.value =
      rooms ? rooms.value : undefined
    this.setState(state)
    this.updateRoute()
  }

  handleNeighborhoodChange = (value) => {
    const state = this.state
    state.params.neighborhoods.value = value
    this.setState(state)
    this.updateRoute()
  }

  updateRoute = () => {
    const params = treatParams(this.state.params)

    if (params) {
      Router.push(`/listings/index?${params}`, `/imoveis?${params}`)
    } else {
      Router.push('/listings/index', '/imoveis')
    }
  }

  resetAllParams = () => {
    const state = this.state

    state.params.price.min = undefined
    state.params.price.max = undefined
    state.params.area.min = undefined
    state.params.area.max = undefined
    state.params.rooms.value = undefined
    state.params.neighborhoods.value = []

    this.setState(state)

    this.updateRoute()
  }

  toggleRoomVisibility = () => {
    this.toggleParamVisibility('rooms')
  }

  togglePriceVisibility = () => {
    this.toggleParamVisibility('price')
  }

  toggleAreaVisibility = () => {
    this.toggleParamVisibility('area')
  }

  toggleNeighborhoodsVisibility = () => {
    this.toggleParamVisibility('neighborhoods')
  }

  toggleMobilePriceVisibility = () => {
    const { visible } = this.state.params.price
    const state = this.state

    if (visible) {
      state.params.price.visible = false
      state.isMobileOpen = false
    } else {
      state.params.price.visible = true
      state.params.neighborhoods.visible = false
      state.params.area.visible = false
      state.params.rooms.visible = false
      state.isMobileOpen = true
    }

    this.setState(state)
  }

  toggleMobileNeighborhoodsVisibility = () => {
    const { visible } = this.state.params.neighborhoods
    const state = this.state

    if (visible) {
      state.params.neighborhoods.visible = false
      state.isMobileOpen = false
    } else {
      state.params.neighborhoods.visible = true
      state.params.price.visible = false
      state.params.area.visible = false
      state.params.rooms.visible = false
      state.isMobileOpen = true
    }

    this.setState(state)
  }

  toggleOtherMobileParams = () => {
    const state = this.state
    const visible = state.params.area.visible

    if (visible) {
      state.isMobileOpen = false
      state.params.area.visible = false
      state.params.rooms.visible = false
    } else {
      state.isMobileOpen = true
      state.params.area.visible = true
      state.params.rooms.visible = true
    }

    state.params.price.visible = false
    state.params.neighborhoods.visible = false
    this.setState(state)
  }

  toggleParamVisibility = (param) => {
    const state = this.state
    const newParamFilterVisibility = !state.params[param].visible

    this.hideAllParams()

    state.params[param].visible = newParamFilterVisibility
    this.setState(state)
  }

  hideAllParams = () => {
    const { state } = this
    const { params } = state

    Object.keys(params).map(function(key) {
      state.params[key].visible = false
    })

    state.isMobileOpen = false

    this.setState(state)
  }

  isAnyParamVisible = () => {
    const { params } = this.state

    return Object.keys(params).some(function(key) {
      return params[key]['visible'] === true
    })
  }


  getNumberOfActiveParams = () => {
    const { price, area, rooms, neighborhoods } = this.state.params

    let numberOfParams = 0

    if (price.min || price.max) numberOfParams++
    if (area.min || area.max) numberOfParams++
    if (rooms.value) numberOfParams++
    if (neighborhoods.value.length > 0) numberOfParams ++

    return numberOfParams
  }

  renderTextForMobileMainButton = () => {
    const numberOfParams = this.getNumberOfActiveParams()

    const suffix =
      (numberOfParams == 0) ?
        ''
        : ': ' + numberOfParams

    return 'Filtros' + suffix
  }

  renderTextForMobileMainButton = () => {
    const numberOfParams = this.getNumberOfActiveParams()

    const suffix =
      (numberOfParams == 0) ?
        ''
        : ': ' + numberOfParams

    return 'Filtros' + suffix
  }

  handleOverlayClick = () => {
    const { isMobileOpen } = this.state

    if (!isMobileOpen) this.hideAllParams()
  }
  render() {
    const { listings, neighborhoods, currentUser, filter } = this.props
    const seoImgSrc = listings.length > 0 && mainListingImage(listings[0].images)

    return (
      <Layout authenticated={currentUser.authenticated}>
        <Head>
          <title>Apartamentos à venda no Rio de Janeiro | EmCasa</title>
          <meta name="description" content="Compre seu Imóvel na Zona Sul do Rio de Janeiro"/>
          <meta property="og:description" content="Compre seu Imóvel na Zona Sul do Rio de Janeiro"/>
          <meta property="og:image" content={seoImgSrc}/>
          <meta name="twitter:card" content="summary_large_image"/>
          <meta name="twitter:title" content="Apartamentos à venda no Rio de Janeiro | EmCasa"/>
          <meta name="twitter:description" content="Compre seu Imóvel na Zona Sul do Rio de Janeiro"/>
          <meta name="twitter:image" content={seoImgSrc}/>
        </Head>

        <div className="listings">
          <Filter neighborhoodOptions={neighborhoods} params={filter} />

          <div className="map">
            <MapContainer
              listings={listings}
              height="100%"
              width="100%"
              zoom={13}/>
          </div>

          <div className="entries-container">
            {listings.map((listing, i) => {
              return <Listing listing={listing} key={i} currentUser={currentUser} />
            })}

            {(listings.length == 0) && <ListingsNotFound />}
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
