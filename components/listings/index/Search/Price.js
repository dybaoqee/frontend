import {Component} from 'react'
import Select from 'react-select'
import numeral from 'numeral'

import {
  minPriceOptions,
  maxPriceOptions
} from 'constants/listing-filter-options'

export default class PriceFilter extends Component {
  onChange = (prop) => (val) => {
    const {price: {min, max}, onChange} = this.props
    onChange({min, max, [prop]: val ? val.value : undefined})
  }

  onChangeMin = this.onChange('min')

  onChangeMax = this.onChange('max')

  isButtonActive = () => {
    const {min, max, visible} = this.props.price
    return min || max || visible
  }

  buttonText = () => {
    const {min, max} = this.props.price
    const abbreviatedMin = numeral(min).format('0a')
    const abbreviatedMax = numeral(max).format('0a')

    let suffix

    if (min && max) {
      suffix = abbreviatedMin + '-' + abbreviatedMax
    } else if (min) {
      suffix = abbreviatedMin + '+'
    } else if (max) {
      suffix = '0-' + abbreviatedMax
    }

    if (suffix) {
      return 'R$' + suffix.split('m').join('M')
    } else {
      return 'Preço'
    }
  }

  render() {
    const {price, toggleVisibility, handleClose} = this.props

    return (
      <div className="filter-param-container">
        <button
          className={this.isButtonActive() ? 'active' : ''}
          onClick={toggleVisibility}
        >
          {this.buttonText()}
        </button>

        {price.visible && (
          <div className="option-container price-container">
            <span className="mobile-param-title">Preço</span>
            <div>
              <Select
                arrowRenderer={null}
                style={{width: 130}}
                placeholder="R$"
                value={price.min}
                onChange={this.onChangeMin}
                options={minPriceOptions}
                searchable={false}
              />

              <label>até</label>

              <Select
                arrowRenderer={null}
                style={{width: 130}}
                placeholder="R$"
                value={price.max}
                onChange={this.onChangeMax}
                options={maxPriceOptions}
                searchable={false}
              />
            </div>

            <span className="close-filter-param" onClick={handleClose}>
              Aplicar
            </span>
          </div>
        )}
      </div>
    )
  }
}
