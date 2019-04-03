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

import {
  Container,
  Title,
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
      title
    } = this.props
    const {
      price,
      rooms,
      bathrooms,
      garageSpots,
      area,
      floor,
      propertyTax,
      maintenanceFee
    } = this.props.listing
    const price_per_square_meter = Math.floor(price / area)

    return (
      <Container>
        <Title fontWeight="bold">{title}</Title>
        <ButtonsContainer>
          <OpenMatterportButton><FontAwesomeIcon icon={faCube} />Ver por dentro</OpenMatterportButton>
          <Button><FontAwesomeIcon icon={faMap} color={theme.colors.blue} />Mapa</Button>
          <Button><FontAwesomeIcon icon={faStreetView} color={theme.colors.blue} />Rua</Button>
        </ButtonsContainer>
        <Row flexDirection="column" mb={5}>
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
        <ValuesContainer>
          {rooms ? (
            <ValuesItem flexDirection="column">
              <Text>{rooms}</Text>
              <Text fontSize="small">dorm.</Text>
            </ValuesItem>
          ) : null}
          {bathrooms ? (
            <ValuesItem flexDirection="column">
              <Text>{bathrooms}</Text>
              <Text fontSize="small">banh.</Text>
            </ValuesItem>
          ) : null}
          {garageSpots ? (
            <ValuesItem flexDirection="column">
              <Text>{garageSpots}</Text>
              <Text fontSize="small">vagas</Text>
            </ValuesItem>
          ) : null}
          {area ? (
            <ValuesItem flexDirection="column">
              <Text>{area}</Text>
              <Text fontSize="small">área/m2</Text>
            </ValuesItem>
          ) : null}
          {floor ? (
            <ValuesItem flexDirection="column">
              <Text>{floor}</Text>
              <Text fontSize="small">andar</Text>
            </ValuesItem>
          ) : null}
        </ValuesContainer>
      </Container>
    )
  }
}

ListingInfo.propTypes = {
  listing: PropTypes.object,
  title: PropTypes.string
}

export default ListingInfo
