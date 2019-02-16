import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Item from './Item'
import {
  Container,
  Separator
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
          {bedrooms && <Item title="QUARTOS" value={bedrooms} />}
          {suites && <Item title="SUÍTES" value={suites} />}
          {bathrooms && <Item title="BANHEIROS" value={bathrooms} />}
          {garageSpots && <Item title="VAGAS" value={garageSpots} />}
          {area && <Item title="ÁREA" value={`${area}m²`} />}
          {floor && <Item title="ANDAR" value={`${floor}º`} />}
        </Container>
        <Separator />
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
