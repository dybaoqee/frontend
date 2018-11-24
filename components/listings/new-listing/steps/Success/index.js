import React, { PureComponent } from 'react'
import Router from 'next/router'
import routerEvents from 'next-router-events'

import View from '@emcasa/ui-dom/components/View'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Text from '@emcasa/ui-dom/components/Text'
import Button from '@emcasa/ui-dom/components/Button'
import Icon from '@emcasa/ui-dom/components/Icon'
import { getDateDisplay } from 'components/listings/new-listing/lib/times'
import { intToCurrency } from 'utils/text-utils'
import Link from 'components/listings/new-listing/shared/Link'
import Ticket from 'components/listings/new-listing/shared/Ticket'

const ROUTE_HOME = '/'
const ROUTE_MY_LISTINGS = '/listings/user-listings'

class Success extends PureComponent {
  constructor(props) {
    super(props)
    this.viewMyListings = this.viewMyListings.bind(this)
    this.goHome = this.goHome.bind(this)
  }

  componentDidMount() {
    routerEvents.once('routeChangeComplete', () => {
      this.props.navigateTo('intro')
      this.props.resetStore()
      return true
    })
  }

  viewMyListings() {
    Router.push(ROUTE_MY_LISTINGS)
  }

  goHome() {
    Router.push(ROUTE_HOME)
  }

  getTourTimeDisplay(tour) {
    const date = getDateDisplay(tour.day)
    return `${date} - às ${tour.time}h`
  }

  render() {
    const { tour, location, pricing, listing } = this.props
    const listingId = listing.id
    const { day } = tour    
    const { address } = location
    const { userPrice } = pricing
    return (
      <div ref={this.props.hostRef}>
        <Row justifyContent="center" p={4}>
          <Col width={[1, 1/2]}>
            <Text
              fontSize="large"
              fontWeight="bold"
              textAlign="center">
              Parabéns, seu imóvel foi salvo com sucesso!
            </Text>
            <Row>
              <Text color="grey">Muito obrigado por confiar na EmCasa! Nosso time entrará em contato por telefone em breve. Após o contato, seu imóvel será publicado.</Text>
            </Row>
            <Row justifyContent="center" mb={4}>
              <Ticket
                topRender={() =>
                  <View p={4}>
                    <Row>
                      <Col>
                        <Text inline fontSize="small" color="grey">Endereço</Text>
                      </Col>
                    </Row>
                    <Row mb={2}>
                      <Col>
                        <Text inline fontSize="small" fontWeight="bold">{address}</Text>
                      </Col>
                    </Row>
                    <Row>
                      <Col width={1/2}>
                        <Text inline fontSize="small" color="grey">Valor</Text>
                      </Col>
                      {day && <Col width={1/2}>
                        <Text inline fontSize="small" color="grey">Data para visita</Text>
                      </Col>}
                    </Row>
                    <Row>
                      <Col width={1/2}>
                      {userPrice && <Text inline fontSize="small" fontWeight="bold">{intToCurrency(userPrice)}</Text>}
                      </Col>
                      {day && <Col width={1/2}>
                        <Text inline fontSize="small" fontWeight="bold">{this.getTourTimeDisplay(tour)}</Text>
                      </Col>}
                    </Row>
                  </View>
                }
                bottomRender={() =>
                  <Row p={4} justifyContent="center">
                    <Link
                      href={`/listings/images?listingId=${listingId}`}
                      as={`/imoveis/${listingId}/imagens`}
                    >
                      <Row justifyContent="center"><Icon name="plus" color="pink" size={16} mr={2} /><Text inline fontSize="small" color="pink">Adicionar fotos</Text></Row>
                    </Link>
                  </Row>
                }
              />
            </Row>
            <Row>
              <Col width={1} mb={2}>
                <Button active fluid height="tall" onClick={this.viewMyListings}>Ver Meus Imóveis</Button>
              </Col>
            </Row>
            <Row>
              <Col width={1}>
                <Button fluid height="tall" onClick={this.goHome}>Fale com a EmCasa</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Success
