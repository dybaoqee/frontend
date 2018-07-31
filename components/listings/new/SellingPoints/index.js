import Container from './styles'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faCheck from '@fortawesome/fontawesome-free-solid/faCheckCircle'
export default () => (
  <Container>
    <h6>Uma imobiliária nova de verdade</h6>

    <div>
      <FontAwesomeIcon icon={faCheck} />
      <span>
        Aproveite nossa redução de 40% em corretagem e economize milhares de
        reais
      </span>
    </div>
    <div>
      <FontAwesomeIcon icon={faCheck} />
      <span>
        A EmCasa conta com o apoio de Harvard e fundos de investimento nacionais
        e internacionais
      </span>
    </div>
    <div>
      <FontAwesomeIcon icon={faCheck} />
      <span>
        Receba assistência jurídica e financeira do início ao fim do processo.
      </span>
    </div>
  </Container>
)
