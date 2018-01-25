import { Component } from 'react'
import Link from 'next/link'
import Select from 'react-select'
import numeral from 'numeral'

import * as colors from '../../../../constants/colors'
import { mobileMedia } from '../../../../constants/media'
import { roomNumberOptions } from '../../../../constants/listing-filter-options'

export default class RoomFilter extends Component {
  isButtonActive = () => {
    const { rooms, isVisible } = this.props
    return rooms || isVisible
  }

  buttonText = () => {
    const { rooms, isVisible } = this.props

    if (rooms) {
      return rooms + ' quartos'
    } else {
      return 'Quartos'
    }
  }

  render() {
    const {
      isVisible,
			rooms,
			handleChange,
			toggleVisibility,
			handleClose
    } = this.props

    return <div className="filter-param-container">
      <button
        className={this.isButtonActive() ? 'active' : ''}
        onClick={toggleVisibility}
      >
        {this.buttonText()}
      </button>

      {isVisible &&
        <div className="option-container">
          <span className="mobile-param-title">Quartos</span>
          <div>
            <Select
              name="form-field-name"
              arrowRenderer={null}
              style={{width: 130}}
              placeholder="Nº Quartos"
              value={rooms}
              onChange={handleChange}
              options={roomNumberOptions}
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
