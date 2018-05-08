import Link from 'next/link'
import Container from './styles'

export default ({resetAllParams, filtered, messages, href, as}) => {
  if (filtered) {
    return (
      <Container onClick={resetAllParams}>
        <div>
          <p>Não encontramos listagens para sua busca.</p>
          <p>Clique aqui para limpar os filtros.</p>
        </div>
      </Container>
    )
  }

  return (
    <Link href={href} as={as} prefetch>
      <Container>
        <div>{messages.map((message) => <p key={message}>{message}</p>)}</div>
      </Container>
    </Link>
  )
}
