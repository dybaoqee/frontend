import React from 'react'
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format'
import LikeButton from 'components/shared/Common/Buttons/Like'
import Button from '@emcasa/ui-dom/components/Button'
import Text from '@emcasa/ui-dom/components/Text'
import View from '@emcasa/ui-dom/components/View'
import {getListingValueRange} from 'lib/listings'
import {
  Container,
  PricesContainer,
  PriceItem,
  MainPriceContainer
} from './styles'

const isNotEmpty = (val) => !isNaN(val) && val > 0

const isRange = ([min, max] = []) => min !== max

function NumberRangeFormat({values, ...props}) {
  if (!isRange(values)) return <NumberFormat value={values[0]} {...props} />
  return (
    <Text
      inline
      style={{display: 'inline-flex', alignItems: 'center'}}
      color="inherit"
      fontSize="75%"
    >
      <NumberFormat value={values[0]} {...props} />
      <Text inline style={{margin: '0 5px'}} color="grey" fontSize="small">
        -
      </Text>
      <NumberFormat value={values[1]} {...props} />
    </Text>
  )
}

class ListingPanel extends React.Component {
  render() {
    const {
      listing,
      handleOpenPopup,
      user,
      favorite,
      isMobile
    } = this.props
    const areaRange = getListingValueRange(listing, 'area')
    const priceRange = getListingValueRange(listing, 'price')
    const maintenanceFeeRange = getListingValueRange(listing, 'maintenanceFee')
    const propertyTaxRange = getListingValueRange(listing, 'propertyTax')
    const pricePerSquareMeter = [
      Math.round(priceRange[0] / areaRange[0]),
      Math.round(priceRange[1] / areaRange[1])
    ]
    return (
      <Container>
        <LikeButton
          top={-25}
          favorite={favorite}
          listing={this.props.listing}
          user={user}
          secondary
        />
        <MainPriceContainer isRange={isRange(priceRange)}>
          {priceRange.find(isNotEmpty) ?
            <>
              <NumberRangeFormat
                values={priceRange}
                displayType={'text'}
                thousandSeparator={'.'}
                prefix={'R$'}
                decimalSeparator={','}
              />
              <Text inline color="grey" fontSize="small"> VENDA</Text>
            </>
          : 'Preço a definir'}
        </MainPriceContainer>
        <PricesContainer>
          {maintenanceFeeRange.find(isNotEmpty) &&
            <PriceItem mb={2}>
              <Text inline>Condomínio</Text>
              <Text inline>
                <NumberRangeFormat
                  values={maintenanceFeeRange}
                  displayType={'text'}
                  thousandSeparator={'.'}
                  prefix={'R$'}
                  decimalSeparator={','}
                />
              </Text>
            </PriceItem>
          }
          {propertyTaxRange.find(isNotEmpty) &&
            <PriceItem mb={2}>
              <Text inline>IPTU/ano</Text>
              <Text inline>
                <NumberRangeFormat
                  values={propertyTaxRange}
                  displayType={'text'}
                  thousandSeparator={'.'}
                  prefix={'R$'}
                  decimalSeparator={','}
                />
              </Text>
            </PriceItem>
          }
          {pricePerSquareMeter.filter(isNotEmpty).length === 2 &&
            <PriceItem>
              <Text inline>Preço/m²</Text>
              <Text inline>
                <NumberRangeFormat
                  values={pricePerSquareMeter}
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
