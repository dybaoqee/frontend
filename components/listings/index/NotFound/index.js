import Link from 'next/link'
import Container from './styles'

export default ({resetAllParams, filtered}) => {
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
    <Link href="/listings" as="/imoveis" prefetch>
      <Container>
        <div>
          <p>Você ainda não favoritou nenhum imóvel.</p>
          <p>Clique aqui para ver os imóveis disponíveis.</p>
        </div>
      </Container>
    </Link>
  )
}
