import React from 'react';
import { Link } from 'react-router-dom'

class Listing extends React.Component {
  render() {
    const { listing, i } = this.props
    const bgImgUrl = process.env.REACT_APP_S3_BASE_URL + 'listings/small/' +listing.photo
    const divStyle = {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.0) 50%, rgba(0, 0, 0, 0.7) 80%), url(${bgImgUrl})`
    }

    return (
      <div className="listings-entry" key={i}>
        <Link to={`listings/${listing.id}`}>
          <div className="image-container" style={divStyle}>
            <div>
              <span>R${listing.price}</span>
              <span className="address">
                {listing.address.street}
              </span>
              <span className="neighborhood">
                {listing.address.neighborhood}, {listing.address.city}
              </span>
            </div>
          </div>

          <div className="text-container">
            <div className="description">
              {listing.description}
            </div>

            <table>
              <tbody>
                <tr>
                  <td>Quartos</td>
                  <td>{listing.rooms}</td>
                  <td>Vagas Garagem</td>
                  <td>{listing.garage_spots}</td>
                </tr>
                <tr>
                  <td>Banheiros</td>
                  <td>{listing.bathrooms}</td>
                  <td>Andar</td>
                  <td>{listing.floor}</td>
                </tr>
                <tr>
                  <td>Área</td>
                  <td>{listing.area}</td>
                  <td>R$/m²</td>
                  <td>{Math.floor(listing.price / listing.area)}</td>
                </tr>
              </tbody>
            </table>

            <Link to={`listings/${listing.id}`} className="btn">

              Ver Detalhes
            </Link>
          </div>
        </Link>
      </div>
    )
  }
}

export default Listing
