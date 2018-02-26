import {Component} from 'react'
import Select from 'react-select'
import numeral from 'numeral'

import {
  minPriceOptions,
  maxPriceOptions
} from 'constants/listing-filter-options'

export default class PriceFilter extends Component {
  onChange = (prop) => (val) => {
    const {value: {min, max}, onChange} = this.props
    onChange({min, max, [prop]: val ? val.value : undefined})
  }

  onChangeMin = this.onChange('min')

  onChangeMax = this.onChange('max')

  get active() {
    const {value: {min, max}, visible} = this.props
    return min || max || visible
  }

  get buttonText() {
    const {min, max} = this.props.value
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
    const {value, visible, onToggle, onClose} = this.props

    return (
      <div className="filter-param-container">
        <button className={this.active ? 'active' : ''} onClick={onToggle}>
          {this.buttonText}
        </button>

        {visible && (
          <div className="option-container price-container">
            <span className="mobile-param-title">Preço</span>
            <div>
              <Select
                arrowRenderer={null}
                style={{width: 130}}
                placeholder="R$"
                value={value.min}
                onChange={this.onChangeMin}
                options={minPriceOptions}
                searchable={false}
              />

              <label>até</label>

              <Select
                arrowRenderer={null}
                style={{width: 130}}
                placeholder="R$"
                value={value.max}
                onChange={this.onChangeMax}
                options={maxPriceOptions}
                searchable={false}
              />
            </div>

            <span className="close-filter-param" onClick={onClose}>
              Aplicar
            </span>
          </div>
        )}
      </div>
    )
  }
}
