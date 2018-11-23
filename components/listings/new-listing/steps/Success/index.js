import React, { PureComponent } from 'react'
import Router from 'next/router'
import routerEvents from 'next-router-events'

import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Text from '@emcasa/ui-dom/components/Text'
import Button from '@emcasa/ui-dom/components/Button'
import Card from './components/Card'

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

  render() {
    const listingId = this.props.listing.id
    const { address } = this.props.location
    const { userPrice } = this.props.pricing
    const { tour } = this.props
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
              <Card
                listingId={listingId}
                address={address}
                userPrice={userPrice}
                tour={tour}
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
