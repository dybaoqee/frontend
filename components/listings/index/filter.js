import { Component } from 'react'
import Router from 'next/router'
import Select from 'react-select'
import NumberFormat from 'react-number-format'
import numeral from 'numeral'

import * as colors from '../../../constants/colors'
import { mobileMedia } from '../../../constants/media'
import * as filterOptions from '../../../constants/listing-filter-options'
import { treatParams } from '../../../utils/filter-params.js'

import PriceFilter from '../../../components/listings/index/filter/price'

export default class Filter extends Component {
  constructor(props) {
    super(props)

    const { preco_minimo, preco_maximo, area_minima, area_maxima, quartos, bairros } = props.query
    const bairrosArray = bairros ? bairros.split('|') : []

    this.state = {
      isMobileOpen: false,
      filterVisibility: {
        price: false,
        area: false,
        rooms: false,
        neighborhoods: false
      },
      filterParams: {
        preco_minimo: preco_minimo,
        preco_maximo: preco_maximo,
        area_minima: area_minima,
        area_maxima: area_maxima,
        quartos: quartos,
        bairros: bairrosArray
      }
    }
  }

  updateSelectedOption = (selectedOption, stateKey) => {
    const value = (selectedOption && selectedOption.value) ? selectedOption.value : null
    const state = this.state
    state.filterParams[stateKey] = value
    this.setState(state)

    this.updateFilter()
  }

  handleRoomChange = (selectedOption) => {
    this.updateSelectedOption(selectedOption, 'quartos')
  }

  handleMinPriceChange = (selectedOption) => {
    this.updateSelectedOption(selectedOption, 'preco_minimo')
  }

  handleMaxPriceChange = (selectedOption) => {
    this.updateSelectedOption(selectedOption, 'preco_maximo')
  }

  handleMinAreaChange = (selectedOption) => {
    this.updateSelectedOption(selectedOption, 'area_minima')
  }

  handleMaxAreaChange = (selectedOption) => {
    this.updateSelectedOption(selectedOption, 'area_maxima')
  }

  handleNeighborhoodChange = (value) => {
    const state = this.state
    state.filterParams.bairros = value
    this.setState(state)

    this.updateFilter()
  }

  updateFilter = () => {
    const params = treatParams(this.state.filterParams)

    if (params) {
      Router.push(`/listings/index?${params}`, `/imoveis?${params}`)
    } else {
      Router.push(`/listings/index`, `/imoveis`)
    }
  }

  removeAllFilters = () => {
    const state = this.state
    state.filterParams = {
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

  handleToggleFilterVisibility = () => {
    const state = this.state
    state.isMobileOpen = !state.isMobileOpen
    state.filterVisibility = {
      price: state.isMobileOpen,
      area: state.isMobileOpen,
      rooms: state.isMobileOpen,
      neighborhoods: state.isMobileOpen
    }
    this.setState(state)
  }

  toggleRoomFilterVisibility = () => {
    this.toggleParamFilterVisibility('rooms')
  }

  togglePriceFilterVisibility = () => {
    this.toggleParamFilterVisibility('price')
  }

  toggleAreaFilterVisibility = () => {
    this.toggleParamFilterVisibility('area')
  }

  toggleNeighborhoodsFilterVisibility = () => {
    this.toggleParamFilterVisibility('neighborhoods')
  }

  toggleParamFilterVisibility = (param) => {
    const state = this.state
    const newParamFilterVisibility = !state.filterVisibility[param]

    this.setAllParamFiltersVisibilityToFalse()

    state.filterVisibility[param] = newParamFilterVisibility
    this.setState(state)
  }

  setAllParamFiltersVisibilityToFalse = () => {
    const { state } = this
    const { filterVisibility } = state

    Object.keys(filterVisibility).map(function(key) {
      state.filterVisibility[key] = false
    })

    this.setState(state)
  }

  isAnyParamFilterOpen = () => {
    const { filterVisibility } = this.state

    return Object.keys(filterVisibility).some(function(key) {
      return filterVisibility[key] === true
    })
  }


  renderTextForAreaButton = () => {
    const { area_minima, area_maxima } = this.state.filterParams
    const abbreviatedMinArea = numeral(area_minima).format('0a')
    const abbreviatedMaxArea = numeral(area_maxima).format('0a')

    let suffix

    if (area_minima && area_maxima) {
      suffix = abbreviatedMinArea + '-' + abbreviatedMaxArea
    } else if (area_minima) {
      suffix = abbreviatedMinArea + 'm²+'
    } else if (area_maxima) {
      suffix = '0-' + abbreviatedMaxArea + 'm²'
    }

    if (suffix) {
      return suffix
    } else {
      return 'Área'
    }
  }

  renderTextForRoomsButton = () => {
    const { quartos } = this.state.filterParams

    let suffix

    if (quartos) {
      return quartos + ' quartos'
    } else {
      return 'Quartos'
    }
  }

  renderTextForRoomsButton = () => {
    const { quartos } = this.state.filterParams

    let suffix

    if (quartos) {
      return quartos + ' quartos'
    } else {
      return 'Quartos'
    }
  }

  renderTextForNeighborhoodsButton = () => {
    const { bairros } = this.state.filterParams

    if (bairros.length == 0) {
      return 'Bairros'
    }

    const firstNeighborhood = bairros[0].value || bairros[0]

    if (bairros.length == 1) {
      return firstNeighborhood
    } else {
      return firstNeighborhood + ' e mais ' + (bairros.length - 1)
    }
  }

  shouldRenderAreaButtonAsActive = () => {
    const { filterVisibility } = this.state
    const { area_minima, area_maxima } = this.state.filterParams
    return area_minima || area_maxima || filterVisibility.area
  }

  shouldRenderRoomsButtonAsActive = () => {
    const { filterVisibility } = this.state
    const { quartos } = this.state.filterParams
    return quartos || filterVisibility.rooms
  }

  shouldRenderNeighborhoodsButtonAsActive = () => {
    const { filterVisibility } = this.state
    const { bairros } = this.state.filterParams
    return (bairros.length > 0) || filterVisibility.neighborhoods
  }

  getNumberOfActiveFilters = () => {
    const { preco_minimo, preco_maximo, area_minima, area_maxima, quartos, bairros } = this.state.filterParams

    let numberOfFilters = 0

    if (preco_minimo || preco_maximo) numberOfFilters++
    if (area_minima || area_maxima) numberOfFilters++
    if (quartos) numberOfFilters++
    if (bairros.length > 0) numberOfFilters ++

    return numberOfFilters
  }

  renderTextForMobileMainButton = () => {
    const numberOfFilters = this.getNumberOfActiveFilters()

    const suffix =
      (numberOfFilters == 0) ?
        ''
        : ': ' + numberOfFilters

    return 'Filtros' + suffix
  }

  isMobileMainButtonActive = () => {
    const { isMobileOpen } = this.state
    const isAnyFilterActive = this.getNumberOfActiveFilters() > 0

    return isMobileOpen || isAnyFilterActive
  }

  handleOverlayClick = () => {
    const { isMobileOpen } = this.state

    if (!isMobileOpen) this.setAllParamFiltersVisibilityToFalse()
  }

  render() {
    const { neighborhoods, query } = this.props
    const neighborhoodOptions = filterOptions.neighborhoodOptions(neighborhoods)
    const { preco_minimo, preco_maximo, area_minima, area_maxima, quartos, bairros } = this.state.filterParams

    const { filterVisibility, isMobileOpen } = this.state

    return <div className={"container "+ (this.isAnyParamFilterOpen() ? 'filter-open' : '')}>
      {
        this.isAnyParamFilterOpen() &&
        <div className="active-filter-overlay" onClick={this.handleOverlayClick} />
      }

      <span className="filter-title">
        Filtros
      </span>

      <div className="mobile-control-container">
        <button
          className={"mobile-filter-toggler " + (this.isMobileMainButtonActive() ? 'active' : '')}
          onClick={this.handleToggleFilterVisibility}
        >
          {this.renderTextForMobileMainButton()}
        </button>

        <span className="mobile remove-all-filters" onClick={this.removeAllFilters}>
          Limpar
        </span>
      </div>

      <PriceFilter
        isVisible={filterVisibility.price}
        minPrice={preco_minimo}
        maxPrice={preco_maximo}
      />

      <div className="filter-param-container">
        <button
          className={this.shouldRenderAreaButtonAsActive() ? 'active' : ''}
          onClick={this.toggleAreaFilterVisibility}
        >
          {this.renderTextForAreaButton()}
        </button>

        {filterVisibility.area &&
          <div className="option-container">
            <span className="mobile-param-title">Área</span>
            <div>
              <Select
                name="form-field-name"
                arrowRenderer={null}
                style={{width: 100}}
                placeholder="m²"
                value={area_minima}
                onChange={this.handleMinAreaChange}
                options={filterOptions.minAreaOptions}
                searchable={false} />

              <label>até</label>

              <Select
                name="form-field-name"
                arrowRenderer={null}
                style={{width: 100}}
                placeholder="m²"
                value={area_maxima}
                onChange={this.handleMaxAreaChange}
                options={filterOptions.maxAreaOptions}
                searchable={false} />
            </div>
            <span className="close-filter-param" onClick={this.setAllParamFiltersVisibilityToFalse}>
              Aplicar
            </span>
          </div>
        }
      </div>

      <div className="filter-param-container">
        <button
          className={this.shouldRenderRoomsButtonAsActive() ? 'active' : ''}
          onClick={this.toggleRoomFilterVisibility}
        >
          {this.renderTextForRoomsButton()}
        </button>

        {filterVisibility.rooms &&
          <div className="option-container">
            <span className="mobile-param-title">Quartos</span>
            <div>
              <Select
                name="form-field-name"
                arrowRenderer={null}
                style={{width: 130}}
                placeholder="Nº Quartos"
                value={quartos}
                onChange={this.handleRoomChange}
                options={filterOptions.roomNumberOptions}
                searchable={false} />
            </div>
            <span className="close-filter-param" onClick={this.setAllParamFiltersVisibilityToFalse}>
              Aplicar
            </span>
          </div>
        }
      </div>

      <div className="filter-param-container">
        <button
          className={this.shouldRenderNeighborhoodsButtonAsActive() ? 'active' : ''}
          onClick={this.toggleNeighborhoodsFilterVisibility}
        >
          {this.renderTextForNeighborhoodsButton()}
        </button>

        {filterVisibility.neighborhoods &&
          <div className="option-container">
            <span className="mobile-param-title">Bairros</span>
            <div>
              <Select
                name="form-field-name"
                arrowRenderer={null}
                style={{width: 200}}
                placeholder="Bairros"
                multi={true}
                value={bairros}
                onChange={this.handleNeighborhoodChange}
                options={neighborhoodOptions}
                searchable={false} />
            </div>
            <span className="close-filter-param" onClick={this.setAllParamFiltersVisibilityToFalse}>
              Aplicar
            </span>
          </div>
        }
      </div>

      {isMobileOpen &&
        <button
          className="close-mobile-filters"
          onClick={this.handleToggleFilterVisibility}
        >
          Ver Resultados
        </button>
      }

      <span className="remove-all-filters" onClick={this.removeAllFilters}>
        Limpar Filtros
      </span>

      <style global jsx>{`
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
      `}</style>

      <style jsx>{`
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
        div.container {
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

          div {
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

        @media ${mobileMedia} {
          div.container {
            flex-wrap: wrap;
          }

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
            color: white;
            z-index: 3;
            margin: 0 auto;
            width: calc(100vw - 20px);
            &:hover {
              background: ${colors.darkenedBlue};
            }
          }
        }
      `}</style>
    </div>
  }
}
