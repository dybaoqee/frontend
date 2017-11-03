import React from 'react'
import NumberFormat from 'react-number-format'
import { Link } from 'react-router-dom'

import ListingTable from '../listing_table'

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
              <span><NumberFormat value={listing.price} displayType={'text'} thousandSeparator={'.'} prefix={'R$'} decimalSeparator={','} /></span>
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

            <ListingTable listing={listing}/>

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
