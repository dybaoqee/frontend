import { Component } from 'react'
import Link from 'next/link'
import Select from 'react-select'
import numeral from 'numeral'

import * as colors from '../../../../constants/colors'
import { mobileMedia } from '../../../../constants/media'
import { minAreaOptions, maxAreaOptions } from '../../../../constants/listing-filter-options'

export default class AreaFilter extends Component {
  isButtonActive = () => {
    const { min, max, visible } = this.props.area
    return min || max || visible
  }

  buttonText = () => {
    const { min, max } = this.props.area
    const abbreviatedMin = numeral(min).format('0a')
    const abbreviatedMax = numeral(max).format('0a')

    let suffix

    if (min && max) {
      suffix = abbreviatedMin + '-' + abbreviatedMax
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
    const {
      area,
			handleMinAreaChange,
			handleMaxAreaChange,
			toggleVisibility,
			handleClose
    } = this.props

    const { min, max, visible } = area

    return <div className="filter-param-container">
      <button
        className={this.isButtonActive() ? 'active' : ''}
        onClick={toggleVisibility}
      >
        {this.buttonText()}
      </button>

      {visible &&
        <div className="option-container">
          <span className="mobile-param-title">Área</span>
          <div>
            <Select
              name="form-field-name"
              arrowRenderer={null}
              style={{width: 100}}
              placeholder="m²"
              value={min}
              onChange={handleMinAreaChange}
              options={minAreaOptions}
              searchable={false} />

            <label>até</label>

            <Select
              name="form-field-name"
              arrowRenderer={null}
              style={{width: 100}}
              placeholder="m²"
              value={max}
              onChange={handleMaxAreaChange}
              options={maxAreaOptions}
              searchable={false} />
          </div>
          <span className="close-filter-param" onClick={handleClose}>
            Aplicar
          </span>
        </div>
      }
    </div>
  }
}
