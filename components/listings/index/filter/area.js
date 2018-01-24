import { Component } from 'react'
import Link from 'next/link'
import Select from 'react-select'
import numeral from 'numeral'

import * as colors from '../../../../constants/colors'
import { mobileMedia } from '../../../../constants/media'
import { minAreaOptions, maxAreaOptions } from '../../../../constants/listing-filter-options'

export default class AreaFilter extends Component {
  shouldRenderAreaButtonAsActive = () => {
    const { isVisible, minArea, maxArea } = this.props
    return minArea || maxArea || isVisible
  }

  renderTextForAreaButton = () => {
    const { minArea, maxArea } = this.props
    const abbreviatedMinArea = numeral(minArea).format('0a')
    const abbreviatedMaxArea = numeral(maxArea).format('0a')

    let suffix

    if (minArea && maxArea) {
      suffix = abbreviatedMinArea + '-' + abbreviatedMaxArea
    } else if (minArea) {
      suffix = abbreviatedMinArea + 'm²+'
    } else if (maxArea) {
      suffix = '0-' + abbreviatedMaxArea + 'm²'
    }

    if (suffix) {
      return suffix
    } else {
      return 'Área'
    }
  }

  render() {
    const {
      isVisible,
			minArea,
			maxArea,
			handleMinAreaChange,
			handleMaxAreaChange,
			toggleVisibility,
			handleCloseFilterParam
    } = this.props

    return <div className="filter-param-container">
      <button
        className={this.shouldRenderAreaButtonAsActive() ? 'active' : ''}
        onClick={toggleVisibility}
      >
        {this.renderTextForAreaButton()}
      </button>

      {isVisible &&
        <div className="option-container">
          <span className="mobile-param-title">Área</span>
          <div>
            <Select
              name="form-field-name"
              arrowRenderer={null}
              style={{width: 100}}
              placeholder="m²"
              value={minArea}
              onChange={handleMinAreaChange}
              options={minAreaOptions}
              searchable={false} />

            <label>até</label>

            <Select
              name="form-field-name"
              arrowRenderer={null}
              style={{width: 100}}
              placeholder="m²"
              value={maxArea}
              onChange={handleMaxAreaChange}
              options={maxAreaOptions}
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
