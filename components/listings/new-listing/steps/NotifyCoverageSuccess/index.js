import React, { PureComponent } from 'react'
import Router from 'next/router'
import routerEvents from 'next-router-events'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Icon from '@emcasa/ui-dom/components/Icon'
import Text from '@emcasa/ui-dom/components/Text'
import Button from '@emcasa/ui-dom/components/Button'
import Container from 'components/listings/new-listing/shared/Container'

class NotifyCoverageSuccess extends PureComponent {
  constructor(props) {
    super(props)
    this.finish = this.finish.bind(this)
  }

  componentDidMount() {
    routerEvents.once('routeChangeComplete', (url) => {
      if (url === '/') {
        this.props.resetStore()
      }
      return true
    })
  }

  finish() {
    Router.push('/')
  }

  render() {
    return (
      <div ref={this.props.hostRef}>
        <Container>
          <Col width={[1, 1/2]}>
            <Text
              fontSize="large"
              fontWeight="bold"
              textAlign="center">
              Seu e-mail foi salvo com sucesso!
            </Text>
            <Row justifyContent="center" my={4}>
              <Icon name="check-circle" color="green" size={60} />
            </Row>
            <Row>
              <Text color="grey">Você receberá uma notificação quando atendermos a sua região.</Text>
            </Row>
            <Button active fluid height="tall" onClick={this.finish}>OK</Button>
          </Col>
        </Container>
      </div>
    )
  }
}

export default NotifyCoverageSuccess
