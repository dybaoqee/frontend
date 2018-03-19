import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faWarning from '@fortawesome/fontawesome-free-solid/faExclamationTriangle'
import Container from './styles'
export default ({message}) => (
  <Container>
    <FontAwesomeIcon icon={faWarning} />
    <span>{message || 'Aviso'}</span>
  </Container>
)
