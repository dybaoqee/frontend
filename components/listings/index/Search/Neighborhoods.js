import {Component} from 'react'
import Link from 'next/link'
import Select from 'react-select'
import numeral from 'numeral'

import * as colors from 'constants/colors'
import {mobileMedia} from 'constants/media'
import {neighborhoodOptions} from 'constants/listing-filter-options'

export default class NeighborhoodFilter extends Component {
  onChange = (value) => this.props.onChange(value)

  get active() {
    const {visible, value} = this.props
    return value.length > 0 || visible
  }

  get buttonText() {
    const {options} = this.props
    const {visible, value} = this.props

    if (value.length == 0) {
      return 'Bairros'
    }

    if (value.length == 1) {
      return value[0]
    } else {
      return value[0] + ' e mais ' + (value.length - 1)
    }
  }

  render() {
    const {value, visible, neighborhoods, onToggle, onClose} = this.props

    const optionsObject = neighborhoodOptions(neighborhoods)

    return (
      <div className="filter-param-container">
        <button className={this.active ? 'active' : ''} onClick={onToggle}>
          {this.buttonText}
        </button>

        {visible && (
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
                onChange={this.onChange}
                options={optionsObject}
                noResultsText="Resultado Não Encontrado"
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
