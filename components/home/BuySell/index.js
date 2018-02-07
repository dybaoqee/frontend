import { Component } from 'react'
import Link from 'next/link'
import Container, { Title } from './styles'

export default class HomeBuySell extends Component {
  render() {
    return (
      <Container>
        <div>
          <Title>Pronto para comprar seu imóvel?</Title>
          <Link href={'/listings/index'} as={'/imoveis'}>
            <a>Comprar Imóvel</a>
          </Link>
        </div>
      </Container>
    )
  }
}
