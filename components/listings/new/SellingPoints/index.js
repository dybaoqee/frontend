import Link from 'next/link'
import Container from './styles'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faCheck from '@fortawesome/fontawesome-free-solid/faCheckCircle'
export default () => (
  <Container>
    <h6>Uma imobiliária nova de verdade</h6>
    <div>
      <FontAwesomeIcon icon={faCheck} />
      <span>Melhores condições de mercado</span>
    </div>
    <div>
      <FontAwesomeIcon icon={faCheck} />
      <span>Serviço especializado e de confiança</span>
    </div>
    <div>
      <FontAwesomeIcon icon={faCheck} />
      <span>Assistência jurídica e financeira</span>
    </div>
    <Link href="/listings/sell/know-more" as="/saiba-mais-para-vender">
      <a title="Saiba mais para vender">Quer saber ainda mais?</a>
    </Link>
  </Container>
)
