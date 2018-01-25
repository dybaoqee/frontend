import { Component } from 'react'
import Router from 'next/router'
import Select from 'react-select'
import NumberFormat from 'react-number-format'
import numeral from 'numeral'

import * as colors from '../../../constants/colors'
import { mobileMedia } from '../../../constants/media'
import { treatParams } from '../../../utils/filter-params.js'

import FilterHeader from '../../../components/listings/index/filter/header'
import PriceFilter from '../../../components/listings/index/filter/price'
import AreaFilter from '../../../components/listings/index/filter/area'
import RoomFilter from '../../../components/listings/index/filter/rooms'
import NeighborhoodFilter from '../../../components/listings/index/filter/neighborhoods'

export default class Filter extends Component {
  constructor(props) {
    super(props)

    const { preco_minimo, preco_maximo, area_minima, area_maxima, quartos, bairros } = props.query
    const neighborhoods = bairros ? bairros.split('|') : []

    this.state = {
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

  handleMinPriceChange = (minPrice) => {
    const state = this.state
    state.params.price.min =
      minPrice ? minPrice.value : undefined
    this.setState(state)
    this.updateFilter()
  }

  handleMaxPriceChange = (maxPrice) => {
    const state = this.state
    state.params.price.max =
      maxPrice ? maxPrice.value : undefined
    this.setState(state)
    this.updateFilter()
  }

  handleMinAreaChange = (minArea) => {
    const state = this.state
    state.params.area.min =
      minArea ? minArea.value : undefined
    this.setState(state)
    this.updateFilter()
  }

  handleMaxAreaChange = (maxArea) => {
    const state = this.state
    state.params.area.max =
      maxArea ? maxArea.value : undefined
    this.setState(state)
    this.updateFilter()
  }

  handleRoomChange = (rooms) => {
    const state = this.state
    state.params.rooms.value =
      rooms ? rooms.value : undefined
    this.setState(state)
    this.updateFilter()
  }

  handleNeighborhoodChange = (value) => {
    const state = this.state
    state.params.neighborhoods.value = value
    this.setState(state)
    this.updateFilter()
  }

  updateFilter = () => {
    const params = treatParams(this.state.params)

    if (params) {
      Router.push(`/listings/index?${params}`, `/imoveis?${params}`)
    } else {
      Router.push(`/listings/index`, `/imoveis`)
    }
  }

  removeAllFilters = () => {
    const state = this.state
    state.params = {
      preco_minimo: undefined,
      preco_maximo: undefined,
      area_minima: undefined,
      area_maxima: undefined,
      quartos: undefined,
      bairros: []
    }
    this.setState(state)

    this.updateFilter()
  }

  handleToggleVisibility = () => {
    const state = this.state
    const isMobileOpen = !state.isMobileOpen

    state.isMobileOpen = isMobileOpen
    state.params.price.visible = isMobileOpen
    state.params.area.visible = isMobileOpen
    state.params.rooms.visible = isMobileOpen
    state.params.neighborhoods.visible = isMobileOpen

    this.setState(state)
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

    this.setState(state)
  }

  isAnyParamVisible = () => {
    const { params } = this.state

    return Object.keys(params).some(function(key) {
      return params[key]['visible'] === true
    })
  }


  getNumberOfActiveParams = () => {
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

  handleOverlayClick = () => {
    const { isMobileOpen } = this.state

    if (!isMobileOpen) this.hideAllParams()
  }

  render() {
    const { neighborhoodOptions, query } = this.props
    const { price, area, rooms, neighborhoods } = this.state.params
    const { visibility, isMobileOpen } = this.state

    return <div className={"listings-filter-container "+ (this.isAnyParamVisible() ? 'filter-open' : '')}>
      {
        this.isAnyParamVisible() &&
        <div className="active-filter-overlay" onClick={this.handleOverlayClick} />
      }

      <span className="filter-title">
        Filtros
      </span>

      <FilterHeader
        params={this.state.params}
        isMobileOpen={isMobileOpen}
        handleToggleVisibility={this.handleToggleVisibility}
      />

      <PriceFilter
        price={price}
        handleMinPriceChange={this.handleMinPriceChange}
        handleMaxPriceChange={this.handleMaxPriceChange}
        toggleVisibility={this.togglePriceVisibility}
        handleClose={this.hideAllParams}
      />

      <AreaFilter
        area={area}
        handleMinAreaChange={this.handleMinAreaChange}
        handleMaxAreaChange={this.handleMaxAreaChange}
        toggleVisibility={this.toggleAreaVisibility}
        handleClose={this.hideAllParams}
      />

      <RoomFilter
        rooms={rooms}
        handleChange={this.handleRoomChange}
        toggleVisibility={this.toggleRoomVisibility}
        handleClose={this.hideAllParams}
      />

      <NeighborhoodFilter
        neighborhoods={neighborhoods}
        options={neighborhoodOptions}
        handleChange={this.handleNeighborhoodChange}
        toggleVisibility={this.toggleNeighborhoodsVisibility}
        handleClose={this.hideAllParams}
      />

      {isMobileOpen &&
        <button
          className="close-mobile-filters"
          onClick={this.handleToggleVisibility}
        >
          Ver Resultados
        </button>
      }

      <span className="remove-all-filters" onClick={this.removeAllFilters}>
        Limpar Filtros
      </span>

      <style global jsx>{`
        .listings-filter-container {
          .Select-control {
            border-color: ${colors.blue};
          }

          .Select-placeholder {
            color: ${colors.mediumGray};
            text-align: center;
          }

          .Select.has-value.is-clearable.Select--single > .Select-control .Select-value {
            padding-right: 20px;
          }
        }
      `}</style>

      <style global jsx>{`
        .listings-filter-container {
          align-items: center;
          background: white;
          border-bottom: 1px solid ${colors.lightGray};
          border-top: 1px solid ${colors.lightGray};
          display: flex;
          overflow: visible;
          padding: 10px 0;
          position: fixed;
          width: 100vw;
          z-index: 4;
          &.filter-open {
            box-shadow: 1px 1px 4px ${colors.lightGray};
          }

          div.active-filter-overlay {
            background: rgba(100, 100, 100, 0.85);
            height: calc(100vh - 135px);
            position: absolute;
            top: 58px;
            left: 0;
            width: 100vw;
          }

          button.mobile-filter-toggler {
            display: none;
          }

          div.filter-param-container {
            position: relative;
          }

          div.option-container {
            background: white;
            border: 1px solid ${colors.lightGray};
            border-top: 1px solid white;
            height: calc(100vh - 170px);
            justify-content: space-between;
            margin-right: 40px;
            padding: 20px;
            position: absolute;
            top: 47px;

            > div {
              align-items: center;
              display: flex;
            }

            label {
              color: ${colors.blue};
              font-size: 12px;
              font-weight: 700;
              text-transform: uppercase;
              &:last-of-type {
                margin: 0 10px;
              }
            }

            span.close-filter-param {
              color: ${colors.blue};
              display: block;
              cursor: pointer;
              float: right;
              font-size: 12px;
              font-weight: 700;
              margin-top: 15px;
              text-transform: uppercase;
              &:hover {
                color: ${colors.darkenedBlue};
              }
            }
          }

          span.filter-title {
            color: ${colors.mediumDarkGray};
            padding-left: 20px;
            padding-right: 30px;
          }

          span.toggleFilterVisibility {
            color: ${colors.blue};
            cursor: pointer;
            padding-top: 13px;
            margin-right: 20px;
            text-align: right;
            > span {
              display: inline-block;
              margin-left: 5px;
              transform: rotate(-90deg);
            }
          }

          label {
            margin-right: 10px;
            &.neighborhood {
              clear: both;
              float: left;
              width: 100% !important;
            }
            &:first-of-type {
              display: inline-block;
            }
          }

          input {
            margin-right: 10px;
            padding: 10px;
          }

          select {
            margin-right: 10px;
          }

          button {
            background: transparent;
            border: 1px solid ${colors.lightGray};
            border-radius: 500px;
            color: ${colors.text};
            clear: both;
            font-size: 15px;
            margin: 0 20px 0 0;
            padding: 7px 20px 10px;
            &:hover {
              background: ${colors.offWhite}
            }
            &.active {
              background: ${colors.blue};
              color: white;
              border: 1px solid ${colors.darkenedBlue};
              &:hover {
                background: ${colors.darkenedBlue};
              }
            }
          }

          span.mobile-param-title {
            display: none;
          }

          span.toggleFilterVisibility {
            display: none;
          }

          span.remove-all-filters {
            color: ${colors.lightGray};
            cursor: pointer;
            display: block;
            font-size: 13px;
            letter-spacing: 1px;
            margin-left: auto;
            margin-right: 20px;
            overflow: auto;
            text-transform: uppercase;
            &:hover {
              color: ${colors.mediumDarkGray}
            }
            &.mobile {
              display: none;
            }
          }
        }

        @media ${mobileMedia} {
          .listings-filter-container {
            flex-wrap: wrap;

            div.mobile-control-container {
              align-items: center;
              display: flex;
              justify-content: space-between;
              width: 100vw;
            }

            div.active-filter-overlay {
              background: white;
            }

            span.filter-title {
              display: none;
            }

            span.remove-all-filters {
              display: none;
              &.mobile {
                display: block;
              }
            }

            span.mobile-param-title {
              color: ${colors.mediumDarkGray};
              display: block;
              font-size: 11px;
              font-weight: 700;
              margin-bottom: 10px;
              text-transform: uppercase;
            }

            button.mobile-filter-toggler {
              display: block;
              margin-left: 10px;
              margin-right: auto;
            }

            div.filter-param-container {
              width: 100vw;

              button {
                display: none;
              }
            }

            div.option-container {
              border: none;
              height: auto;
              margin-right: 0;
              padding: 0 10px 15px;
              position: relative;
              top: 0;

              &.price-container {
                border-top: 1px solid ${colors.lightGray};
                margin-top: 10px;
                padding-top: 20px;
              }

              span.close-filter-param {
                display: none;
              }
            }

            span.toggleFilterVisibility {
              display: inline;
              flex: 100%;
              margin-bottom: 10px;
              margin-right: 0;
              order: 99;
              text-align: center;
            }

            label {
              font-size: 13px;
            }

            button.close-mobile-filters {
              background: ${colors.blue};
              border: 1px solid ${colors.darkenedBlue};
              bottom: 10px;
              color: white;
              left: 10px;
              margin: 0 auto;
              position: fixed;
              width: calc(100vw - 20px);
              z-index: 3;
              &:hover {
                background: ${colors.darkenedBlue};
              }
            }
          }
        }
      `}</style>
    </div>
  }
}
