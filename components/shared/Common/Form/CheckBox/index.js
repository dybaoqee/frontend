import Container from './styles'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck'
export default ({name, defaultChecked}) => (
  <Container>
    <input name={name} type="checkbox" defaultChecked={defaultChecked} />
    <span>
      <FontAwesomeIcon icon={faCheck} />
    </span>
  </Container>
)
