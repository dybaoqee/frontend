import {Component} from 'react'
import Select from 'react-select'
import numeral from 'numeral'

import {minAreaOptions, maxAreaOptions} from 'constants/listing-filter-options'

export default class AreaFilter extends Component {
  onChange = (prop) => (val) => {
    const {area: {min, max}, onChange} = this.props
    onChange({min, max, [prop]: val ? val.value : undefined})
  }

  onChangeMin = this.onChange('min')

  onChangeMax = this.onChange('max')

  isButtonActive = () => {
    const {min, max, visible} = this.props.area
    return min || max || visible
  }

  buttonText = () => {
    const {min, max} = this.props.area
    const abbreviatedMin = numeral(min).format('0a')
    const abbreviatedMax = numeral(max).format('0a')

    let suffix

    if (min && max) {
      suffix = abbreviatedMin + '-' + abbreviatedMax +'m²'
    } else if (min) {
      suffix = abbreviatedMin + 'm²+'
    } else if (max) {
      suffix = '0-' + abbreviatedMax + 'm²'
    }

    if (suffix) {
      return suffix
    } else {
      return 'Área'
    }
  }

  render() {
    const {area, toggleVisibility, handleClose} = this.props

    const {min, max, visible} = area

    return (
      <div className="filter-param-container">
        <button
          className={this.isButtonActive() ? 'active' : ''}
          onClick={toggleVisibility}
        >
          {this.buttonText()}
        </button>

        {visible && (
          <div className="option-container">
            <span className="mobile-param-title">Área</span>
            <div>
              <Select
                arrowRenderer={null}
                style={{width: 100}}
                placeholder="m²"
                value={min}
                onChange={this.onChangeMin}
                options={minAreaOptions}
                searchable={false}
              />

              <label>até</label>

              <Select
                arrowRenderer={null}
                style={{width: 100}}
                placeholder="m²"
                value={max}
                onChange={this.onChangeMax}
                options={maxAreaOptions}
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
