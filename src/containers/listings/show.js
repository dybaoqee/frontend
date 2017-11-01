import React, { Component } from 'react'
import DocumentMeta from 'react-document-meta'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'

import SimpleForm from "../../components/listings/show/form"
import MapContainer from "../../components/map-container"

import {
  fetchListingIfNeeded,
  switchPopup,
  postForm,
  closeSuccessPostPopup
} from '../../modules/listings/show'

class Listings extends Component {
  componentDidMount() {
    const { id, fetchListingIfNeeded } = this.props
    fetchListingIfNeeded(id)
  }

  render() {

    const {
      isShowingPopup,
      postForm,
      switchPopup,
      isShowingPostSuccessPopup,
      closeSuccessPostPopup
    } = this.props

    const { listing } = this.props.listing

    const meta = {
      title: 'EmCasa',
      description: 'Teste descrição EmCasa',
      canonical: 'http://example.com/path/to/page',
      'og:title': 'OG Title do EmCasa',
      meta: {
        name: {
          keywords: 'react,meta,document,html,tags'
        }
      }
    }

    if (!listing) {
      return <div className="spinner"></div>
    }

    return (
      <DocumentMeta {...meta}>
        <div className="listing">
          <header>
            <div>
              <div>
                <h6>Apartamento</h6>
                <p>{listing.address.street}</p>
                <p>
                  {listing.address.neighborhood}, {listing.address.city}
                </p>
              </div>
              <div>
                R${listing.price}
              </div>
            </div>

            <button className="green" onClick={switchPopup}>
              Marcar Visita
            </button>
          </header>

          <div className="main-content">
            <img src={process.env.REACT_APP_S3_BASE_URL + 'listings/original/' + listing.photo} alt="Listing Main Pic"/>

            <div>
              <div>
                {listing.description}
              </div>
              <table>
                <tbody>
                  <tr>
                    <td>Quartos</td>
                    <td>{listing.rooms}</td>
                  </tr>
                  <tr>
                    <td>Vagas Garagem</td>
                    <td>{listing.garage_spots}</td>
                  </tr>
                  <tr>
                    <td>Banheiros</td>
                    <td>{listing.bathrooms}</td>
                  </tr>
                  <tr>
                    <td>Andar</td>
                    <td>{listing.floor}</td>
                  </tr>
                  <tr>
                    <td>Área</td>
                    <td>{listing.area}</td>
                  </tr>
                  <tr>
                    <td>R$/m²</td>
                    <td>{Math.floor(listing.price / listing.area)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <MediaQuery query="(max-width: 600px)">
            <MapContainer lat={listing.address.lat}
              lng={listing.address.lng}
              width='100vw'
              height='300px'/>
          </MediaQuery>

          <MediaQuery query="(min-width: 601px)">
            <MapContainer lat={listing.address.lat}
              lng={listing.address.lng}
              width='786.66667px'
              height='500px'/>
          </MediaQuery>

          <footer>
            <div>
              <Link to="/">‹ Ver Todos os Imóveis</Link>
              <a href="mailto:contato@emcasa.com">contato@emcasa.com</a>
            </div>
            <button className="green">
              Marcar Visita
            </button>
          </footer>

          {isShowingPopup &&
            <div className="popup">
              <div>
                <button className="close" onClick={switchPopup}>×</button>
                <h1>Marcar Visita</h1>
                <p>Insira seu nome, email e telefone com DDD e<br/>entraremos em contato em minutos.</p>
                <SimpleForm onSubmit={postForm} />
              </div>
            </div>
          }

          {isShowingPostSuccessPopup &&
            <div className="popup">
              <div>
                <button className="close" onClick={closeSuccessPostPopup}>×</button>
                <h1>Agente EmCasa Notificado</h1>
                <p>Entraremos em contato o mais rápido possível para agendarmos uma visita!</p>
                <button onClick={closeSuccessPostPopup}>Fechar</button>
              </div>
            </div>
          }
      </div>
      </DocumentMeta>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.match.params.id,
  isFetching: state.listing.isFetching,
  isShowingPopup: state.listing.isShowingPopup,
  isShowingPostSuccessPopup: state.listing.isShowingPostSuccessPopup,
  listing: state.listing
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchListingIfNeeded,
  switchPopup,
  postForm,
  closeSuccessPostPopup
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Listings)
