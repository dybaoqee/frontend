import Container from './styles'

export default () => (
  <Container>
    <p className="desktop">
      Entre em contato por Telefone/Whatsapp no
      <span>
        <a href="tel:21 99609-5399"> (21) 9 9609-5399 </a>
      </span>
      ou através do e-mail
      <span>
        <a href="mailto:contato@emcasa.com"> contato@emcasa.com </a>
      </span>
    </p>
    <p className="mobile">
      <span>
        <a href="tel:21 99609-5399"> (21) 9 9609-5399 </a>
      </span>

      <span>
        <a href="mailto:contato@emcasa.com"> contato@emcasa.com </a>
      </span>
    </p>
  </Container>
)
