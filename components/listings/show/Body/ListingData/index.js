import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {getListingValues} from 'lib/listings'
import Item from './Item'
import {
  Container,
  Separator
} from './styles'

class ListingData extends PureComponent {
  render() {
    const {listing} = this.props
    const rooms = getListingValues(listing, 'rooms')
    const suites = getListingValues(listing, 'suites')
    const bathrooms = getListingValues(listing, 'bathrooms')
    const garageSpots = getListingValues(listing, 'garageSpots')
    const floors = getListingValues(listing, 'floor').map(
      (val) => !isNaN(val) ? `${val}°` : val
    )
    const area = getListingValues(listing, 'area')
    return (
      <>
        <Container>
          {rooms && <Item.Range title="QUARTOS" values={rooms} />}
          {suites && <Item.Range title="SUÍTES" values={suites} />}
          {bathrooms && <Item.Range title="BANHEIROS" values={bathrooms} />}
          {garageSpots && <Item.Range title="VAGAS" values={garageSpots} />}
          {area && <Item.Range title="ÁREA" values={area} suffix="m²" />}
          {floors && <Item.List title="ANDAR" values={floors} />}
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
