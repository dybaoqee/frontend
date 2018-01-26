import { Component } from 'react'
import Link from 'next/link'
import Select from 'react-select'
import numeral from 'numeral'

import * as colors from '../../../../constants/colors'
import { mobileMedia } from '../../../../constants/media'
import { neighborhoodOptions } from '../../../../constants/listing-filter-options'

export default class NeighborhoodFilter extends Component {
  isButtonActive = () => {
    const { visible, value } = this.props.neighborhoods
    return (value.length > 0) || visible
  }

  buttonText = () => {
    const { options } = this.props
    const { visible, value } = this.props.neighborhoods

    if (value.length == 0) {
      return 'Bairros'
    }

    const firstOption = value[0].value || value[0]

    if (value.length == 1) {
      return firstOption
    } else {
      return firstOption + ' e mais ' + (value.length - 1)
    }
  }

  render() {
    const {
      neighborhoods,
			options,
      selectedOptions,
			handleChange,
			toggleVisibility,
			handleClose
    } = this.props

    const { value, visible } = neighborhoods

    const optionsObject = neighborhoodOptions(options)

    return <div className="filter-param-container">
      <button
        className={this.isButtonActive() ? 'active' : ''}
        onClick={toggleVisibility}
      >
        {this.buttonText()}
      </button>

      {visible &&
        <div className="option-container">
          <span className="mobile-param-title">Bairros</span>
          <div>
            <Select
              name="form-field-name"
              arrowRenderer={null}
              style={{width: 200}}
              placeholder="Bairros"
              multi={true}
              value={value}
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
