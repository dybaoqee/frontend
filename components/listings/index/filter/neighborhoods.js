import { Component } from 'react'
import Link from 'next/link'
import Select from 'react-select'
import numeral from 'numeral'

import * as colors from '../../../../constants/colors'
import { mobileMedia } from '../../../../constants/media'
import { neighborhoodOptions } from '../../../../constants/listing-filter-options'

export default class NeighborhoodFilter extends Component {
  isButtonActive = () => {
    const { isVisible, selectedOptions } = this.props
    return (selectedOptions.length > 0) || isVisible
  }

  buttonText = () => {
    const { options, selectedOptions } = this.props

    if (selectedOptions.length == 0) {
      return 'Bairros'
    }

    const firstOption = options[0].value || options[0]

    if (options.length == 1) {
      return firstOption
    } else {
      return firstOption + ' e mais ' + (options.length - 1)
    }
  }

  render() {
    const {
      isVisible,
			options,
      selectedOptions,
			handleChange,
			toggleVisibility,
			handleCloseFilterParam
    } = this.props

    const optionsObject = neighborhoodOptions(options)

    return <div className="filter-param-container">
      <button
        className={this.isButtonActive() ? 'active' : ''}
        onClick={toggleVisibility}
      >
        {this.buttonText()}
      </button>

      {isVisible &&
        <div className="option-container">
          <span className="mobile-param-title">Bairros</span>
          <div>
            <Select
              name="form-field-name"
              arrowRenderer={null}
              style={{width: 200}}
              placeholder="Bairros"
              multi={true}
              value={selectedOptions}
              onChange={handleChange}
              options={optionsObject}
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
