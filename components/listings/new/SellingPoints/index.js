import Container from './styles'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faCheck from '@fortawesome/fontawesome-free-solid/faCheckCircle'
export default () => (
  <Container>
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
  </Container>
)
