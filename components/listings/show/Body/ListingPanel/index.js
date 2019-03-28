import React from 'react'
import PropTypes from 'prop-types'
import theme from 'config/theme'
import NumberFormat from 'react-number-format'
import LikeButton from 'components/shared/Common/Buttons/Like'
import Button from '@emcasa/ui-dom/components/Button'
import View from '@emcasa/ui-dom/components/View'
import Row from '@emcasa/ui-dom/components/Row'
import Text from '@emcasa/ui-dom/components/Text'
import ListingData from '../ListingData'
import {
  Container,
  Title,
  PriceItem,
  PriceItemSpacer
 } from './styles'

class ListingPanel extends React.Component {
  render() {
    const {
      handleOpenPopup,
      user,
      favorite,
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
        <ListingData
          bedrooms={rooms}
          bathrooms={bathrooms}
          garageSpots={garageSpots}
          area={area}
          floor={floor}
        />
        <Text style={{margin: `0 0 ${theme.space[2]}px 0`}} fontSize="xlarge" fontWeight="bold" color={theme.colors.pink}>
          {price && price > 0 ?
            <>
              <NumberFormat
                value={price}
                displayType={'text'}
                thousandSeparator={'.'}
                prefix={'R$'}
                decimalSeparator={','}
              />
              <Text inline color="grey" fontSize="small"> VENDA</Text>
            </>
          : 'Preço a definir'}
        </Text>
        <View mt={4}>
          <Button fluid height="tall" active onClick={handleOpenPopup}>Falar com especialista</Button>
        </View>
        <LikeButton
          top={-25}
          favorite={favorite}
          listing={this.props.listing}
          user={user}
          secondary
        />
      </Container>
    )
  }
}

ListingPanel.propTypes = {
  listing: PropTypes.object
}

export default ListingPanel
