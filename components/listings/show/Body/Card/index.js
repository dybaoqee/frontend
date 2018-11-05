import React from 'react'
import NumberFormat from 'react-number-format'
import NoSSR from 'react-no-ssr'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faWhatsApp from '@fortawesome/fontawesome-free-brands/faWhatsapp'
import faPhone from '@fortawesome/fontawesome-pro-light/faPhone'
import Container, {SuggestedPrice} from './styles'

const Space = () => ' '

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

    const currencyStyle = {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }

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
              <span>
                {suggestedPrice.toLocaleString('pt-BR', currencyStyle)}
              </span>
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

          <button className="btn green" onClick={handleOpenPopup}>
            Marcar Visita
          </button>
          <p className="phone">
            Se preferir, entre em contato por<br />
            <a href="https://wa.me/5521994771868">
              <Space />
              <NoSSR>
                <FontAwesomeIcon icon={faWhatsApp} />
              </NoSSR>
              <Space />
              WhatsApp
            </a>
            <Space />
            ou
            <a href="tel:+552131956541">
              <Space />
              <NoSSR>
                <FontAwesomeIcon icon={faPhone} />
              </NoSSR>
              <Space />
              (21) 3195-6541
            </a>
          </p>
        </div>
      </Container>
    )
  }
}
