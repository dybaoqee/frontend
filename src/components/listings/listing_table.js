import React from 'react'
import NumberFormat from 'react-number-format'

class ListingTable extends React.Component {
  render() {
    const { listing } = this.props

    const price_per_square_meter = Math.floor(listing.price / listing.area)


    return (
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
            <td>Preço/m²</td>
            <td>
              <NumberFormat value={price_per_square_meter} displayType={'text'} thousandSeparator={'.'} prefix={'R$'} decimalSeparator={','} />
            </td>

          </tr>
        </tbody>
      </table>
    )
  }
}

export default ListingTable

