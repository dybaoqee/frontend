import React from 'react'
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format'
import Row from '@emcasa/ui-dom/components/Row'
import Text from '@emcasa/ui-dom/components/Text'
import Button from '@emcasa/ui-dom/components/Button'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faCube from '@fortawesome/fontawesome-free-solid/faCube'
import faMap from '@fortawesome/fontawesome-free-solid/faMap'
import faStreetView from '@fortawesome/fontawesome-free-solid/faStreetView'
import {withTheme} from 'styled-components'

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
      openMatterportPopup,
      openMapPopup,
      openStreetViewPopup,
      theme
    } = this.props
    const {
      price,
      rooms,
      bathrooms,
      garageSpots,
      area,
      floor,
      propertyTax,
      maintenanceFee,
      matterportCode,
      type
    } = this.props.listing
    const price_per_square_meter = Math.floor(price / area)

    return (
      <Container>
        <Title as="h2" fontWeight="bold">
          <ExtraTitleSEO>{type} na </ExtraTitleSEO>
          {title}
        </Title>
        <ValuesContainer>
          {rooms ? (
            <ValuesItem flexDirection="column">
              <Text fontSize={2}>{rooms}</Text>
              <Text fontSize={[1, null, null, 2]}>dorm.</Text>
            </ValuesItem>
          ) : null}
          {bathrooms ? (
            <ValuesItem flexDirection="column">
              <Text fontSize={2}>{bathrooms}</Text>
              <Text fontSize={[1, null, null, 2]}>banh.</Text>
            </ValuesItem>
          ) : null}
          {garageSpots ? (
            <ValuesItem flexDirection="column">
              <Text fontSize={2}>{garageSpots}</Text>
              <Text fontSize={[1, null, null, 2]}>vagas</Text>
            </ValuesItem>
          ) : null}
          {area ? (
            <ValuesItem flexDirection="column">
              <Text fontSize={2}>{area}</Text>
              <Text fontSize={[1, null, null, 2]}>área/m²</Text>
            </ValuesItem>
          ) : null}
          {floor ? (
            <ValuesItem flexDirection="column">
              <Text fontSize={2}>{floor}°</Text>
              <Text fontSize={[1, null, null, 2]}>andar</Text>
            </ValuesItem>
          ) : null}
        </ValuesContainer>
        <ButtonsContainer>
          {matterportCode && (
            <OpenMatterportButton onClick={openMatterportPopup}>
              <FontAwesomeIcon icon={faCube} />Ver por dentro
            </OpenMatterportButton>
          )}
          <Button onClick={openMapPopup}>
            <FontAwesomeIcon icon={faMap} color={theme.colors.blue} />Mapa
          </Button>
          <Button onClick={openStreetViewPopup}>
            <FontAwesomeIcon icon={faStreetView} color={theme.colors.blue} />Rua
          </Button>
        </ButtonsContainer>
        <Row flexDirection="column" mt={5}>
          {maintenanceFee &&
            maintenanceFee > 0 && (
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
          )}
          {propertyTax &&
            propertyTax > 0 && (
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
          )}
          {price &&
            price > 0 && (
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
          )}
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

export default withTheme(ListingInfo)
