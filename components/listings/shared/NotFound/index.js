import Link from 'next/link'
import Container from './styles'

export default ({
  resetAllParams,
  filtered,
  messages,
  href = '/listings',
  as = '/imoveis'
}) => {
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
    <Link href={href} as={as}>
      <Container>
        <div>
          {messages &&
            messages.map((message) => <p key={message}>{message}</p>)}
        </div>
      </Container>
    </Link>
  )
}
