import React, { PureComponent } from 'react'
import Container, {Title, Description} from './styles'
import {
  log,
  ESTIMATE_PRICE_FAIL
} from 'lib/logging'

export default class EstimateFail extends PureComponent {
  componentDidMount() {
    log(ESTIMATE_PRICE_FAIL)
  }

  render() {
    return (
      <Container>
        <Title>Entre em contato conosco</Title>
        <Description>
          <p>
            Nossas estimativas são calculadas com base em mais de 20.000 imóveis à
            venda no Rio de Janeiro, mas infelizmente não temos dados suficientes
            para gerar uma avaliação de qualidade neste endereço.
          </p>
          <p>
            Entre em contato conosco através do e-mail{' '}
            <a href="mailto:contato@emcasa.com">contato@emcasa.com</a> ou por
            <a href="https://wa.me/5521994771868"> WhatsApp </a>
          </p>
        </Description>
      </Container>
    )
  }
}
