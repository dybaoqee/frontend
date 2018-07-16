import React from 'react'
import NumberFormat from 'react-number-format'
import Container, {SuggestedPrice} from './styles'

export default class ListingCard extends React.Component {
  render() {
    const {handleOpenPopup, user} = this.props
    const {
      price,
      rooms,
      bathrooms,
      garageSpots,
      floor,
      area,
      suggestedPrice
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

        {user.admin &&
          suggestedPrice && (
            <SuggestedPrice>
              <p>Preço sugerido:</p>
              <NumberFormat
                value={suggestedPrice}
                displayType={'text'}
                thousandSeparator={'.'}
                prefix={'R$'}
                decimalSeparator={','}
              />
            </SuggestedPrice>
          )}

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
            <span>{garageSpots || 0}</span>
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
          <p className="phone">
            Se preferir, entre em contato por ligação ou Whatsapp:
            <a href="tel:+55 21 99609-5399"> (21) 9 9609-5399 </a>
          </p>
        </div>
      </Container>
    )
  }
}
