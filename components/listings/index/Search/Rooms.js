import {Component} from 'react'
import Select from 'react-select'
import numeral from 'numeral'

import {roomNumberOptions} from 'constants/listing-filter-options'

export default class RoomFilter extends Component {
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
      return `${abbreviatedMin}-${abbreviatedMax} quartos`
    } else if (min) {
      return `${abbreviatedMin}+ quartos`
    } else if (max) {
      return `0-${abbreviatedMax} quartos`
    } else {
      return 'Quartos'
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
            <span className="mobile-param-title">Quartos</span>
            <div>
              <Select
                arrowRenderer={null}
                style={{width: 130}}
                placeholder="Nº Quartos"
                value={value.min}
                onChange={this.onChangeMin}
                options={roomNumberOptions}
                searchable={false}
              />

              <label>até</label>

              <Select
                arrowRenderer={null}
                style={{width: 130}}
                placeholder="Nº Quartos"
                value={value.max}
                onChange={this.onChangeMax}
                options={roomNumberOptions}
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
