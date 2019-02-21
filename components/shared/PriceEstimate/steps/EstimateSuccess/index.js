import React, { PureComponent } from 'react'
import Container, {Price, Address, Description} from './styles'
import EmCasaButton from 'components/shared/Common/Buttons'
import Link from 'next/link'
import {
  log,
  ESTIMATE_PRICE_SUCCESS
} from 'lib/logging'

export default class EstimateSuccess extends PureComponent {
  componentDidMount() {
    const { listing: { address: {neighborhood, city}, suggestedPrice }} = this.props
    log(ESTIMATE_PRICE_SUCCESS, {
      city,
      neighborhood,
      suggestedPrice
    })
  }

  render() {
    const {listing: {address: {street, streetNumber, neighborhood, city}, suggestedPrice}} = this.props
    return (
      <Container>
        <Address>{`${street}, ${streetNumber} - ${neighborhood}, ${city}`}</Address>
        <Price>
          {suggestedPrice.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          })}
        </Price>
        <Description>
          <h6>Pensando em vender?</h6>
          <p>
            Venda seu imóvel por mais e se beneficie de taxas 40% menores que o
            mercado. Cadastre seu imóvel em menos de 5 minutos.
          </p>
          <Link href="/listings/new-listing" as="/vender/imovel">
            <EmCasaButton full light>
              Anuncie agora
            </EmCasaButton>
          </Link>
        </Description>
      </Container>
    )
  }
}
