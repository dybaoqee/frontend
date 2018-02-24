import {Component} from 'react'

import {mobileMedia} from 'constants/media'
import * as colors from 'constants/colors'

export default class FilterHeader extends Component {
  isActiveRange = (prop) => {
    const param = this.props.params[prop]
    const visible = this.props.visibility[prop]
    return visible || param.min || param.max
  }

  isActiveList = (prop) => {
    const param = this.props.params[prop]
    const visible = this.props.visibility[prop]
    return visible || param.value.length
  }

  isAreaActive = () => this.isActiveRange('area')
  isPriceActive = () => this.isActiveRange('price')
  isRoomsActive = () => this.isActiveRange('rooms')
  isNeighborhoodsActive = () => this.isActiveList('neighborhoods')
  isOtherActive = () =>
    this.isActiveRange('rooms') || this.isActiveRange('area')

  getNumberOfActiveParams = () =>
    _.filter([
      this.isAreaActive(),
      this.isPriceActive(),
      this.isRoomsActive(),
      this.isNeighborhoodsActive()
    ]).length

  render() {
    const {onToggle, onReset} = this.props

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
            (this.isNeighborhoodsActive() ? 'active' : '')
          }
          onClick={onToggle('neighborhoods')}
        >
          Bairros
        </button>

        <button
          className={
            'mobile-filter-toggler ' + (this.isPriceActive() ? 'active' : '')
          }
          onClick={onToggle('price')}
        >
          Preço
        </button>

        <button
          className={
            'mobile-filter-toggler ' + (this.isOtherActive() ? 'active' : '')
          }
          onClick={onToggle('rooms', 'area')}
        >
          Outros
        </button>

        <span className="mobile remove-all-filters" onClick={onReset}>
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
      </div>
    ]
  }
}
