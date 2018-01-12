import { Component } from 'react'
import Select from 'react-select'
import reactSelectStyles from 'react-select/dist/react-select.min.css'

import * as colors from '../../constants/colors'
import { imageUrl } from '../../utils/image_url'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch'

export default class HomeSearch extends Component {
  state = {
    selectedOption: '',
  }

  handleChange = (selectedOption) => {
    console.log('selectedOption', selectedOption);
    this.setState({ selectedOption });
    console.log(`Selected: ${selectedOption.label}`);
  }

  handleClick = () => {
    console.log('Clicou');
  }

  render() {
    const { selectedOption } = this.state
  	const value = selectedOption && selectedOption.value
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

    return <div className="container">
      <h1>Encontre o Imóvel Perfeito para Você</h1>

      <div className="search">
        <div>
          <div className="city">
            Rio de Janeiro
          </div>
          <div className="neighborhoods">
            Bairros
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
              value={value}
              onChange={this.handleChange}
              options={roomNumberOptions}
            />
          </div>
          <div className="min-price">
            Preço Mínimo
          </div>
          <div className="max-price">
            Preço Máximo
          </div>
        </div>
      </div>

      <style global jsx>{reactSelectStyles}</style>
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
          background: ${colors.offWhite};
          border-top-left-radius: 10px;
          color: ${colors.mediumGray};
          width: calc(50% - 20px);
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
          width: 40px;
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

      `}</style>
    </div>
  }
}
