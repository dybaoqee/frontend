import { Component } from 'react'

import * as colors from '../../../constants/colors'
import { mobileMedia } from '../../../constants/media'

import FilterHeader from '../../../components/listings/index/filter/header'
import PriceFilter from '../../../components/listings/index/filter/price'
import AreaFilter from '../../../components/listings/index/filter/area'
import RoomFilter from '../../../components/listings/index/filter/rooms'
import NeighborhoodFilter from '../../../components/listings/index/filter/neighborhoods'

export default class Filter extends Component {
  render() {
    const { isMobileOpen, params, neighborhoodOptions } = this.props
    const { price, area, rooms, neighborhoods } = params
    const {
      handleMinPriceChange,
      handleMaxPriceChange,
      handleMinAreaChange,
      handleMaxAreaChange,
      handleRoomChange,
      handleNeighborhoodChange,
      resetAllParams,
      toggleRoomVisibility,
      togglePriceVisibility,
      toggleAreaVisibility,
      toggleNeighborhoodsVisibility,
      toggleMobilePriceVisibility,
      toggleMobileNeighborhoodsVisibility,
      toggleOtherMobileParams,
      hideAllParams,
      isAnyParamVisible,
      handleOverlayClick,
    } = this.props

    return <div className={'listings-filter-container '+ (isAnyParamVisible() ? 'filter-open' : '')}>
      {
        isAnyParamVisible() &&
        <div className="active-filter-overlay" onClick={handleOverlayClick} />
      }

      <FilterHeader
        params={params}
        isMobileOpen={isMobileOpen}
        toggleMobilePriceVisibility={toggleMobilePriceVisibility}
        toggleMobileNeighborhoodsVisibility={toggleMobileNeighborhoodsVisibility}
        resetAllParams={resetAllParams}
        toggleOtherMobileParams={toggleOtherMobileParams}
      />

      <PriceFilter
        price={price}
        handleMinPriceChange={handleMinPriceChange}
        handleMaxPriceChange={handleMaxPriceChange}
        toggleVisibility={togglePriceVisibility}
        handleClose={hideAllParams}
      />

      <AreaFilter
        area={area}
        handleMinAreaChange={handleMinAreaChange}
        handleMaxAreaChange={handleMaxAreaChange}
        toggleVisibility={toggleAreaVisibility}
        handleClose={hideAllParams}
      />

      <RoomFilter
        rooms={rooms}
        handleChange={handleRoomChange}
        toggleVisibility={toggleRoomVisibility}
        handleClose={hideAllParams}
      />

      <NeighborhoodFilter
        neighborhoods={neighborhoods}
        options={neighborhoodOptions}
        handleChange={handleNeighborhoodChange}
        toggleVisibility={toggleNeighborhoodsVisibility}
        handleClose={hideAllParams}
      />

      {isMobileOpen &&
        <button
          className="close-mobile-filters"
          onClick={hideAllParams}
        >
          Ver Resultados
        </button>
      }

      <span className="remove-all-filters" onClick={resetAllParams}>
        Limpar Filtros
      </span>

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

          div.active-filter-overlay {
            background: rgba(100, 100, 100, 0.85);
            height: calc(100vh - 135px);
            position: absolute;
            top: 58px;
            left: 0;
            width: 100vw;
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

            div.active-filter-overlay {
              background: white;
            }

            span.remove-all-filters {
              display: none;
              &.mobile {
                display: block;
                margin-right: 0;
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

            div.filter-param-container {
              width: 100vw;

              button {
                display: none;
              }
            }

            div.option-container {
              border: none;
              border-top: 1px solid ${colors.lightGray};
              height: auto;
              margin-right: 0;
              margin-top: 10px;
              padding: 15px 10px 15px;
              position: relative;
              top: 0;

              span.close-filter-param {
                display: none;
              }
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
