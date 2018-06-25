import {Component} from 'react'
import Select from 'react-select'
import numeral from 'numeral'

import {garageSpotsNumberOptions} from 'constants/listing-filter-options'

export default class GarageSpotsFilter extends Component {
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

    if (min && max) {
      return `${abbreviatedMin}-${abbreviatedMax} vagas`
    } else if (min) {
      return `${abbreviatedMin}+ vagas`
    } else if (max) {
      return `0-${abbreviatedMax} vagas`
    } else {
      return 'Vagas'
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
          <div className="option-container">
            <span className="mobile-param-title">Vagas</span>
            <div>
              <Select
                arrowRenderer={null}
                style={{width: 130}}
                placeholder="Nº Vagas"
                value={value.min}
                onChange={this.onChangeMin}
                options={garageSpotsNumberOptions}
                searchable={false}
              />

              <label>até</label>

              <Select
                arrowRenderer={null}
                style={{width: 130}}
                placeholder="Nº Vagas"
                value={value.max}
                onChange={this.onChangeMax}
                options={garageSpotsNumberOptions}
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
