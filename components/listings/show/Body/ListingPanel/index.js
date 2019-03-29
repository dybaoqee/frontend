import React from 'react'
import PropTypes from 'prop-types'
import theme from 'config/theme'
import NumberFormat from 'react-number-format'
import LikeButton from 'components/shared/Common/Buttons/Like'
import Button from '@emcasa/ui-dom/components/Button'
import Text from '@emcasa/ui-dom/components/Text'
import View from '@emcasa/ui-dom/components/View'
import {
  Container,
  PricesContainer,
  PriceItem
 } from './styles'

class ListingPanel extends React.Component {
  render() {
    const {
      handleOpenPopup,
      user,
      favorite
    } = this.props
    const {
      price,
      area,
      propertyTax,
      maintenanceFee
    } = this.props.listing
    const price_per_square_meter = Math.floor(price / area)

    return (
      <Container>
        <LikeButton
          top={-25}
          favorite={favorite}
          listing={this.props.listing}
          user={user}
          secondary
        />
        <Text style={{margin: `0 0 ${theme.space[2]}px 0`}} fontSize="xlarge" fontWeight="500" color={theme.colors.pink}>
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
        <PricesContainer>
          {(maintenanceFee && maintenanceFee > 0) &&
            <PriceItem mb={2}>
              <Text inline>Condomínio</Text>
              <Text inline>
                <NumberFormat
                  value={maintenanceFee || 0}
                  displayType={'text'}
                  thousandSeparator={'.'}
                  prefix={'R$'}
                  decimalSeparator={','}
                />
              </Text>
            </PriceItem>
          }
          {(propertyTax && propertyTax > 0) &&
            <PriceItem mb={2}>
              <Text inline>IPTU/ano</Text>
              <Text inline>
                <NumberFormat
                  value={propertyTax || 0}
                  displayType={'text'}
                  thousandSeparator={'.'}
                  prefix={'R$'}
                  decimalSeparator={','}
                />
              </Text>
            </PriceItem>
          }
          {(price && price > 0) &&
            <PriceItem>
              <Text inline>Preço/m²</Text>
              <Text inline>
                <NumberFormat
                  value={price_per_square_meter || 0}
                  displayType={'text'}
                  thousandSeparator={'.'}
                  prefix={'R$'}
                  decimalSeparator={','}
                />
              </Text>
            </PriceItem>
          }
        </PricesContainer>
        <View mt={4}>
          <Button fluid height="tall" active onClick={handleOpenPopup}>Falar com especialista</Button>
        </View>
      </Container>
    )
  }
}

ListingPanel.propTypes = {
  listing: PropTypes.object
}

export default ListingPanel
