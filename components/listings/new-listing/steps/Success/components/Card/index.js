import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import View from '@emcasa/ui-dom/components/View'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Icon from '@emcasa/ui-dom/components/Icon'
import Text from '@emcasa/ui-dom/components/Text'
import { getDateDisplay } from 'components/listings/new-listing/lib/times'
import { intToCurrency } from 'utils/text-utils'
import Link from '../Link'

import {
  CardContainer,
  TopContainer,
  BottomContainer,
  Separator,
  TopLeftCorner,
  BottomLeftCorner,
  TopRightCorner,
  BottomRightCorner
} from './styles'

class Card extends PureComponent {
  getTourTimeDisplay(tour) {
    const date = getDateDisplay(tour.day)
    return `${date} - às ${tour.time}h`
  }

  render() {
    const { tour } = this.props
    const { listingId } = this.props
    return (
      <CardContainer>
          <Row flexDirection="column">
            <View elevation={4}>
              <View p={4}>
                <Row>
                  <Col>
                    <Text inline fontSize="small" color="grey">Endereço</Text>
                  </Col>
                </Row>
                <Row mb={2}>
                  <Col>
                    <Text inline fontSize="small" fontWeight="bold">{this.props.address}</Text>
                  </Col>
                </Row>
                <Row>
                  <Col width={1/2}>
                    <Text inline fontSize="small" color="grey">Valor</Text>
                  </Col>
                  {tour && <Col width={1/2}>
                    <Text inline fontSize="small" color="grey">Data para visita</Text>
                  </Col>}
                </Row>
                <Row>
                  <Col width={1/2}>
                  <Text inline fontSize="small" fontWeight="bold">{intToCurrency(this.props.userPrice)}</Text>
                  </Col>
                  {tour && <Col width={1/2}>
                    <Text inline fontSize="small" fontWeight="bold">{this.getTourTimeDisplay(tour)}</Text>
                  </Col>}
                </Row>
              </View>
            
            <View style={{
              backgroundColor: '#fff',
              width: 'calc(100% + 10px)',
              marginLeft: '-5px'
            }}>
              <Row justifyContent="space-between">
                <TopLeftCorner />
                <TopRightCorner />
              </Row>
              {/* <Row>
                <Separator />
              </Row> */}
              <Row justifyContent="space-between">
                <BottomLeftCorner />
                <BottomRightCorner />
              </Row>
            </View>
            
              <Link
                href={`/listings/images?listingId=${listingId}`}
                as={`/imoveis/${listingId}/imagens`}
              >
                <Row justifyContent="center"><Icon name="plus" color="pink" size={16} mr={2} /><Text inline fontSize="small" color="pink">Adicionar fotos</Text></Row>
              </Link>
            </View>
          </Row>
      </CardContainer>
    )
  }
}

Card.propTypes = {
  listingId: PropTypes.number.isRequired,
  address: PropTypes.string.isRequired,
  userPrice: PropTypes.number.isRequired,
  tour: PropTypes.object.isRequired
}

export default Card