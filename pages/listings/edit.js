import {Component} from 'react'
import {Form, Text} from 'react-form'
import Link from 'next/link'
import Router from 'next/router'

import {redirectIfNotAuthenticated, getJwt, isAuthenticated} from 'lib/auth'
import {editListing, updateListing} from 'services/listing-api'

import Layout from 'components/views/shared/Shell'
import TextContainer from 'components/shared/TextContainer'
import AdminHeader from 'components/views/shared/AdminHeader'
import * as colors from 'constants/colors'

export default class ListingEdit extends Component {
  constructor(props) {
    super(props)
    const {address} = props.listing
    const {listing} = props

    this.state = {
      street: address.street,
      streetNumber: address.street_number,
      neighborhood: address.neighborhood,
      postalCode: address.postal_code,
      lat: address.lat,
      lng: address.lng,
      city: 'Rio de Janeiro',
      state: 'RJ',

      description: listing.description,
      price: listing.price,
      complement: listing.complement,
      type: listing.type,
      area: listing.area,
      floor: listing.floor,
      bathrooms: listing.bathrooms,
      garageSpots: listing.garage_spots,
      rooms: listing.rooms,
      matterportCode: listing.matterport_code,
      score: listing.score,
    }
  }

  static async getInitialProps(context) {
    if (redirectIfNotAuthenticated(context)) {
      return {}
    }

    const jwt = getJwt(context)
    const {id} = context.query

    const res = await editListing(id, jwt)

    if (res.data.errors) {
      this.setState({errors: res.data.errors})
      return {}
    }

    if (!res.data) {
      return res
    }

    return {
      id: id,
      jwt: jwt,
      listing: res.data.listing,
      isAuthenticated: isAuthenticated(context),
    }
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    const {jwt, id} = this.props

    const res = await updateListing(id, this.state, jwt)

    if (res.data.errors) {
      this.setState({errors: res.data.errors})
      return
    }

    if (!res.data) {
      return res
    }

    const listingId = res.data.listing.id
    Router.replace(
      `/listings/show?id=${listingId}`,
      `/imoveis/${listingId}`
    ).then(() => window.scrollTo(0, 0))
    return null
  }

  render() {
    const {id} = this.props
    const {
      errors,
      street,
      streetNumber,
      complement,
      city,
      state,
      postalCode,
      lat,
      lng,
      neighborhood,
      description,
      type,
      price,
      area,
      floor,
      rooms,
      bathrooms,
      matterportCode,
      score,
      garageSpots,
    } = this.state

    return (
      <Layout authenticated={isAuthenticated}>
        <TextContainer>
          <AdminHeader>
            <h1>Editar Imóvel</h1>
            <Link
              href={`/listings/images?listingId=${id}`}
              as={`/imoveis/${id}/imagens`}
            >
              <a>Gerenciar Imagens</a>
            </Link>
          </AdminHeader>

          <form onSubmit={this.handleSubmit}>
            <h4>Endereço</h4>

            <div className="input-control">
              <label htmlFor="street">Rua</label>
              <input
                type="text"
                name="street"
                placeholder="Rua"
                value={street}
                onChange={this.onChange}
              />
            </div>

            <div className="input-control">
              <label htmlFor="streetNumber">Número</label>
              <input
                type="text"
                name="streetNumber"
                placeholder="Número"
                value={streetNumber}
                onChange={this.onChange}
              />
            </div>

            <div className="input-control">
              <label htmlFor="complement">Complemento</label>
              <input
                type="text"
                name="complement"
                placeholder="Complemento"
                value={complement}
                onChange={this.onChange}
              />
            </div>

            <div className="input-control">
              <label htmlFor="neighborhood">Bairro</label>
              <input
                type="text"
                name="neighborhood"
                placeholder="Bairro"
                value={neighborhood}
                onChange={this.onChange}
              />
            </div>

            <div className="input-control">
              <label htmlFor="city">Cidade</label>
              <input
                type="text"
                name="city"
                placeholder="Cidade"
                value={city}
                onChange={this.onChange}
                readOnly
              />
            </div>

            <div className="input-control">
              <label htmlFor="state">Estado (Sigla)</label>
              <input
                type="text"
                name="state"
                placeholder="Estado"
                value={state}
                onChange={this.onChange}
                readOnly
              />
            </div>

            <div className="input-control">
              <label htmlFor="postalCode">CEP</label>
              <input
                type="text"
                name="postalCode"
                placeholder="CEP"
                value={postalCode}
                onChange={this.onChange}
              />
            </div>

            <div className="input-control">
              <label htmlFor="lat">Latitude</label>
              <input
                type="text"
                name="lat"
                placeholder="Latitude"
                value={lat}
                onChange={this.onChange}
              />
            </div>

            <div className="input-control">
              <label htmlFor="lng">Longitude</label>
              <input
                type="text"
                name="lng"
                placeholder="Longitude"
                value={lng}
                onChange={this.onChange}
              />
            </div>

            <h4>Detalhes do imóvel</h4>

            <div className="input-control">
              <label htmlFor="type">Tipo</label>
              <input
                type="text"
                name="type"
                placeholder="Apartamento / Casa / Cobertura etc"
                value={type}
                onChange={this.onChange}
              />
            </div>

            <div className="input-control">
              <label htmlFor="description">Descrição</label>
              <input
                type="text"
                name="description"
                placeholder="Descrição"
                value={description}
                onChange={this.onChange}
              />
            </div>

            <div className="input-control">
              <label htmlFor="price">Preço</label>
              <input
                type="text"
                name="price"
                placeholder="Preço"
                value={price}
                onChange={this.onChange}
              />
            </div>

            <div className="input-control">
              <label htmlFor="area">Área (em m²)</label>
              <input
                type="text"
                name="area"
                placeholder="Área"
                value={area}
                onChange={this.onChange}
              />
            </div>

            <div className="input-control">
              <label htmlFor="floor">Andar</label>
              <input
                type="text"
                name="floor"
                placeholder="Andar"
                value={floor}
                onChange={this.onChange}
              />
            </div>

            <div className="input-control">
              <label htmlFor="floor">Número de Quartos</label>
              <input
                type="text"
                name="rooms"
                placeholder="Número de Quartos"
                value={rooms}
                onChange={this.onChange}
              />
            </div>

            <div className="input-control">
              <label htmlFor="garageSpots">Número de Vagas de Garagem</label>
              <input
                type="text"
                name="garageSpots"
                placeholder="Número de Vagas de Garagem"
                value={garageSpots}
                onChange={this.onChange}
              />
            </div>

            <div className="input-control">
              <label htmlFor="bathrooms">Número de Banheiros</label>
              <input
                type="text"
                name="bathrooms"
                placeholder="Número de Banheiros"
                value={bathrooms}
                onChange={this.onChange}
              />
            </div>

            <div className="input-control">
              <label htmlFor="matterportCode">
                Código do Matterport (algo como 8FxqPg9yX8w)
              </label>
              <input
                type="text"
                name="matterportCode"
                placeholder="Código do Matterport"
                value={matterportCode}
                onChange={this.onChange}
              />
            </div>

            <div className="input-control">
              <label htmlFor="score">
                Farol (4 = verde, 3 = amarelo, 2 = vermelho, 1 = preto)
              </label>
              <input
                type="text"
                name="score"
                placeholder="Placar do Farol"
                value={score}
                onChange={this.onChange}
              />
            </div>

            {errors && (
              <div>
                <b>Verifique os erros:</b>

                {Object.keys(errors).map((key) =>
                  errors[key].map((error) => {
                    return (
                      <p>
                        {key}: {error}
                      </p>
                    )
                  })
                )}
              </div>
            )}

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
                &[readonly] {
                  color: #bbb;
                }
              }
            }
          }
        `}</style>
      </Layout>
    )
  }
}
