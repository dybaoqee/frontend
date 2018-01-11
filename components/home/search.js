import { Component } from 'react'

import * as colors from '../../constants/colors'
import Icon from '../../components/icon'
import { imageUrl } from '../../utils/image_url'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch'

export default class HomeSearch extends Component {
  render() {
    return <div className="container">
      <h1>Nova Home Page - Aguarde</h1>

      <div className="search">
        <div>
          <div className="city">
            Rio de Janeiro
          </div>
          <div className="neighborhoods">
            Bairros
          </div>
          <button>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <div>
          <div className="rooms">
            Quartos
          </div>
          <div className="min-price">
            Preço Mínimo
          </div>
          <div className="max-price">
            Preço Máximo
          </div>
        </div>
      </div>

      <style jsx>{`
        div.container {
          background-image: url(${imageUrl('g41uu9olkmikizvyioqn.jpg')});
          background-size: cover;
          height: 400px;

          h1 {
            color: white;
            text-align: center;
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
              padding: 10px;
              &:last-child {
                border-right: none;
              }
            }
          }
        }

        div.city {
          background: ${colors.offWhite};
          border-top-left-radius: 10px;
          width: calc(50% - 30px);
        }

        div.neighborhoods {
          width: calc(50% - 30px);
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

        button {
          border-radius: 0;
          border-top-right-radius: 9px;
          height: 44px;
          width: 60px;
        }

      `}</style>
    </div>
  }
}
