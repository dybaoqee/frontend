import { Component } from 'react'
import { Form, Text } from 'react-form'

import TextContainer from '../../components/text-container'
import Layout from '../../components/main-layout'
import * as colors from '../../constants/colors'

export default class ListingNew extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: {
        street: ''
      },
      name: '',
      showPopup: false,
      showPostSuccessPopup: false
    }
  }

  onSubmit = (e) => {
    e.preventDefault()

    const { id } = this.props.listing
    const { name, price, floor, rooms, matterportCode } = this.state

    return fetch(process.env.REACT_APP_API_URL + 'listings', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        listing: {
        },
        address: {
          street: street
        }
      })
    }).then(response => response.json())
      .then(response => {
        console.log('Response:', response)
      })
  }

  render() {
    const { address, description, price, area, floor, rooms, bathrooms, matterportCode, score, garageSpots } = this.state

    return (
      <Layout>
        <TextContainer>
          <h1>Adicionar Imóvel</h1>

          <form onSubmit={this.onSubmit}>
            <h4>Endereço</h4>

            <div className="input-control">
              <label for="address[street]">Rua</label>
              <input type="text" name="name" placeholder="Rua" value={address.street} onChange={this.onChange} />
            </div>

            <div className="input-control">
              <label for="address[street-number]">Número</label>
              <input type="text" name="address[street-number]" placeholder="Número" value={address.streetNumber} onChange={this.onChange} />
            </div>


            <div className="input-control">
              <label for="address[complement]">Complemento</label>
              <input type="text" name="address[complement]" placeholder="Complemento" value={address.complement} onChange={this.onChange} />
            </div>

            <div className="input-control">
              <label for="address[neighborhood]">Bairro</label>
              <input type="text" name="address[neighborhood]" placeholder="Bairro" value={address.complement} onChange={this.onChange} />
            </div>

            <div className="input-control">
              <label for="address[city]">Cidade</label>
              <input type="text" name="address[city]" placeholder="Cidade" value={address.city} onChange={this.onChange} />
            </div>

            <div className="input-control">
              <label for="address[state]">Estado (Sigla)</label>
              <input type="text" name="address[state]" placeholder="Estado" value={address.state} onChange={this.onChange} />
            </div>

            <div className="input-control">
              <label for="address[postal_code]">CEP</label>
              <input type="text" name="address[postal_code]" placeholder="CEP" value={address.postalCode} onChange={this.onChange} />
            </div>

            <div className="input-control">
              <label for="address[lat]">Latitude</label>
              <input type="text" name="address[lat]" placeholder="Latitude" value={address.lat} onChange={this.onChange} />
            </div>

            <div className="input-control">
              <label for="address[lng]">Longitude</label>
              <input type="text" name="address[lng]" placeholder="Longitude" value={address.lng} onChange={this.onChange} />
            </div>

            <h4>Detalhes do imóvel</h4>

            <div className="input-control">
              <label for="address[description]">Descrição</label>
              <input type="text" name="address[description]" placeholder="Descrição" value={description} onChange={this.onChange} />
            </div>

            <div className="input-control">
              <label for="address[price]">Preço</label>
              <input type="text" name="address[price]" placeholder="Preço" value={price} onChange={this.onChange} />
            </div>

            <div className="input-control">
              <label for="address[area]">Área (em m²)</label>
              <input type="text" name="address[area]" placeholder="Área" value={area} onChange={this.onChange} />
            </div>

            <div className="input-control">
              <label for="address[floor]">Andar</label>
              <input type="text" name="address[floor]" placeholder="Andar" value={floor} onChange={this.onChange} />
            </div>

            <div className="input-control">
              <label for="address[floor]">Número de Quartos</label>
              <input type="text" name="address[rooms]" placeholder="Número de Quartos" value={rooms} onChange={this.onChange} />
            </div>

            <div className="input-control">
              <label for="address[garageSpots]">Número de Vagas de Garagem</label>
              <input type="text" name="address[garageSpotS]" placeholder="Número de Vagas de Garagem" value={garageSpots} onChange={this.onChange} />
            </div>

            <div className="input-control">
              <label for="address[bathrooms]">Número de Banheiros</label>
              <input type="text" name="address[bathrooms]" placeholder="Número de Banheiros" value={bathrooms} onChange={this.onChange} />
            </div>

            <div className="input-control">
              <label for="address[matterportCode]">Código do Matterport (algo como 8FxqPg9yX8w)</label>
              <input type="text" name="address[matterportCode]" placeholder="Código do Matterport" value={matterportCode} onChange={this.onChange} />
            </div>

            <div className="input-control">
              <label for="address[score]">Farol (4 = verde, 3 = amarelo, 2 = vermelho, 1 = preto)</label>
              <input type="text" name="address[score]" placeholder="Placar do Farol" value={score} onChange={this.onChange} />
            </div>

            <button type="submit">Enviar</button>
          </form>

        </TextContainer>

        <style jsx>{`
          form {
            .input-control {
              margin-bottom: 20px;
              label {
                float: left;
                margin: 0 0 10px 0;
              }
              input {
                border: 1px solid ${colors.lightGray};
                border-radius: 6px;
                font-size: 16px;
                padding: 10px;
                width: calc(100% - 22px);
              }
            }
          }
        `}</style>
      </Layout>
    )
  }
}
