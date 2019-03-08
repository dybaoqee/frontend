import styled from 'styled-components'
import {themeGet} from 'styled-system'
import Filters from '@emcasa/ui-dom/components/Filters'
import {
  TypesFilter,
  PriceFilter,
  AreaFilter,
  RoomsFilter,
  GarageSpotsFilter
} from '@emcasa/ui-dom/components/Filters/ListingFilters'
import {MAX_HEADER_HEIGHT} from 'components/shared/Shell/Header/styles'

const ListingFilter = styled(function ListingFilter(props) {
  return (
    <Filters {...props}>
      <TypesFilter />
      <PriceFilter />
      <AreaFilter />
      <RoomsFilter />
      <GarageSpotsFilter />
    </Filters>
  )
})`
  position: sticky !important;
  width: auto !important;
  top: ${MAX_HEADER_HEIGHT}px;
  padding-left: ${themeGet('space.4')}px;
  padding-right: 50px;
  background-color: white;
`

ListingFilter.defaultProps = {
  initialValues: {
    price: PriceFilter.initialValue,
    area: AreaFilter.initialValue
  }
}

export default ListingFilter
