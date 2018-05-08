import NumberFormat from 'react-number-format'
import Container from './styles'

export default ({
  listing: {price, area, rooms, garage_spots, bathrooms, floor}
}) => {
  const price_per_square_meter = price && area ? Math.floor(price / area) : 0

  return (
    <Container>
      <table cellSpacing="0">
        <tbody>
          <tr>
            <td>Quartos</td>
            <td>{rooms}</td>
            <td>Vagas Garagem</td>
            <td>{garage_spots}</td>
          </tr>
          <tr>
            <td>Banheiros</td>
            <td>{bathrooms}</td>
            <td>Andar</td>
            <td>{floor}</td>
          </tr>
          <tr>
            <td>Área</td>
            <td>{area}</td>
            <td>Preço/m²</td>
            <td>
              <NumberFormat
                value={price_per_square_meter}
                displayType={'text'}
                thousandSeparator={'.'}
                prefix={'R$'}
                decimalSeparator={','}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </Container>
  )
}
