import {Component} from 'react'
import Select from 'react-select'
import numeral from 'numeral'

import {roomNumberOptions} from 'constants/listing-filter-options'

export default class RoomFilter extends Component {
  onChange = (prop) => (val) => {
    const {rooms: {min, max}, onChange} = this.props
    onChange({min, max, [prop]: val ? val.value : undefined})
  }

  onChangeMin = this.onChange('min')

  onChangeMax = this.onChange('max')

  isButtonActive = () => {
    const {min, max, visible} = this.props.rooms
    return min || max || visible
  }

  buttonText = () => {
    const {min, max} = this.props.rooms
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
    const {rooms, toggleVisibility, handleClose} = this.props

    const {min, max, visible} = rooms

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
            <span className="mobile-param-title">Quartos</span>
            <div>
              <Select
                arrowRenderer={null}
                style={{width: 130}}
                placeholder="Nº Quartos"
                value={min}
                onChange={this.onChangeMin}
                options={roomNumberOptions}
                searchable={false}
              />

              <label>até</label>

              <Select
                arrowRenderer={null}
                style={{width: 130}}
                placeholder="Nº Quartos"
                value={max}
                onChange={this.onChangeMax}
                options={roomNumberOptions}
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
