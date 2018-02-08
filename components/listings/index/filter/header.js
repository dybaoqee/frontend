import {Component} from 'react'

import {mobileMedia} from 'constants/media'
import * as colors from 'constants/colors'

export default class FilterHeader extends Component {
  getNumberOfActiveParams = () => {
    const {price, area, rooms, neighborhoods} = this.props.params

    let numberOfParams = 0

    if (price.min || price.max) numberOfParams++
    if (area.min || area.max) numberOfParams++
    if (rooms.value) numberOfParams++
    if (neighborhoods.value.length > 0) numberOfParams++

    return numberOfParams
  }

  isMobileOtherButtonActive = () => {
    const {area, rooms} = this.props.params

    return area.visible || area.min || area.max || rooms.visible || rooms.value
  }

  isMobilePriceButtonActive = () => {
    const {visible, min, max} = this.props.params.price

    return visible || min || max
  }

  isMobileNeighborhoodsButtonActive = () => {
    const {visible, value} = this.props.params.neighborhoods

    return visible || value.length
  }

  isMobileOtherButtonActive = () => {
    const {area, rooms} = this.props.params

    return area.visible || area.min || area.max || rooms.visible || rooms.value
  }

  render() {
    const {
      toggleOtherMobileParams,
      toggleMobilePriceVisibility,
      toggleMobileNeighborhoodsVisibility,
      resetAllParams,
    } = this.props

    return [
      <span key={1} className="filter-title">
        Filtros
        <style jsx>{`
          span {
            color: ${colors.mediumDarkGray};
            padding-left: 20px;
            padding-right: 30px;
          }

          @media ${mobileMedia} {
            span {
              display: none;
              padding: 0 10px;
            }
          }
        `}</style>
      </span>,

      <div key={2} className="mobile-control-container">
        <button
          className={
            'mobile-filter-toggler ' +
            (this.isMobileNeighborhoodsButtonActive() ? 'active' : '')
          }
          onClick={toggleMobileNeighborhoodsVisibility}
        >
          Bairros
        </button>

        <button
          className={
            'mobile-filter-toggler ' +
            (this.isMobilePriceButtonActive() ? 'active' : '')
          }
          onClick={toggleMobilePriceVisibility}
        >
          Preço
        </button>

        <button
          className={
            'mobile-filter-toggler ' +
            (this.isMobileOtherButtonActive() ? 'active' : '')
          }
          onClick={toggleOtherMobileParams}
        >
          Outros
        </button>

        <span className="mobile remove-all-filters" onClick={resetAllParams}>
          Limpar
        </span>

        <style jsx>{`
          span.filter-title {
            color: ${colors.mediumDarkGray};
            padding-left: 20px;
            padding-right: 30px;
          }

          .mobile-filter-toggler {
            display: none;
          }

          @media ${mobileMedia} {
            div.mobile-control-container {
              align-items: center;
              display: flex;
              justify-content: space-between;
              width: 100vw;

              button {
                margin-left: 10px;
                margin-right: 0;
                padding-left: 10px;
                padding-right: 10px;
              }

              button.mobile-filter-toggler {
                display: block;
                margin-left: 10px;
              }
            }

            span.filter-title {
              display: none;
            }
          }
        `}</style>
      </div>,
    ]
  }
}
