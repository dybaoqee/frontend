import uniq from 'lodash/uniq'
import React from 'react'
import PropTypes from 'prop-types'
import theme from 'config/theme'
import NumberFormat from 'react-number-format'
import View from '@emcasa/ui-dom/components/View'
import Row from '@emcasa/ui-dom/components/Row'
import Text from '@emcasa/ui-dom/components/Text'
import Button from '@emcasa/ui-dom/components/Button'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faCube from '@fortawesome/fontawesome-free-solid/faCube'
import faMap from '@fortawesome/fontawesome-free-solid/faMap'
import faStreetView from '@fortawesome/fontawesome-free-solid/faStreetView'
import {intToCurrency, formatRange} from 'utils/text-utils'
import {
  getListingValues,
  getListingValueRange
} from 'lib/listings'

import {
  Container,
  Title,
  ExtraTitleSEO,
  ButtonsContainer,
  OpenMatterportButton,
  PriceItem,
  PriceItemSpacer,
  ValuesContainer,
  ValuesItem
 } from './styles'

class ListingInfo extends React.Component {
  render() {
    const {
      title,
      listing,
      openMatterportPopup,
      openMapPopup,
      openStreetViewPopup
    } = this.props
    const {
      price,
      matterportCode,
      type
    } = listing
    const price_per_square_meter = Math.floor(price / 1)
    const rooms = getListingValueRange(listing, 'rooms')
    const bathrooms = getListingValueRange(listing, 'bathrooms')
    const garageSpots = getListingValueRange(listing, 'garageSpots')
    const area = getListingValueRange(listing, 'area')
    const suites = getListingValueRange(listing, 'suites')
    const maintenanceFee = getListingValueRange(listing, 'maintenanceFee')
    const propertyTax = getListingValueRange(listing, 'propertyTax')
    const floor = uniq(getListingValues(listing, 'floor'))
      .filter(Boolean)
      .map((num) => isNaN(num) ? num : `${num}°`)
      .sort()
    const hasValues = (range = []) => range.find((val) => val && val > 0)
    return (
      <Container>
        <Title fontWeight="bold"><ExtraTitleSEO>{type} na </ExtraTitleSEO>{title}</Title>
        <ValuesContainer>
          {hasValues(rooms) ? (
            <ValuesItem flexDirection="column">
              <Text fontSize={2}>{formatRange(rooms)}</Text>
              <Text fontSize={[1, null, null, 2]}>dorm.</Text>
            </ValuesItem>
          ) : null}
          {hasValues(suites) ? (
            <ValuesItem flexDirection="column">
              <Text fontSize={2}>{formatRange(suites)}</Text>
              <Text fontSize={[1, null, null, 2]}>suítes</Text>
            </ValuesItem>
          ) : null}
          {hasValues(bathrooms) ? (
            <ValuesItem flexDirection="column">
              <Text fontSize={2}>{formatRange(bathrooms)}</Text>
              <Text fontSize={[1, null, null, 2]}>banh.</Text>
            </ValuesItem>
          ) : null}
          {hasValues(garageSpots) ? (
            <ValuesItem flexDirection="column">
              <Text fontSize={2}>{formatRange(garageSpots)}</Text>
              <Text fontSize={[1, null, null, 2]}>vagas</Text>
            </ValuesItem>
          ) : null}
          {hasValues(area) ? (
            <ValuesItem flexDirection="column">
              <Text fontSize={2}>{formatRange(area)}</Text>
              <Text fontSize={[1, null, null, 2]}>área/m²</Text>
            </ValuesItem>
          ) : null}
          {hasValues(floor) ? (
            <ValuesItem flexDirection="column">
              <Text fontSize={2}>{floor.join(', ')}</Text>
              <Text fontSize={[1, null, null, 2]}>andar</Text>
            </ValuesItem>
          ) : null}
        </ValuesContainer>
        <ButtonsContainer>
          {matterportCode && <OpenMatterportButton onClick={openMatterportPopup}><FontAwesomeIcon icon={faCube} />Ver por dentro</OpenMatterportButton>}
          <Button onClick={openMapPopup}><FontAwesomeIcon icon={faMap} color={theme.colors.blue} />Mapa</Button>
          <Button onClick={openStreetViewPopup}><FontAwesomeIcon icon={faStreetView} color={theme.colors.blue} />Rua</Button>
        </ButtonsContainer>
        <Row flexDirection="column" mt={5}>
          {(maintenanceFee && maintenanceFee > 0) &&
            <PriceItem mb={2}>
              <Text inline>Condomínio</Text>
              <PriceItemSpacer />
              <NumberFormat
                value={maintenanceFee || 0}
                displayType={'text'}
                thousandSeparator={'.'}
                prefix={'R$'}
                decimalSeparator={','}
              />
            </PriceItem>
          }
          {(propertyTax && propertyTax > 0) &&
            <PriceItem mb={2}>
              <Text inline>IPTU/ano</Text>
              <PriceItemSpacer />
              <NumberFormat
                value={propertyTax || 0}
                displayType={'text'}
                thousandSeparator={'.'}
                prefix={'R$'}
                decimalSeparator={','}
              />
            </PriceItem>
          }
          {(price && price > 0) &&
            <PriceItem>
              <Text inline>Preço/m²</Text>
              <PriceItemSpacer />
              <NumberFormat
                value={price_per_square_meter || 0}
                displayType={'text'}
                thousandSeparator={'.'}
                prefix={'R$'}
                decimalSeparator={','}
              />
            </PriceItem>
          }
        </Row>
      </Container>
    )
  }
}

ListingInfo.propTypes = {
  listing: PropTypes.object,
  title: PropTypes.string,
  openMatterportPopup: PropTypes.func,
  openMapPopup: PropTypes.func,
  openStreetViewPopup: PropTypes.func
}

export default ListingInfo
