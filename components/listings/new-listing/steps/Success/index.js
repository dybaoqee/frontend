import React, { PureComponent } from 'react'
import Router from 'next/router'
import routerEvents from 'next-router-events'

import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Icon from '@emcasa/ui-dom/components/Icon'
import View from '@emcasa/ui-dom/components/View'
import Text from '@emcasa/ui-dom/components/Text'
import Button from '@emcasa/ui-dom/components/Button'

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
    return (
      <div ref={this.props.hostRef}>
        <Row justifyContent="center">
          <Col width={[1, 1/2]}>
            <View body p={4}>
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
            </View>
            <View bottom p={4}>
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
            </View>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Success
