import NoSSR from 'react-no-ssr'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faPhone from '@fortawesome/fontawesome-free-brands/faWhatsapp'
import Container from './styles'

const Space = () => ' '

export default () => (
  <Container>
    <p className="desktop">
      Entre em contato por
      <span>
        <a href="https://wa.me/5521994771868">
          <Space />
          <NoSSR>
            <FontAwesomeIcon icon={faPhone} />
          </NoSSR>
          <Space />
          WhatsApp
          <Space />
        </a>
      </span>
      ou pelo telefone
      <span>
        <a href="tel:+5521994771868"> (21) 99477-1868 </a>
      </span>
    </p>
    <p className="mobile">
      <span>
        <a href="https://wa.me/5521994771868">
          <NoSSR>
            <FontAwesomeIcon icon={faPhone} />
          </NoSSR>
          <Space />
          WhatsApp
          <Space />
        </a>
      </span>

      <span>
        <a href="tel:+5521994771868"> (21) 99477-1868 </a>
      </span>
    </p>
  </Container>
)
