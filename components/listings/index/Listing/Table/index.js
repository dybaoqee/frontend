import NumberFormat from 'react-number-format'
import Container, {Info} from './styles'

export default ({
  listing: {price, area, rooms, garage_spots, bathrooms, floor}
}) => {
  const price_per_square_meter = price && area ? Math.floor(price / area) : 0

  return (
    <Container className="listing-table">
      <Info>
        <span>Quartos</span>
        <span>{rooms}</span>
      </Info>
      <Info>
        <span>N° Vagas</span>
        <span>{garage_spots || 0}</span>
      </Info>
      <Info>
        <span>Área</span>
        <span>{area} m²</span>
      </Info>
      <Info>
        <span>Banheiros</span>
        <span>{bathrooms}</span>
      </Info>
      <Info>
        <span>Andar</span>
        <span>{floor}</span>
      </Info>
      <Info>
        <span>Preço/m²</span>
        <span>
          <NumberFormat
            value={price_per_square_meter}
            displayType={'text'}
            thousandSeparator={'.'}
            prefix={'R$'}
            decimalSeparator={','}
          />
        </span>
      </Info>
    </Container>
  )
}
