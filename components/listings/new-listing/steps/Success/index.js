import React, { PureComponent } from 'react'
import Router from 'next/router'
import routerEvents from 'next-router-events'

import View from '@emcasa/ui-dom/components/View'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Text from '@emcasa/ui-dom/components/Text'
import Button from '@emcasa/ui-dom/components/Button'
import Icon from '@emcasa/ui-dom/components/Icon'
import { intToCurrency } from 'utils/text-utils'
import Link from 'components/listings/new-listing/shared/Link'
import Ticket from 'components/listings/new-listing/shared/Ticket'
import { getFullTourDateDisplay } from 'components/listings/new-listing/lib/times'

const ROUTE_HOME = '/'
const ROUTE_MY_LISTINGS = '/meu-perfil'

class Success extends PureComponent {
  constructor(props) {
    super(props)
    this.viewMyListings = this.viewMyListings.bind(this)
    this.goHome = this.goHome.bind(this)
    this.reset = this.reset.bind(this)
  }

  componentDidMount() {
    routerEvents.once('hashChangeComplete', () => {
      this.reset()
    })
    routerEvents.once('routeChangeComplete', () => {
      this.reset()
    })
  }

  reset() {
    this.props.navigateTo('intro')
    this.props.resetStore()
  }

  viewMyListings() {
    Router.push(ROUTE_MY_LISTINGS)
  }

  goHome() {
    Router.push(ROUTE_HOME)
  }

  render() {
    const { tour, location, pricing, listing } = this.props
    const listingId = listing.id
    const { day } = tour
    const { address } = location
    const { userPrice } = pricing
    return (
      <div ref={this.props.hostRef}>
        <Row justifyContent="center" p={4} pt={0}>
          <Col width={[1,null,null,1/2]}>
            <Text
              fontSize="large"
              fontWeight="bold"
              textAlign="center">
              Parabéns, seu imóvel foi salvo com sucesso!
            </Text>
            <Row>
              <Text color="grey">
                Muito obrigado por confiar na EmCasa!
                {day ? ' Aguarde o contato do nosso time por telefone em breve para confirmar a visita.'
                     : ' Aguarde o contato do nosso time por telefone em breve.'}</Text>
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
                        <Text inline fontSize="small" fontWeight="bold">{getFullTourDateDisplay(tour)}</Text>
                      </Col>}
                    </Row>
                    {day && <Row>
                      <Col width={1/2}>{' '}</Col>
                      <Col width={1/2}>
                        <Row>
                          <Col width={1/6} mr="2px" pt="2px">
                            <Text inline fontSize={12}>📞</Text>
                          </Col>
                          <Col width={5/6}>
                            <Text inline fontSize="small" color="grey"> Aguarde a confirmação da visita.</Text>
                          </Col>
                        </Row>
                      </Col>
                    </Row>}
                  </View>
                }
                bottomRender={() =>
                  <Row p={4} justifyContent="center">
                    <Link
                      passHref
                      href={`/listings/images?listingId=${listingId}`}
                      as={`/imoveis/${listingId}/imagens`}
                    >
                      <a>
                        <Row justifyContent="center">
                          <Icon name="plus" color="pink" size={16} mr={2} />
                          <Text inline fontSize="small" color="pink">Adicionar fotos</Text>
                        </Row>
                      </a>
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
