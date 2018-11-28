import {Component} from 'react'
import Link from 'next/link'
import Container, {Title} from './styles'
import EmCasaButton from 'components/shared/Common/Buttons'

export default class HomeBuySell extends Component {
  render() {
    return (
      <Container>
        <div>
          <Title>Pronto para comprar seu imóvel?</Title>
          <Link href={'/listings/index'} as={'/imoveis'}>
            <EmCasaButton light secondary>
              Comprar Imóvel
            </EmCasaButton>
          </Link>
        </div>
        <div>
          <Title>Quero vender meu imóvel!</Title>
          <Link href={'/listings/new-listing'} as={'/vender/imovel'}>
            <EmCasaButton light>Vender imóvel</EmCasaButton>
          </Link>
        </div>
      </Container>
    )
  }
}
