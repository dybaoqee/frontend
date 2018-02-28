import {Component} from 'react'
import {Form, Text} from 'react-form'
import Router from 'next/router'

import {redirectIfNotAuthenticated, getJwt, isAuthenticated} from 'lib/auth'
import {createListing} from 'services/listing-api'
import TextContainer from 'components/shared/TextContainer'
import Layout from 'components/shared/Shell'
import * as colors from 'constants/colors'

import FirstStep from 'components/listings/new/steps/AddressAutoComplete'
import SecondStep from 'components/listings/new/steps/AddressInfo'
import ThirdStep from 'components/listings/new/steps/PropertyInfo'
import FourthStep from 'components/listings/new/steps/PropertyGallery'
import FifthStep from 'components/listings/new/steps/PropertyGalleryEdit'

import EmCasaButton from 'components/shared/Common/Buttons'

export default class ListingNew extends Component {
  constructor(props) {
    super(props)

    this.state = {
      page: 0,
      loading: false,
      finished: false,
      city: 'Rio de Janeiro',
      state: 'RJ'
    }

    this.steps = [
      <FirstStep />,
      <SecondStep />,
      <ThirdStep />,
      <FourthStep />,
      <FifthStep />
    ]

    this.nextPage = this.nextPage.bind(this)
    // this.submit = this.submit.bind(this)
  }

  nextPage() {
    const {page} = this.state

    if (page === 4) {
      console.log('FINISHED')
    } else {
      this.setState({
        page: page + 1
      })
    }
  }

  getStepContent(page) {
    const Current = this.steps[page]
    return React.cloneElement(Current, {...this.props})
  }

  renderContent() {
    const {page, finished} = this.state

    if (finished) {
      return (
        <div>
          <p>The form was submitted succesfully. Thank you!</p>
        </div>
      )
    }

    return (
      <div>
        <div>{this.getStepContent(page)}</div>
      </div>
    )
  }

  static async getInitialProps(ctx) {
    if (redirectIfNotAuthenticated(ctx)) {
      return {}
    }
    this.teste = undefined

    const jwt = getJwt(ctx)

    return {
      jwt: jwt,
      authenticated: isAuthenticated(ctx)
    }
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    const {jwt} = this.props

    const res = await createListing(this.state, jwt)

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
    const {authenticated} = this.props
    const {page, loading} = this.state
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
      garageSpots
    } = this.state

    return (
      <Layout authenticated={authenticated}>
        <TextContainer>
          <h1>Adicionar novo Imóvel</h1>
          {this.renderContent()}
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <EmCasaButton disabled>Anterior</EmCasaButton>
            <EmCasaButton light disabled>
              Próximo
            </EmCasaButton>
          </div>

          {/* <form onSubmit={this.handleSubmit}>
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
          </form> */}
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
