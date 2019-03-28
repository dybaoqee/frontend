import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Item from './Item'
import {
  Container
} from './styles'

class ListingData extends PureComponent {
  render() {
    const {
      bedrooms,
      suites,
      bathrooms,
      garageSpots,
      area,
      floor
    } = this.props
    return (
      <>
        <Container>
          {bedrooms && <Item title="Quartos" value={bedrooms} />}
          {suites && <Item title="Suítes" value={suites} />}
          {bathrooms && <Item title="Banheiros" value={bathrooms} />}
          {garageSpots && <Item title="Vagas" value={garageSpots} />}
          {area && <Item title="Área" value={`${area}m²`} />}
          {floor && <Item title="Andar" value={`${floor}º`} />}
        </Container>
      </>
    )
  }
}

ListingData.propTypes = {
  bedrooms: PropTypes.number,
  suites: PropTypes.number,
  bathrooms: PropTypes.number,
  garageSpots: PropTypes.number,
  area: PropTypes.number,
  floor: PropTypes.string
}

export default ListingData
