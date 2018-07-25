import Container, {Title, Description} from './styles'
import EmCasaButton from 'components/shared/Common/Buttons'
import Link from 'next/link'

export default () => (
  <Container>
    <Title>Hmm, é melhor fazer uma avaliação presencial</Title>
    <Description>
      <p>
        Nossas estimativas são calculadas com base em mais de 20.000 imóveis à
        venda no Rio de Janeiro, mas infelizmente não temos dados suficientes
        para gerar uma avaliação de qualidade neste endereço.
      </p>
      <Link href="/listings/new" as="/imoveis/adicionar" prefetch>
        <EmCasaButton full light>
          Anuncie seu imóvel em 5 minutos
        </EmCasaButton>
      </Link>
    </Description>
  </Container>
)
