import { Component } from 'react'
import Link from 'next/link'
import Select from 'react-select'
import numeral from 'numeral'

import * as colors from '../../../../constants/colors'
import { mobileMedia } from '../../../../constants/media'
import { minPriceOptions, maxPriceOptions } from '../../../../constants/listing-filter-options'

export default class PriceFilter extends Component {
  shouldRenderPriceButtonAsActive = () => {
    const { isVisible, minPrice, maxPrice } = this.props
    return minPrice || maxPrice || isVisible
  }

  renderTextForPriceButton = () => {
    const { minPrice, maxPrice } = this.props
    const abbreviatedMinPrice = numeral(minPrice).format('0a')
    const abbreviatedMaxPrice = numeral(maxPrice).format('0a')

    let suffix

    if (minPrice && maxPrice) {
      suffix = abbreviatedMinPrice + '-' + abbreviatedMaxPrice
    } else if (minPrice) {
      suffix = abbreviatedMinPrice + '+'
    } else if (maxPrice) {
      suffix = '0-' + abbreviatedMaxPrice
    }

    if (suffix) {
      return 'R$' + suffix.split('m').join('M')
    } else {
      return 'Preço'
    }
  }


  render() {
    const {
      isVisible,
			minPrice,
			maxPrice,
			handleMinPriceChange,
			handleMaxPriceChange,
			toggleVisibility,
			handleCloseFilterParam
    } = this.props

    return <div className="filter-param-container">
      <button
        className={this.shouldRenderPriceButtonAsActive() ? 'active' : ''}
        onClick={toggleVisibility}
      >
        {this.renderTextForPriceButton()}
      </button>

      {isVisible &&
        <div className="option-container price-container">
          <span className="mobile-param-title">Preço</span>
          <div>
            <Select
              name="form-field-name"
              arrowRenderer={null}
              style={{width: 130}}
              placeholder="R$"
              value={minPrice}
              onChange={handleMinPriceChange}
              options={minPriceOptions}
              searchable={false} />

            <label>até</label>

            <Select
              name="form-field-name"
              arrowRenderer={null}
              style={{width: 130}}
              placeholder="R$"
              value={maxPrice}
              onChange={handleMaxPriceChange}
              options={maxPriceOptions}
              searchable={false} />
          </div>

          <span className="close-filter-param" onClick={handleCloseFilterParam}>
            Aplicar
          </span>
        </div>
      }
    </div>
  }
}
