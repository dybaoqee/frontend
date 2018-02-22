import {Component} from 'react'
import Select from 'react-select'

import {roomNumberOptions} from 'constants/listing-filter-options'

export default class RoomFilter extends Component {
  onChange = (val) => this.props.onChange({value: val ? val.value : undefined})

  isButtonActive = () => {
    const {value, visible} = this.props.rooms
    return value || visible
  }

  buttonText = () => {
    const {value} = this.props.rooms

    if (value) {
      return value + ' quartos'
    } else {
      return 'Quartos'
    }
  }

  render() {
    const {rooms, toggleVisibility, handleClose} = this.props

    const {value, visible} = rooms

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
                name="form-field-name"
                arrowRenderer={null}
                style={{width: 130}}
                placeholder="Nº Quartos"
                value={value}
                onChange={this.onChange}
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
