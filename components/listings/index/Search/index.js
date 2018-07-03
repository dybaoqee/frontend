import {Component} from 'react'

import FilterHeader from './Header'
import PriceFilter from './Price'
import AreaFilter from './Area'
import RoomFilter from './Rooms'
import GarageSpotsFilter from './GarageSpots'
import NeighborhoodFilter from './Neighborhoods'

export default class Filter extends Component {
  state = {
    visible: []
  }

  onChange = (prop) => (value) => this.props.onChange(prop, value)

  onChangeArea = this.onChange('area')
  onChangeRooms = this.onChange('rooms')
  onChangePrice = this.onChange('price')
  onChangeNeighborhoods = this.onChange('neighborhoods')
  onChangeGarageSpots = this.onChange('garageSpots')

  onToggle = (prop) => () =>
    this.setState({visible: this.isVisible(prop) ? [] : [prop]})

  // Toggle multiple items at once on mobile
  onToggleList = (...props) => () =>
    this.setState({visible: this.isVisible(props[0]) ? [] : props})

  onToggleArea = this.onToggle('area')
  onToggleRooms = this.onToggle('rooms')
  onTogglePrice = this.onToggle('price')
  onToggleNeighborhoods = this.onToggle('neighborhoods')
  onToggleGarageSpots = this.onToggle('garageSpots')

  onClose = () => this.setState({visible: []})

  isVisible(prop) {
    const {visible} = this.state
    if (!prop) return visible.length !== 0
    return visible.indexOf(prop) !== -1
  }

  get active() {
    return this.state.visible.length !== 0
  }

  render() {
    const {active} = this
    const {visible} = this.state
    const {params, onReset, neighborhoods} = this.props
    let className = 'listings-filter-container'
    if (active) className += ' filter-open'

    return (
      <div className={className}>
        {active && (
          <div className="active-filter-overlay" onClick={this.onClose} />
        )}

        <FilterHeader
          params={params}
          visible={visible}
          onToggle={this.onToggleList}
          onReset={onReset}
        />

        <PriceFilter
          value={params.price}
          visible={this.isVisible('price')}
          onChange={this.onChangePrice}
          onToggle={this.onTogglePrice}
          onClose={this.onClose}
        />

        <AreaFilter
          value={params.area}
          visible={this.isVisible('area')}
          onChange={this.onChangeArea}
          onToggle={this.onToggleArea}
          onClose={this.onClose}
        />

        <RoomFilter
          value={params.rooms}
          visible={this.isVisible('rooms')}
          onChange={this.onChangeRooms}
          onToggle={this.onToggleRooms}
          onClose={this.onClose}
        />

        <GarageSpotsFilter
          value={params.garageSpots}
          visible={this.isVisible('garageSpots')}
          onChange={this.onChangeGarageSpots}
          onToggle={this.onToggleGarageSpots}
          onClose={this.onClose}
        />

        <NeighborhoodFilter
          value={params.neighborhoods}
          visible={this.isVisible('neighborhoods')}
          neighborhoods={neighborhoods}
          onChange={this.onChangeNeighborhoods}
          onToggle={this.onToggleNeighborhoods}
          onClose={this.onClose}
        />

        {active && (
          <button className="close-mobile-filters" onClick={this.onClose}>
            Ver Resultados
          </button>
        )}

        <span className="remove-all-filters" onClick={onReset}>
          Limpar Filtros
        </span>
      </div>
    )
  }
}
