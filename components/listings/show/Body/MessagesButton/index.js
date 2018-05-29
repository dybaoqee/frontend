import Link from 'next/link'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faEnvelope from '@fortawesome/fontawesome-pro-light/faEnvelope'
import Container from './styles'

export default ({listing: {id}}) => (
  <Link href={`/listings/messages?id=${id}`} as={`/imoveis/${id}/mensagens`}>
    <Container>
      <div>
        <FontAwesomeIcon icon={faEnvelope} />
        Enviar mensagem
      </div>
    </Container>
  </Link>
)
