import {Component} from 'react'

import * as colors from 'constants/colors'
import {mobileMedia} from 'constants/media'

import FilterHeader from './Header'
import PriceFilter from './Price'
import AreaFilter from './Area'
import RoomFilter from './Rooms'
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

  onToggle = (prop) => () =>
    this.setState({visible: this.isVisible(prop) ? [] : [prop]})

  // Toggle multiple items at once on mobile
  onToggleList = (...props) => () =>
    this.setState({visible: this.isVisible(props[0]) ? [] : props})

  onToggleArea = this.onToggle('area')
  onToggleRooms = this.onToggle('rooms')
  onTogglePrice = this.onToggle('price')
  onToggleNeighborhoods = this.onToggle('neighborhoods')

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

        <style global jsx>{`
          .listings-filter-container {
            align-items: center;
            background: white;
            border-bottom: 1px solid ${colors.lightGray};
            display: flex;
            overflow: visible;
            padding: 10px 0;
            position: fixed;
            width: 100vw;
            z-index: 4;
            &.filter-open {
              box-shadow: 1px 1px 4px ${colors.lightGray};
            }

            .Select-control {
              border-color: ${colors.blue.medium};
            }

            .Select-placeholder {
              color: ${colors.mediumGray};
              text-align: center;
            }

            .Select.has-value.is-clearable.Select--single
              > .Select-control
              .Select-value {
              padding-right: 20px;
            }

            div.active-filter-overlay {
              background: rgba(100, 100, 100, 0.85);
              height: calc(100vh - 135px);
              position: absolute;
              top: 58px;
              left: 0;
              width: 100vw;
            }

            div.filter-param-container {
              position: relative;
            }

            div.option-container {
              background: white;
              border: 1px solid ${colors.lightGray};
              border-top: 1px solid white;
              height: calc(100vh - 170px);
              justify-content: space-between;
              margin-right: 40px;
              padding: 20px;
              position: absolute;
              top: 47px;

              > div {
                align-items: center;
                display: flex;
              }

              label {
                color: ${colors.blue.medium};
                font-size: 12px;
                font-weight: 700;
                text-transform: uppercase;
                &:last-of-type {
                  margin: 0 10px;
                }
              }

              span.close-filter-param {
                color: ${colors.blue.medium};
                display: block;
                cursor: pointer;
                float: right;
                font-size: 12px;
                font-weight: 700;
                margin-top: 15px;
                text-transform: uppercase;
                &:hover {
                  color: ${colors.blue.dark};
                }
              }
            }

            label {
              margin-right: 10px;
              &.neighborhood {
                clear: both;
                float: left;
                width: 100% !important;
              }
              &:first-of-type {
                display: inline-block;
              }
            }

            input {
              margin-right: 10px;
              padding: 10px;
            }

            select {
              margin-right: 10px;
            }

            button {
              background: transparent;
              border: 1px solid ${colors.lightGray};
              border-radius: 500px;
              box-shadow: none;
              color: ${colors.text};
              clear: both;
              font-size: 15px;
              margin: 0 20px 0 0;
              padding: 7px 20px 10px;
              &:hover {
                background: ${colors.offWhite};
              }
              &.active {
                background: ${colors.blue.medium};
                color: white;
                border: 1px solid ${colors.blue.dark};
                &:hover {
                  background: ${colors.blue.dark};
                }
              }
            }

            span.mobile-param-title {
              display: none;
            }

            span.remove-all-filters {
              color: ${colors.blue.medium};
              cursor: pointer;
              display: block;
              font-size: 13px;
              letter-spacing: 1px;
              margin-left: auto;
              margin-right: 20px;
              overflow: auto;
              text-transform: uppercase;
              &:hover {
                color: ${colors.mediumDarkGray};
              }
              &.mobile {
                display: none;
              }
            }
          }

          @media ${mobileMedia} {
            .listings-filter-container {
              flex-wrap: wrap;

              div.active-filter-overlay {
                background: white;
              }

              span.remove-all-filters {
                display: none;
                &.mobile {
                  display: block;
                  margin-right: 0;
                }
              }

              span.mobile-param-title {
                color: ${colors.mediumDarkGray};
                display: block;
                font-size: 11px;
                font-weight: 700;
                margin-bottom: 10px;
                text-transform: uppercase;
              }

              div.filter-param-container {
                width: 100vw;

                button {
                  display: none;
                }
              }

              div.option-container {
                border: none;
                border-top: 1px solid ${colors.lightGray};
                height: auto;
                margin-right: 0;
                margin-top: 10px;
                padding: 15px 10px 15px;
                position: relative;
                top: 0;

                span.close-filter-param {
                  display: none;
                }
              }

              label {
                font-size: 13px;
              }

              button.close-mobile-filters {
                background: ${colors.blue.medium};
                border: 1px solid ${colors.blue.dark};
                bottom: 10px;
                color: white;
                left: 10px;
                margin: 0 auto;
                position: fixed;
                width: calc(100vw - 20px);
                z-index: 3;
                &:hover {
                  background: ${colors.blue.dark};
                }
              }
            }
          }
        `}</style>
      </div>
    )
  }
}
