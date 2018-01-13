import { Component } from 'react'
import Router from 'next/router'
import Select from 'react-select'
import reactSelectStyles from 'react-select/dist/react-select.min.css'

import * as colors from '../../constants/colors'
import { mobileMedia } from '../../constants/media'
import { imageUrl } from '../../utils/image_url'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch'

export default class HomeSearch extends Component {
  state = {}

  updateSelectedOption = (selectedOption, stateKey) => {
    const value = (selectedOption && selectedOption.value) ? selectedOption.value : null
    const state = this.state
    state[stateKey] = value
    this.setState(state)
  }

  handleRoomChange = (selectedOption) => {
    this.updateSelectedOption(selectedOption, 'quartos')
  }

  handleMinPriceChange = (selectedOption) => {
    this.updateSelectedOption(selectedOption, 'preco_minimo')
  }

  handleMaxPriceChange = (selectedOption) => {
    this.updateSelectedOption(selectedOption, 'preco_maximo')
  }

  handleNeighborhoodChange = (selectedOption) => {
    this.updateSelectedOption(selectedOption, 'bairros')
  }

  joinParam = (param) => {
    if (param !== null && typeof param === 'object') {
      return Object.keys(param).map(function(key) {
        return key
      }).join('|')
    } else {
      return param
    }
  }

  treatParams = () => {
    const { state, joinParam } = this

    return Object.keys(state).map(function(key) {
      if (key === 'areFiltersVisible') return null
      if (state[key] === undefined) return null

      const flattenedValue = joinParam(state[key])
      return (flattenedValue === '') ? null : `${key}=${flattenedValue}`
    }).filter(n => n).join('&')
  }

  handleClick = () => {
    const params = this.treatParams()

    if (params) {
      Router.push(`/listings/index?${params}`, `/imoveis?${params}`)
    }
  }

  render() {
    const { neighborhoods } = this.props
    const { quartos, preco_minimo, preco_maximo, bairros } = this.state

    const roomNumberOptions = [
      { value: '1', label: '1 quarto' },
      { value: '2', label: '2 quartos' },
      { value: '3', label: '3 quartos' },
      { value: '4', label: '4 quartos' }
    ]
    const minPriceOptions = [
      { value: 750000, label: 'R$750.000' },
      { value: 1000000, label: 'R$1.000.000' },
      { value: 2000000, label: 'R$2.000.000' },
      { value: 3000000, label: 'R$3.000.000' },
      { value: 5000000, label: 'R$5.000.000' }
    ]
    const maxPriceOptions = [
      { value: 1000000, label: 'R$1.000.000' },
      { value: 2000000, label: 'R$2.000.000' },
      { value: 3000000, label: 'R$3.000.000' },
      { value: 5000000, label: 'R$5.000.000' },
      { value: 10000000, label: 'R$10.000.000' }
    ]
    const neighborhoodOptions = neighborhoods.map(function(neighborhood) {
      return { value: neighborhood, label: neighborhood }
    })

    return <div className="container">
      <h1>Encontre o Imóvel Perfeito para Você</h1>

      <div className="search">
        <div>
          <div className="city">
            Rio de Janeiro
          </div>
          <div className="neighborhoods">
            <Select
              name="form-field-name"
              placeholder="Bairro"
              value={bairros}
              onChange={this.handleNeighborhoodChange}
              options={neighborhoodOptions} />
          </div>
          <div className="magnifier-container" onClick={this.handleClick}>
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>
        <div>
          <div className="rooms">
            <Select
              name="form-field-name"
              placeholder="Quartos"
              value={quartos}
              onChange={this.handleRoomChange}
              options={roomNumberOptions} />
          </div>
          <div className="min-price">
            <Select
              name="form-field-name"
              placeholder="Preço Mínimo"
              value={preco_minimo}
              onChange={this.handleMinPriceChange}
              options={minPriceOptions} />
          </div>
          <div className="max-price">
            <Select
              name="form-field-name"
              placeholder="Preço Máximo"
              value={preco_maximo}
              onChange={this.handleMaxPriceChange}
              options={maxPriceOptions} />
          </div>
          <div className="mobile-magnifier-container" onClick={this.handleClick}>
            Ver Imóveis →
          </div>
        </div>
      </div>

      <style global jsx>{`
        .search .Select-control {
          background: transparent;
          border: none;
          height: 45px;

          .Select-placeholder {
            align-items: center;
            display: flex;
          }
          .Select-value {
            align-items: center;
            display: flex;
          }
        }
      `}</style>
      <style jsx>{`
        div.container {
          background-image: url(${imageUrl('g41uu9olkmikizvyioqn.jpg')});
          background-size: cover;
          height: 400px;

          h1 {
            color: white;
            font-weight: 300;
            margin-top: 80px;
            text-align: center;
            text-shadow: 0px 1px rgba(0, 0, 0, 0.8), 0px -1px rgba(0, 0, 0, 0.4)
          }
        }

        div.search {
          background: white;
          border: 1px solid ${colors.lightestGray};
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          margin: 60px auto 0;
          width: 600px;
          > div {
            align-items: center;
            display: flex;
            height: 44px;
            &:first-of-type {
              border-bottom: 1px solid ${colors.lightestGray};
            }
            > div {
              border-right: 1px solid ${colors.lightestGray};
              height: 44px;
              padding: 0;
              &:last-child {
                border-right: none;
              }
            }
          }
        }

        div.city {
          align-items: center;
          background: ${colors.offWhite};
          border-top-left-radius: 10px;
          display: flex;
          color: ${colors.mediumGray};
          padding-left: 10px !important;
          width: calc(50% - 30px);
        }

        div.neighborhoods {
          width: calc(50% - 20px);
        }

        div.rooms {
          width: 30%;
        }

        div.min-price {
          width: 40%;
        }

        div.max-price {
          width: 40%;
        }

        div.magnifier-container {
          align-items: center;
          background: ${colors.blue};
          border-top-right-radius: 9px;
          cursor: pointer;
          display: flex;
          height: 44px;
          justify-content: center;
          width: 60px;
          &:hover {
            background: ${colors.darkenedBlue}
          }
          :global(svg) {
            height: 20px;
            width: 40px;
          }
          :global(svg path) {
            fill: white;
          }
        }

        div.mobile-magnifier-container {
          display: none;
        }

        button {
          border-radius: 0;
          border-top-right-radius: 9px;
          height: 44px;
          padding: 3px 10px 5px;
          width: 60px;
          svg {
            width: 30px;
          }
        }

        @media ${mobileMedia} {
          div.container {
            height: auto;
            padding-bottom: 40px;
            width: 100vw;
          }

          div.search {
            background: transparent;
            border: none;
            width: calc(100vw - 40px);
            > div {
              flex-direction: column;
              height: auto;
              &:first-of-type {
                border-bottom: none;
              }
              > div {
                border-right: none;
                background: white;
                margin-bottom: 20px;
              }
            }
          }

          div.search > div > div.city {
            background: ${colors.offWhite};
            border-radius: 8px;
            width: calc(100% - 30px);
          }

          div.neighborhoods,
          div.rooms,
          div.min-price,
          div.max-price,
          div.mobile-magnifier-container {
            border-radius: 8px;
            width: calc(100% - 20px);
          }

          div.magnifier-container {
            display: none;
          }

          div.search > div > div.mobile-magnifier-container {
            align-items: center;
            background: ${colors.blue};
            color: white;
            cursor: pointer;
            display: flex;
            justify-content: center;
            &:hover {
              background: ${colors.darkenedBlue};
            }
          }
        }
      `}</style>
    </div>
  }
}
