import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import SimpleForm from "../../components/listings/show/form";

import {
  fetchListingIfNeeded,
  switchPopup,
  postForm
} from '../../modules/listings/show'

class Listings extends Component {
  constructor() {
    super()
    this.togglePopup = this.togglePopup.bind(this)
  }

  componentDidMount() {
    const { id, fetchListingIfNeeded } = this.props
    fetchListingIfNeeded(id)
  }

  togglePopup() {
    const {switchPopup} = this.props
    switchPopup()
  }

  render() {
    const { isShowingPopup, postForm } = this.props
    const { listing } = this.props.listing

    if (!listing) {
      return <div>Fetching listing</div>
    }

    return <div className="listing">
      <header>
        <div>
          <div>
            <h6>Apartamento</h6>
            <p>{listing.address.street}, {listing.address.street_number}</p>
            <p>
              {listing.address.neighborhood}, {listing.address.city}
            </p>
          </div>
          <div>
            R${listing.price}
          </div>
        </div>

        <button className="green" onClick={this.togglePopup}>
          Marcar Visita
        </button>
      </header>

      <div className="main-content">
        <img src="http://www.judicearaujo.com.br/imoveis/010420141931256rjkwb.jpg" alt="Map"/>

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
                <td>xxxx</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <img src="http://www.mapaplan.com/seating-plan/wembley-stadium-chart-london/high-resolution/wembley-stadium-london-seating-plan-09-google-map-high-resolution.jpg" alt="Map"/>

      <footer>
        <Link to="/">‹ Ver Todos os Imóveis</Link>
        <button className="green">
          Marcar Visita
        </button>
      </footer>

      {isShowingPopup &&
        <div className="popup">
          <div>
            <button className="close" onClick={this.togglePopup}>×</button>
            <h1>Marcar Visita</h1>
            <p>Teremos um grande prazer em mostrar este apartamento para você. Por favor insira abaixo seu nome, email e telefone com ddd e entraremos em contato em minutos.</p>
            <SimpleForm onSubmit={postForm} />
          </div>
        </div>
      }

    </div>
  }
}

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.match.params.id,
  isFetching: state.listing.isFetching,
  isShowingPopup: state.listing.isShowingPopup,
  listing: state.listing
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchListingIfNeeded,
  switchPopup,
  postForm
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Listings)
