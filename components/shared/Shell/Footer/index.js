import Link from 'next/link'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter
} from '@fortawesome/fontawesome-free-brands'

import Container from './styles'

const Footer = () => (
  <Container>
    <Link href="/">
      <a>
        <img
          src="/static/emcasa-imobiliaria-rio-de-janeiro.png"
          alt="Emcasa Imobiliária no Rio de Janeiro"
        />
      </a>
    </Link>

    <div>
      <div>
        <a href="mailto:contato@emcasa.com">contato@emcasa.com</a>

        <div>
          <a
            href="https://www.facebook.com/EmCasa"
            target="_blank"
            className="icon"
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>

          <a
            href="https://www.instagram.com/emcasaimoveis/"
            target="_blank"
            className="icon"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>

          <a
            href="https://www.linkedin.com/company/emcasa/"
            target="_blank"
            className="icon"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>

          <a
            href="https://twitter.com/EmCasaTech"
            target="_blank"
            className="icon"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </div>
      </div>
    </div>
  </Container>
)

export default Footer
