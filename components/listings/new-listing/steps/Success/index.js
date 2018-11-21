import React, { PureComponent } from 'react'
import Router from 'next/router'
import routerEvents from 'next-router-events'

import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Icon from '@emcasa/ui-dom/components/Icon'
import Text from '@emcasa/ui-dom/components/Text'
import Button from '@emcasa/ui-dom/components/Button'
import Link from './components/Link'

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
            <Row justifyContent="center" my={4}>
              <Icon name="check-circle" color="green" size={60} />
            </Row>
            <Row>
              <Text color="grey">Muito obrigado por confiar na EmCasa! Enviaremos um SMS assim que seu imóvel estiver publicado.</Text>
            </Row>
            <Row>
              <Text color="grey">Você já tem fotos do seu imóvel? <Link
                href={`/listings/images?listingId=${listingId}`}
                as={`/imoveis/${listingId}/imagens`}
              >Clique aqui</Link> para fazer o upload.</Text>
            </Row>
            <Row>
              <Col width={1} mb={2}>
                <Button active fluid height="tall" onClick={this.viewMyListings}>Ver Meus Imóveis</Button>
              </Col>
            </Row>
            <Row>
              <Col width={1}>
                <Button fluid height="tall" onClick={this.goHome}>Ir para Home</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Success
