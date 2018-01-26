import { Component } from 'react'
import Link from 'next/link'
import Select from 'react-select'
import numeral from 'numeral'

import * as colors from '../../../../constants/colors'
import { mobileMedia } from '../../../../constants/media'

export default class FilterHeader extends Component {
  getNumberOfActiveParams = () => {
    const { price, area, rooms, neighborhoods } = this.props.params

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

  isMobileMainButtonActive = () => {
    const { isMobileOpen } = this.props
    const isAnyFilterActive = this.getNumberOfActiveParams() > 0

    return isMobileOpen || isAnyFilterActive
  }

  render() {
    const { handleToggleVisibility } = this.props
    return [
      <span key={1} className="filter-title">
        Filtros
      </span>,

      <div key={2} className="mobile-control-container">
        <button
          className={"mobile-filter-toggler " + (this.isMobileMainButtonActive() ? 'active' : '')}
          onClick={handleToggleVisibility}
        >
          {this.renderTextForMobileMainButton()}
        </button>


        <span className="mobile remove-all-filters" onClick={this.removeAllFilters}>
          Limpar
        </span>
      <style jsx>{`
        .mobile-control-container button {
          margin-left: 10px;
          margin-right: 0;
          padding-left: 10px;
          padding-right: 10px;
        }
      `}</style>
      </div>
    ]
  }
}
