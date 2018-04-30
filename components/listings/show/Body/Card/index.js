import React from 'react'
import NumberFormat from 'react-number-format'
import Container from './styles'

export default class ListingCard extends React.Component {
  render() {
    const {handleOpenPopup} = this.props

    const {
      price,
      rooms,
      bathrooms,
      garage_spots,
      floor,
      area
    } = this.props.listing

    const price_per_square_meter = Math.floor(price / area)

    return (
      <Container>
        <span className="price">
          {price && price > 0 ? (
            <NumberFormat
              value={price}
              displayType={'text'}
              thousandSeparator={'.'}
              prefix={'R$'}
              decimalSeparator={','}
            />
          ) : (
            'Preço a definir'
          )}
        </span>

        <div>
          <div>
            <span>Dormitórios</span>
            <span>{rooms}</span>
          </div>
          <div>
            <span>Banheiros</span>
            <span>{bathrooms}</span>
          </div>
          <div>
            <span>N° Vagas</span>
            <span>{garage_spots || 0}</span>
          </div>
          <div>
            <span>Andar</span>
            <span>{floor}</span>
          </div>
          <div>
            <span>Área</span>
            <span>{area}</span>
          </div>
          {price && price > 0 ? (
            <div>
              <span>Preço/m²</span>
              <NumberFormat
                value={price_per_square_meter || 0}
                displayType={'text'}
                thousandSeparator={'.'}
                prefix={'R$'}
                decimalSeparator={','}
              />
            </div>
          ) : (
            ''
          )}

          <button className="green" onClick={handleOpenPopup}>
            Marcar Visita
          </button>
        </div>
      </Container>
    )
  }
}
